const HUBSPOT_CONTACTS_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

// Splits a full name into { firstname, lastname } — first word is the
// first name, everything else (if any) is the last name.
function splitName(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  const firstname = parts.shift() || '';
  const lastname = parts.join(' ');
  return { firstname, lastname };
}

function mapToHubSpotProperties(formName, data) {
  switch (formName) {
    case 'alpha-access': {
      const isOutsideUSA = data.state === 'Outside of the USA';
      return {
        firstname: data.first_name || '',
        lastname: data.last_name || '',
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        state: isOutsideUSA ? '' : (data.state || ''),
        country: isOutsideUSA ? (data.country || '') : 'United States',
        interested_in: data.interested_in || '',
        form_source: 'Website - Alpha Access Request',
      };
    }

    case 'contact': {
      const { firstname, lastname } = splitName(data.name);
      const interestedIn = [data.interest, data.message].filter(Boolean).join(' — ');
      return {
        firstname,
        lastname,
        email: data.email,
        interested_in: interestedIn,
        form_source: 'Website - Work With Us',
      };
    }

    default: {
      const { firstname, lastname } = splitName(data.first_name || data.name);
      return {
        firstname,
        lastname,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        interested_in: data.interested_in || data.message || '',
        form_source: `Website - ${formName}`,
      };
    }
  }
}

async function createContact(token, properties) {
  return fetch(HUBSPOT_CONTACTS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  });
}

async function updateContact(token, contactId, properties) {
  return fetch(`${HUBSPOT_CONTACTS_URL}/${contactId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  });
}

function extractExistingContactId(errorBody) {
  const match = /Existing ID:\s*(\d+)/i.exec(errorBody?.message || '');
  return match ? match[1] : null;
}

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch (err) {
    console.error('hubspot-sync: failed to parse request body', err);
    return new Response('Bad Request', { status: 400 });
  }

  console.log('RAW BODY:', JSON.stringify(body));

  const payload = body?.payload;
  const data = payload?.data;
  const formName = payload?.form_name;

  if (!data?.email) {
    return new Response('OK - no email, skipped', { status: 200 });
  }

  const token = process.env.HUBSPOT_TOKEN;
  if (!token) {
    console.error('hubspot-sync: HUBSPOT_TOKEN is not set');
    return new Response('Server Misconfigured', { status: 500 });
  }

  const properties = mapToHubSpotProperties(formName, data);
  console.log('Properties being sent:', JSON.stringify(properties));

  try {
    const createRes = await createContact(token, properties);

    if (createRes.ok) {
      console.log('HubSpot response:', JSON.stringify(await createRes.clone().json()));
      return new Response('OK - contact created', { status: 200 });
    }

    if (createRes.status === 409) {
      const errorBody = await createRes.json().catch(() => null);
      const existingId = extractExistingContactId(errorBody);

      if (!existingId) {
        console.error('hubspot-sync: 409 without a parseable existing contact id', errorBody);
        return new Response('HubSpot Conflict', { status: 502 });
      }

      const updateRes = await updateContact(token, existingId, properties);
      if (!updateRes.ok) {
        const updateError = await updateRes.text();
        console.error('hubspot-sync: failed to update existing contact', updateRes.status, updateError);
        return new Response('HubSpot Update Failed', { status: 502 });
      }

      console.log('HubSpot response:', JSON.stringify(await updateRes.clone().json()));
      return new Response('OK - contact updated', { status: 200 });
    }

    const createError = await createRes.text();
    console.error('hubspot-sync: failed to create contact', createRes.status, createError);
    return new Response('HubSpot Create Failed', { status: 502 });
  } catch (err) {
    console.error('hubspot-sync: unexpected error', err);
    return new Response('Internal Server Error', { status: 500 });
  }
};
