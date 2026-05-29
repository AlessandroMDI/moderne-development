\*\*ADA WEBSITE\*\*

\*\*COMPLIANCE GUIDE\*\*

\*A Complete Reference for Designers, Developers \*\*&\*\* Content Teams\*

Based on WCAG 2.1 Level AA — The Legal Standard for ADA Compliance

Updated March 2026

\# \*\*1. Legal Overview \*\*\*\*&\*\*\*\* Why It Matters\*\*

\#\# \*\*1.1 What Is the ADA?\*\*

The Americans with Disabilities Act (ADA) is a landmark federal civil rights law that prohibits discrimination based on disability. While enacted in 1990 before widespread internet use, the U.S. Department of Justice (DOJ) has consistently ruled that both Title II and Title III of the ADA apply to websites and digital content.

\#\# \*\*1.2 Key Legal Updates\*\*

In April 2024, the DOJ published a final rule under Title II of the ADA explicitly requiring state and local government websites and mobile apps to comply with WCAG 2.1 Level AA. Compliance deadlines are:

| \*\*Entity Type\*\* | \*\*Population / Size\*\* | \*\*Compliance Deadline\*\* |  
| \--- | \--- | \--- |  
| State/Local Government | 50,000+ people | April 24, 2026 |  
| State/Local Government | Under 50,000 people | April 26, 2027 |  
| Special Districts | All sizes | April 26, 2027 |  
| Private Businesses (Title III) | All sizes | Best practice; actively litigated |

\#\# \*\*1.3 Who Must Comply?\*\*

\- Title II: All state and local governments, public schools, transit authorities, and their contractors

\- Title III: Businesses open to the public — restaurants, hotels, retail stores, banks, e-commerce sites, SaaS platforms

\- Section 508: Federal agencies and contractors receiving federal funding

Private sector litigation under Title III has surged dramatically. Over 96% of websites currently fail WCAG conformance, making non-compliant sites easy litigation targets. Civil penalties can reach $75,000 for a first violation.

| \*\*Key Standard: \*\*WCAG 2.1 Level AA is the legal benchmark for ADA compliance. Achieving it satisfies Section 508, AODA (Canada), EAA (EU), and the UK Equality Act. Build to this standard regardless of your entity type. |  
| \--- |

\#\# \*\*1.4 The Four POUR Principles\*\*

All WCAG requirements flow from four foundational principles. Every success criterion maps back to one of these:

| \*\*Perceivable\*\* | Information and UI must be presentable in ways users can perceive. Nothing should be invisible to all senses. |  
| \--- | \--- |  
| \*\*Operable\*\* | UI components and navigation must be operable. No user should be unable to operate the interface. |  
| \*\*Understandable\*\* | Information and UI must be understandable. Users must be able to comprehend the content and how the interface works. |  
| \*\*Robust\*\* | Content must be robust enough to be reliably interpreted by a wide variety of assistive technologies, now and in the future. |

\# \*\*2. Color \*\*\*\*&\*\*\*\* Contrast\*\*

\#\# \*\*2.1 Why Color Contrast Matters\*\*

Color contrast is the single most commonly failed WCAG criterion — 81% of home pages fail it. Approximately 1 in 12 men and 1 in 200 women have some form of color vision deficiency. People with low vision, cataracts, or aging eyes depend on sufficient contrast to read and navigate your site.

\#\# \*\*2.2 Contrast Ratio Requirements\*\*

Contrast ratio is measured on a scale from 1:1 (no contrast — same color) to 21:1 (maximum — black on white). The required minimums under WCAG 2.1 Level AA are:

| \*\*Content Type\*\* | \*\*Minimum Ratio (AA)\*\* | \*\*AAA (Recommended)\*\* |  
| \--- | \--- | \--- |  
| Normal text (under 18pt or 14pt bold) | 4.5:1 | 7:1 |  
| Large text (18pt+ or 14pt+ bold) | 3:1 | 4.5:1 |  
| UI components (buttons, inputs, icons) | 3:1 | 4.5:1 |  
| Informational graphics / charts | 3:1 | 4.5:1 |  
| Logos, decorative imagery, disabled UI | Exempt | Exempt |

Large text is specifically defined as: 18pt (24px) or larger, OR 14pt (approximately 18.66px) or larger when bold.

