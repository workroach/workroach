// ── AI ROACH NAME GENERATOR ───────────────────────────────────────────────────
import { QUESTIONS } from '../data/constants';

export async function generateRoachName(profile, quadrant, answers) {
  const sorted = [...QUESTIONS].sort((a, b) => (answers[a.id] || 0) - (answers[b.id] || 0));
  const worst = sorted[0];
  const best = sorted[sorted.length - 1];
  const avg = Object.values(answers).length
    ? Object.values(answers).reduce((a, b) => a + b, 0) / Object.values(answers).length
    : 3;

  const tier = avg <= 3
    ? 'BRUTALLY SPECIFIC (1.0–3.0)'
    : avg <= 4
      ? 'DARK POETRY (3.0–4.0)'
      : 'HOPE LIVES (4.0–5.0)';

  const tierGuide = avg <= 3
    ? `BRUTALLY SPECIFIC tier. Names that are almost too accurate. Uncomfortably precise. Like a job description that was never written down.
Examples: The Sunday Evening Email Reader / The Person Who Trains Their Own Replacement / The Meeting That Could Have Been a Raise / The Last One to Leave Every Time / The Permanent Volunteer / The Unbudgeted Overtime / The Gratitude That Doesn't Pay Rent`
    : avg <= 4
      ? `DARK POETRY tier. Names that sting beautifully. Lyrical, not literal. The kind people screenshot and send without a word.
Examples: The Load-Bearing Wall Nobody Sees / The Invisible Infrastructure / The Margin With a Name / The Quiet Cost of Someone Else's Ambition / The Light Left On After Everyone's Gone / The Permanent Pending`
      : `HOPE LIVES tier. Names that feel like a quiet victory. Dignified. Earned. The kind you put in your bio.
Examples: The Rare Find / The Proof That It's Possible / The Standard Worth Holding / The One Who Found the Door / The Benchmark / The Indestructible / The Exception That Disproves the Rule`;

  const prompt = `You are the naming oracle of Workroach.com. Generate ONE perfect Roach Name for this person.

THEIR DATA:
Score: ${avg.toFixed(1)}/5 | Quadrant: ${quadrant.label} | Industry: ${profile.industry || 'Corporate'} | Level: ${profile.seniority || 'unknown'} | City: ${profile.city || 'somewhere'}
Worst dimension: ${worst?.cat} | Best dimension: ${best?.cat}

TIER: ${tier}

${tierGuide}

RULES:
- No rigid format required. It can be a title, a phrase, a job description never written down, or a poetic observation.
- Must feel personal and specific to their score and situation.
- Should make them laugh, wince, or feel seen — ideally all three.
- Under 8 words.
- Reply with ONLY the name. No explanation. No quotes.`;

  try {
    const res = await fetch('/.netlify/functions/claude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 60,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const data = await res.json();
    return (data.content && data.content[0] && data.content[0].text) || 'The Quiet Backbone of the Office';
  } catch (e) {
    return 'The Silent Engine of the Workplace';
  }
}
