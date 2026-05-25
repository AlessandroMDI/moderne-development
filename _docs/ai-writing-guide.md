# AI Writing Guide — How to Not Sound Like AI

Use this document when prompting AI to generate copy, or when editing AI output for the Modstone website.

**Related documents:**
- `tone-style.md` — brand voice, personality rules, and Modstone-specific banned words. Read this first before writing anything.
- `content.md` — all live website copy. Run every section through the checklist at the bottom of this document before it publishes.

---

## Why AI Writing Gets Flagged

Two technical concepts explain why AI sounds like AI:

- **Low perplexity** — AI chooses predictable, safe word combinations. Human writing spikes unpredictably because people write from memory, rhythm, specificity, and private context. AI averages 20–30 perplexity units; humans average 80–100.
- **Low burstiness** — AI produces sentences of nearly identical length and structure. Humans naturally mix one-word punches with long, winding elaborations. AI burstiness scores cluster at 0.2–0.4; humans spread 0.6–1.2.

The fix for both: **make sentences unpredictable in length and word choice.**

---

## The Banned Word List

Never use these. They are the most statistically flagged AI markers — some appear 50–700x more often in AI text than human text.

### Single words
- delve / dive into
- robust
- pivotal / crucial / vital
- transformative / groundbreaking / game-changing
- innovative / cutting-edge
- seamless
- comprehensive
- intricate / multifaceted
- holistic
- vibrant
- elevate
- empower
- leverage (use: "use")
- harness
- foster
- bolster
- underscore
- unpack
- resonate
- enhance
- tapestry
- landscape (used metaphorically, e.g. "the landscape of real estate")
- realm
- testament (e.g. "a testament to...")
- nuanced (used as empty praise)
- aligns / alignment
- offerings

### Compound / hyphenated overuse
AI hyphenates these with robotic consistency — humans don't:
- data-driven
- client-facing
- end-to-end
- real-time
- high-quality
- long-term
- decision-making
- cross-functional
- well-known
- third-party

Use these occasionally and inconsistently, the way a real writer would.

---

## Banned Phrase Structures

### Cliché openings (never start copy with these)
- "In today's fast-paced world..."
- "In today's rapidly evolving digital landscape..."
- "In the dynamic world of..."
- "As the world becomes increasingly..."
- "At its core..."

### Fake conflict / fake revelation phrases
- "But here's the truth..."
- "But here's what nobody's saying..."
- "What most people don't realize..."

### Empty transition filler
- "It's worth noting that..."
- "Needless to say..."
- "With that in mind..."
- "At the end of the day..."
- "Moving forward..."
- "It goes without saying..."
- "This is not just about X — it's about Y"

### Marketing buzzword structures
- "Unlock [noun]" — e.g. "Unlock your potential"
- "From X to Y" — e.g. "From vision to reality"
- "X Things You Need to Know"
- "Master X in X Days"
- "The future of [industry]"
- "Where [noun] meets [noun]" — e.g. "Where technology meets real estate"

---

## Structural Patterns to Break

### 1. Uniform paragraph length
AI produces paragraphs of nearly identical word count. Fix: mix a single-sentence paragraph with a longer one. Use fragments intentionally.

### 2. "Bold term: explanation" lists
Every AI list looks like:
> **Speed:** We move fast.
> **Precision:** We get it right.

This is a dead giveaway. Either avoid bullets entirely for that section, or make the list items grammatically varied and not all the same length.

### 3. Em dash overuse
AI uses em dashes multiple times per paragraph, far more than any human would. Use them sparingly — one per section maximum.

### 4. Parallel sentence openers
AI loves to start three consecutive sentences with the same structure:
> "We believe in transparency. We believe in results. We believe in our clients."

One parallel construction is stylistic. Two is borderline. Three is AI.

### 5. Perfectly balanced "X, Y, and Z" triplets
AI defaults to three-item lists everywhere. Mix in two-item and four-item constructions.

### 6. Hedging every claim
AI softens everything: "generally," "typically," "in most cases," "often," "can help," "may lead to." Pick a lane and state it. Real writers make claims.

---

## Specific Phrases That Test 100x More in AI

Ranked by how much more frequent they are in AI text vs. human text:

| Phrase | AI vs. Human ratio |
|---|---|
| "complex and multifaceted" | 700x more common in AI |
| "In today's fast-paced world" | 107x |
| "aims to explore" | ~50x |
| "notable figures / notable works include" | 120x |
| "aligns with" | 16x |
| "delve" | 50x+ |
| "robust" | 50x+ |

---

## What Human Writing Actually Does

### Sentence length variation
Mix these freely:
- "We don't guess. We know."  ← two short
- "The firm has spent fifteen years building a proprietary acquisition model that most investment groups won't even consider developing, because it takes time they'd rather spend elsewhere." ← one long

### Starting sentences with conjunctions
"And," "But," "So" at the start of a sentence is human. AI rarely does it.

### Specificity over vague claims
- AI: "We leverage innovative strategies to deliver transformative results."
- Human: "We've closed 47 off-market deals in the last two years. The average hold was 26 months."

Numbers, names, and specific timelines are the fastest way to kill an AI signal.

### Imperfect rhythm
AI writing reads smoothly all the way through — too smoothly. Real copy has a deliberate rough edge somewhere. A short sharp sentence where you'd expect elaboration. A question dropped in without being answered immediately.

---

## Prompting Strategy to Get Human-Sounding Output

When using AI to generate copy for Modstone, include these instructions in every prompt:

```
Rules:
- Never use: delve, robust, pivotal, transformative, seamless, leverage, harness, elevate, empower, landscape, realm, tapestry, testament, nuanced, resonate, comprehensive, multifaceted, holistic, vibrant, innovative, cutting-edge, groundbreaking, game-changing
- Never open with "In today's..." or "At its core..."
- No "Bold: Explanation" list format
- Vary sentence length — include at least one sentence under 8 words and at least one over 25 words per section
- Use numbers and specific details instead of vague claims
- Avoid triplets (X, Y, and Z). Mix in pairs and four-item lists
- Max one em dash per section
- Write declarative sentences. Don't hedge with "generally," "typically," or "can help"
- Tone: direct, dry confidence. Not enthusiastic. Not inspiring. Grounded.
```

---

## Quick Edit Checklist

Run every piece of copy through this before publishing:

- [ ] Replaced all banned words
- [ ] Removed all filler opening phrases
- [ ] At least one short sentence (under 8 words) per section
- [ ] No three consecutive sentences with parallel structure
- [ ] Em dashes used max once per section
- [ ] Lists are not all "Bold: explanation" format
- [ ] At least one specific number, date, or named detail in the section
- [ ] Read aloud — does any sentence feel "smooth" in a fake way?