\#\# \*\*2.3 Color Cannot Be the Only Signal\*\*

WCAG 1.4.1 prohibits using color as the only way to convey information, indicate an action, prompt a response, or distinguish a visual element. Examples of common violations:

\- Red text alone indicating an error (must also include an icon or text label)

\- Green/red to indicate pass/fail on a chart without patterns or labels

\- Links that are only a different color from body text with no underline or other indicator

For links specifically: if a link is differentiated only by color (no underline), that color difference must have at least a 3:1 contrast ratio against the surrounding body text AND must gain an additional visual cue (such as an underline) on hover and keyboard focus.

\#\# \*\*2.4 Practical Color Rules\*\*

\- Always test all hover, focus, and active states — contrast requirements apply to all states

\- Text over gradients, semi-transparent overlays, or background images must meet contrast at their lowest-contrast point

\- Dark mode requires recalculating every contrast pairing independently

\- Do not rely on placeholders (light gray on white) to communicate form field labels

\#\# \*\*2.5 Safe Color Combinations (AA Passing Examples)\*\*

| \*\*Text Color\*\* | \*\*Background\*\* | \*\*Contrast Ratio\*\* |  
| \--- | \--- | \--- |  
| \#000000 (black) | \#FFFFFF (white) | 21:1 — AAA |  
| \#333333 (dark gray) | \#FFFFFF (white) | 12.6:1 — AAA |  
| \#555555 | \#FFFFFF (white) | 7.4:1 — AA |  
| \#767676 | \#FFFFFF (white) | 4.5:1 — AA (minimum) |  
| \#0055AA (blue) | \#FFFFFF (white) | 7.2:1 — AAA |  
| \#999999 | \#FFFFFF (white) | 2.8:1 — FAIL |  
| \#AAAAAA | \#FFFFFF (white) | 2.3:1 — FAIL |

| \*\*Tool: \*\*Use WebAIM Contrast Checker (webaim.org/resources/contrastchecker) or Deque axe DevTools to verify every color pair before launch. |  
| \--- |

\# \*\*3. Typography \*\*\*\*&\*\*\*\* Text\*\*

\#\# \*\*3.1 Font Size \*\*\*\*&\*\*\*\* Resizing\*\*

Text must remain readable and functional when scaled. The core requirements are:

\- Text must be resizable up to 200% without loss of content or functionality (WCAG 1.4.4). At 200%, text should not be clipped, truncated, or have content overlap.

\- WCAG 2.1 introduces Reflow (1.4.10): content must adapt to a viewport 320 CSS pixels wide without requiring horizontal scrolling. This effectively requires responsive design.

\- Avoid using px for font sizes in critical body text; use relative units (rem, em) so users who increase their browser default font size see the benefit.

\- Minimum recommended body font size: 16px (12pt). Nothing below 12px/9pt should carry meaningful information.

\#\# \*\*3.2 Text Spacing (WCAG 1.4.12)\*\*

Users must be able to override text spacing without losing content or functionality. Your CSS must not break when the following values are applied:

\- Line height: at least 1.5 times the font size

\- Letter spacing: at least 0.12 times the font size

\- Word spacing: at least 0.16 times the font size

\- Spacing after paragraphs: at least 2 times the font size

This means avoiding fixed-height containers that clip overflowing text, and avoiding JavaScript that sets spacing values that override user preferences.

\#\# \*\*3.3 Font Choice\*\*

The ADA does not mandate specific fonts, but accessibility best practices strongly favor:

\- Highly legible sans-serif fonts for body text: Arial, Helvetica, Open Sans, Roboto, Source Sans Pro

\- Avoid decorative, script, or display fonts for body copy or interactive labels

\- Avoid all-caps text in long passages (reduces readability for cognitive disabilities and dyslexia)

\- Do not use justified text alignment (creates uneven word spacing rivers that impair readability for dyslexic users)

\#\# \*\*3.4 Text vs. Images of Text\*\*

WCAG 1.4.5 requires that wherever possible, actual text is used rather than images containing text. Images of text cannot be resized without degradation, cannot be read by screen readers without alt text, and are harder for low-vision users to consume. The only exceptions are logotypes and decorative text. Banners, CTAs, headings, and infographic labels must be live text styled with CSS, not rasterized into images.

\#\# \*\*3.5 Reading Level \*\*\*\*&\*\*\*\* Plain Language\*\*

While WCAG Level AAA (not required) addresses reading complexity, plain language is a strong accessibility practice for users with cognitive, learning, and intellectual disabilities. Aim for an 8th-grade reading level for consumer-facing content, avoid jargon without definition, and write in active voice with short sentences.

\# \*\*4. Images, Graphics \*\*\*\*&\*\*\*\* Media\*\*

\#\# \*\*4.1 Alt Text for Images\*\*

Alternative text (alt text) is the most fundamental accessibility requirement and the most commonly cited failure in ADA lawsuits. Every non-decorative image must have an alt attribute that conveys the same information or purpose as the image.

| \*\*Image Type\*\* | \*\*Requirement\*\* | \*\*Example\*\* |  
| \--- | \--- | \--- |  
| Informational image | Descriptive alt text | alt="Bar chart showing 40% revenue growth in Q3 2025" |  
| Decorative image | Empty alt="" (null alt) | alt="" — tells screen reader to skip it |  
| Functional image (button/link) | Describe the action | alt="Submit contact form" |  
| Image of text | Repeat the text exactly | alt="Welcome to Lighthouse Key Resort" |  
| Complex image (chart, diagram) | Short alt \+ long description | alt="Sales chart" \+ aria-describedby pointing to prose |

| \*\*Common Mistake: \*\*File names like "IMG\_4523.jpg" or generic labels like "photo" or "image" are not valid alt text. Always write alt text from the perspective of a person who cannot see the image: what does it communicate? |  
| \--- |

\#\# \*\*4.2 Video \*\*\*\*&\*\*\*\* Audio\*\*

\- Captions (Level A): All pre-recorded video with audio must have synchronized captions. Live video must have real-time captions (AA).

\- Audio descriptions (AA): Pre-recorded video must have an audio description track for visually conveyed information not in the audio (e.g., on-screen text, visual actions).

\- Transcripts: All pre-recorded audio-only content (podcasts, recordings) must have a text transcript.

\- No autoplay: Content that auto-plays audio for more than 3 seconds must have a mechanism to stop, pause, or mute it (independent of system volume).

\- Pause/stop controls: Any moving, blinking, scrolling, or auto-updating content that starts automatically must have user controls to pause or stop it.

\#\# \*\*4.3 Seizure Safety\*\*

Content must not flash more than three times per second. Flashing content broader than 25% of the screen at high contrast (the "general flash threshold") must be eliminated or confined to a small, peripheral area. This protects users with photosensitive epilepsy.

\# \*\*5. Page Structure \*\*\*\*&\*\*\*\* Navigation\*\*

\#\# \*\*5.1 Headings\*\*

Headings are the primary navigation tool for screen reader users. Heading structure must be logical and hierarchical, not driven by visual appearance.

\- Every page must have exactly one H1, describing the main topic of that page

`- Subheadings follow in descending order: H1 → H2 → H3, etc. Never skip a level (e.g., no H1 → H3)`

\- Do not use heading tags (H2, H3) just to make text visually larger — use CSS classes instead

\- Headings must be unique within a page unless structure makes duplication unambiguous (e.g., "Description" repeated in two table columns)

\#\# \*\*5.2 Page Titles\*\*

Every page must have a unique, descriptive \<title\> tag (WCAG 2.4.2). It is the first thing a screen reader announces. Format: "Page Name | Site Name" is best practice. A homepage might read "Home | Lighthouse Key Resort." An article: "Investment Overview | Lighthouse Key Resort."

\#\# \*\*5.3 Language Declaration\*\*

The HTML lang attribute must be set on every page (e.g., \<html lang="en"\>). This enables screen readers to use the correct pronunciation rules. If a section of content switches to another language, use the lang attribute on that element as well.

\#\# \*\*5.4 Skip Navigation Links\*\*

A skip link must be the very first focusable element on every page. It allows keyboard and screen reader users to bypass repeated navigation and jump directly to main content. It can be visually hidden until focused.

Implementation: \<a href="\#main-content" class="skip-link"\>Skip to main content\</a\>

\#\# \*\*5.5 Consistent Navigation\*\*

\- Navigation menus that appear on multiple pages must appear in the same relative order on each page (WCAG 3.2.3)

\- Components with the same function across pages must be labeled consistently (WCAG 3.2.4)

\- Provide multiple ways to find content: navigation menu, search, sitemap, and/or breadcrumb trail

\#\# \*\*5.6 Links\*\*

\- Every link must have a meaningful, descriptive label. Avoid "click here," "read more," or "learn more" without context.

\- Link purpose must be determinable from the link text alone, or from the link text plus its surrounding sentence or list item.

\- If multiple links on a page go to different destinations, they must have different text (or accessible names).

\- When a link opens in a new tab or window, warn users in the link text or via an icon with alt text: e.g., "Annual Report (opens in new tab)."

\# \*\*6. Keyboard \*\*\*\*&\*\*\*\* Motor Accessibility\*\*

\#\# \*\*6.1 Full Keyboard Operability\*\*

Every function available by mouse must also be available via keyboard alone (WCAG 2.1.1). This serves users with motor impairments who rely on keyboards, switch controls, sip-and-puff devices, and other alternative inputs.

\- Tab: moves focus forward through interactive elements

\- Shift+Tab: moves focus backward

\- Enter: activates links and buttons

\- Space: activates buttons and checkboxes

\- Arrow keys: navigate within widgets (menus, radios, tabs, sliders)

\- Escape: closes modals, tooltips, and dropdowns

\#\# \*\*6.2 No Keyboard Traps\*\*

Users must never be unable to move keyboard focus away from any component using standard keys (WCAG 2.1.2). A common trap is a modal dialog that does not return focus when closed, or a custom widget that captures Tab without providing an exit path. If non-standard keys are required to leave a component, users must be informed.

\#\# \*\*6.3 Visible Focus Indicators\*\*

Every interactive element must display a visible focus indicator when navigated to by keyboard (WCAG 2.4.7). Browser default focus outlines (e.g., the blue ring in Chrome) are acceptable but weak. Best practice:

\- Use a highly visible focus ring: 3px solid outline with 2px offset, in a high-contrast color against the element

\- Never suppress focus styles with outline: none or outline: 0 in CSS without providing a custom replacement

\- Test all interactive elements — buttons, links, form fields, custom widgets — by tabbing through the entire page

\#\# \*\*6.4 Focus Order\*\*

Keyboard focus must move in a sequence that preserves meaning and operability (WCAG 2.4.3). Focus order must match the visual reading order. Common violations: modals that appear visually but receive focus after unrelated elements, and sticky headers that visually appear before page content but receive keyboard focus last.

\#\# \*\*6.5 Touch Targets\*\*

Interactive elements must be large enough to tap reliably. Per WCAG 2.2 (the current standard as of October 2025): target size must be at least 24x24 CSS pixels, with sufficient spacing. WebAIM and Apple Human Interface Guidelines recommend 44x44px as the gold standard. Apply generous padding to small icons and text links.

\# \*\*7. Forms \*\*\*\*&\*\*\*\* Interactive Elements\*\*

\#\# \*\*7.1 Form Labels\*\*

Every form input must have a visible, programmatically associated label. This is one of the most-failed criteria in ADA lawsuits because many sites use CSS-only styling to float labels inside inputs, or omit labels entirely in favor of placeholders.

\- Use the HTML \<label\> element with a for attribute matching the input's id. This is the simplest, most reliable method.

\- Alternatively, use aria-label or aria-labelledby on the input directly.

\- Never use placeholder text as the sole label. Placeholders disappear when users begin typing, leaving no reference to what the field requires.

\- Required fields: mark them visually (e.g., with an asterisk) AND programmatically using the required attribute or aria-required="true."

\#\# \*\*7.2 Error Messages\*\*

Form error handling must satisfy three criteria:

\- Error identification (WCAG 3.3.1): If a submission error is detected, the field in error must be identified and described in text.

\- Labels/instructions (WCAG 3.3.2): Provide clear instructions for required input before users submit (e.g., "Password must be 8+ characters and include a number.").

\- Error suggestion (WCAG 3.3.3, AA): When an input error is detected and suggestions for correction are known, they must be provided.

Example of compliant error pattern: Highlight the field in error, show an icon, and provide a specific inline message: "Please enter a valid email address (e.g., name@example.com)." Move focus to the error summary or the first errored field on submit.

\#\# \*\*7.3 Timeouts\*\*

If a timed session (e.g., a checkout, a form with an auto-logout) is present, users must be warned before it expires and given the option to extend it. The exception is sessions longer than 20 hours or real-time events.

\#\# \*\*7.4 Authentication (WCAG 2.2)\*\*

Cognitive function tests (like CAPTCHAs that require decoding distorted text, or memory-based login steps) must either offer an accessible alternative or be avoidable. Passwords must allow pasting. One-time codes must allow copy-paste from SMS or email. Never require transcription of complex codes.

\# \*\*8. Semantic HTML \*\*\*\*&\*\*\*\* ARIA\*\*

\#\# \*\*8.1 Why Semantic HTML Comes First\*\*

Proper semantic HTML is the foundation of accessibility. When HTML is used correctly, screen readers and assistive technologies can interpret your content without additional effort. Semantic HTML conveys meaning: a \<button\> is inherently activatable by keyboard; an \<h2\> is inherently a subheading. Custom-styled \<div\> elements lack this meaning unless you add ARIA.

\#\# \*\*8.2 Core Semantic Elements to Use\*\*

\- \<header\>, \<nav\>, \<main\>, \<aside\>, \<footer\> — establish landmark regions for screen reader navigation

\- \<h1\>–\<h6\> — for heading hierarchy (never for visual sizing alone)

\- \<ul\>, \<ol\>, \<li\> — for lists (navigation menus, item collections)

\- \<table\>, \<th\>, \<td\>, \<caption\> — for data tables (not layout)

\- \<button\> — for interactive actions (not \<div onclick="..."\>)

\- \<a href="..."\> — for navigation to URLs (not \<div onclick="window.location..."\>)

\- \<input\>, \<label\>, \<fieldset\>, \<legend\> — for all form elements

\#\# \*\*8.3 ARIA: When and How\*\*

ARIA (Accessible Rich Internet Applications) should supplement HTML, not replace it. The first rule of ARIA: do not use ARIA if you can use a native HTML element instead.

\- aria-label: provides an accessible name when visible text is absent (e.g., an icon button: \<button aria-label="Close dialog"\>X\</button\>)

\- aria-labelledby: links an element to another element that provides its label

\- aria-describedby: links an element to supplementary description text

\- aria-required="true": marks a field as required for screen readers

\- aria-invalid="true": indicates a field is in an error state

\- aria-expanded="true/false": indicates whether a collapsible region is open or closed

\- aria-live="polite" or "assertive": announces dynamic content updates (notifications, status messages) to screen reader users without requiring focus

\- role="dialog": marks a modal dialog for screen readers; combine with aria-modal="true" and focus management

| \*\*Important: \*\*Incorrect ARIA is worse than no ARIA. A role="button" on a \<div\> without keyboard event handling creates an element that looks like a button to screen readers but cannot be activated. Always test ARIA implementations with actual screen readers (NVDA, JAWS, VoiceOver). |  
| \--- |

\#\# \*\*8.4 Tables\*\*

Data tables must have proper header markup:

\- Use \<th scope="col"\> for column headers and \<th scope="row"\> for row headers

\- Complex tables with multiple header levels require the headers and id attribute pattern

\- Always include a \<caption\> element describing the table's purpose

\- Never use tables for layout purposes. Use CSS Grid or Flexbox instead.

\# \*\*9. Testing \*\*\*\*&\*\*\*\* Auditing\*\*

\#\# \*\*9.1 Testing Strategy\*\*

No single tool catches all accessibility issues. A comprehensive strategy combines automated scanning, keyboard testing, and screen reader testing. Research indicates automated tools catch approximately 30–40% of all WCAG failures. The remainder requires human judgment.

\#\# \*\*9.2 Automated Tools\*\*

| \*\*Tool\*\* | \*\*Description\*\* |  
| \--- | \--- |  
| axe DevTools | Browser extension by Deque; industry gold standard; integrates into CI/CD pipelines |  
| WAVE | Visual overlay tool by WebAIM; excellent for quick audits; highlights issues inline on the page |  
| Google Lighthouse | Built into Chrome DevTools; provides accessibility score alongside performance and SEO |  
| Colour Contrast Analyser | Desktop tool by TPGi; use the eyedropper to test any color pair on-screen |  
| WebAIM Contrast Checker | webaim.org/resources/contrastchecker — free online tool; enter hex values directly |

\#\# \*\*9.3 Manual Testing Checklist\*\*

\- Keyboard-only navigation: Unplug your mouse. Tab through every page. Verify you can reach all interactive elements, no traps exist, and focus is always visible.

\- Screen reader testing: Test with NVDA (Windows, free), JAWS (Windows, paid), or VoiceOver (Mac/iOS, built-in). Verify headings, images, links, forms, and dynamic content are announced correctly.

\- Zoom to 200%: Verify no content is clipped, hidden, or overlapping. Test at 400% for WCAG 1.4.10 reflow.

\- Disable CSS: Verify content reading order is logical without styles applied.

\- Color blindness simulation: Use browser extensions like Colorblinding or Chrome DevTools rendering emulation to simulate deuteranopia, protanopia, tritanopia.

\#\# \*\*9.4 Ongoing Compliance\*\*

Accessibility is not a one-time audit. Every new feature, content update, or CMS-generated page must be evaluated. Best practices:

\- Integrate axe or similar into your CI/CD pipeline to block accessibility regressions automatically

\- Include accessibility review in your design and code review process

\- Post a public Accessibility Statement on your website describing your compliance status, known limitations, and a contact method for users to report issues

\- Conduct a full manual audit at least annually, or whenever a major redesign occurs

\# \*\*10. Quick Reference Checklist\*\*

Use this checklist before launching any new page, feature, or content update.

\#\# \*\*Color \*\*\*\*&\*\*\*\* Contrast\*\*

\- All normal text meets 4.5:1 contrast against its background

\- All large text (18pt+ or 14pt+ bold) meets 3:1 contrast

\- All UI components (buttons, inputs, focus rings) meet 3:1 contrast

\- Color is never the only visual method of conveying information

\- Links visually distinguished from body text (underline or 3:1 contrast vs. text)

\#\# \*\*Typography \*\*\*\*&\*\*\*\* Text\*\*

\- Body font minimum 16px; relative units used

\- Text resizes to 200% without content loss

\- Page reflows correctly at 320px viewport width

\- No justified text; no all-caps in body copy

\- Live text used, not images of text, for all meaningful content

\#\# \*\*Images \*\*\*\*&\*\*\*\* Media\*\*

\- All informational images have descriptive alt text

\- All decorative images have null alt (alt="")

\- All functional images (linked icons) have descriptive alt text

\- All video has captions; complex video has audio descriptions

\- No content flashes more than 3 times per second

\#\# \*\*Structure \*\*\*\*&\*\*\*\* Navigation\*\*

\- Every page has a unique, descriptive \<title\>

\- One H1 per page; heading hierarchy is logical and sequential

\- HTML lang attribute set on every page

\- Skip navigation link is the first focusable element

\- Navigation order is consistent across pages

\- Links have meaningful, descriptive text

\#\# \*\*Keyboard \*\*\*\*&\*\*\*\* Focus\*\*

\- All functionality is operable by keyboard

\- No keyboard traps exist

\- Visible focus indicator on all interactive elements

\- Focus order is logical and follows reading order

\- Touch targets are at least 24x24px (44x44px recommended)

\#\# \*\*Forms\*\*

\- Every input has a visible, programmatically associated label

\- Placeholder text is supplementary, not the primary label

\- Required fields marked visually and programmatically

\- Error messages are specific, inline, and move focus on submit

\- Form instructions provided before fields, not only after errors

\#\# \*\*Code \*\*\*\*&\*\*\*\* ARIA\*\*

\- Semantic HTML elements used for structure and interaction

\- No layout tables; proper data table markup when tables are used

\- ARIA used only when HTML semantics are insufficient

\- All ARIA attributes are correctly applied and tested

\- Status messages announced via aria-live regions

\#\# \*\*Testing\*\*

\- Automated scan completed (axe, WAVE, or Lighthouse) — zero errors

\- Full keyboard navigation test completed

\- Screen reader test completed on major content types

\- Zoom/reflow tested at 200% and 400%

\- Accessibility Statement published and up to date

| \*\*Final Note: \*\*The DOJ has signaled that WCAG 2.2 (released October 2023\) may eventually replace WCAG 2.1 as the legal standard. WCAG 2.2 is backward-compatible and adds requirements for stronger focus indicators, larger touch targets, reduced cognitive load on authentication, and drag-and-drop alternatives. Building to WCAG 2.2 Level AA today is the most future-proof approach. |  
| \--- |