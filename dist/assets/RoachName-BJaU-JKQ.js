import{n as e,t}from"./index-BcO11jVS.js";e();async function n(e,n,r){let i=[...t].sort((e,t)=>(r[e.id]||0)-(r[t.id]||0)),a=i[0],o=i[i.length-1],s=Object.values(r).length?Object.values(r).reduce((e,t)=>e+t,0)/Object.values(r).length:3,c=s<=3?`BRUTALLY SPECIFIC (1.0–3.0)`:s<=4?`DARK POETRY (3.0–4.0)`:`HOPE LIVES (4.0–5.0)`,l=s<=3?`BRUTALLY SPECIFIC tier. Names that are almost too accurate. Uncomfortably precise. Like a job description that was never written down.
Examples: The Sunday Evening Email Reader / The Person Who Trains Their Own Replacement / The Meeting That Could Have Been a Raise / The Last One to Leave Every Time / The Permanent Volunteer / The Unbudgeted Overtime / The Gratitude That Doesn't Pay Rent`:s<=4?`DARK POETRY tier. Names that sting beautifully. Lyrical, not literal. The kind people screenshot and send without a word.
Examples: The Load-Bearing Wall Nobody Sees / The Invisible Infrastructure / The Margin With a Name / The Quiet Cost of Someone Else's Ambition / The Light Left On After Everyone's Gone / The Permanent Pending`:`HOPE LIVES tier. Names that feel like a quiet victory. Dignified. Earned. The kind you put in your bio.
Examples: The Rare Find / The Proof That It's Possible / The Standard Worth Holding / The One Who Found the Door / The Benchmark / The Indestructible / The Exception That Disproves the Rule`,u=`You are the naming oracle of Workroach.com. Generate ONE perfect Roach Name for this person.

THEIR DATA:
Score: ${s.toFixed(1)}/5 | Quadrant: ${n.label} | Industry: ${e.industry||`Corporate`} | Level: ${e.seniority||`unknown`} | City: ${e.city||`somewhere`}
Worst dimension: ${a?.cat} | Best dimension: ${o?.cat}

TIER: ${c}

${l}

RULES:
- No rigid format required. It can be a title, a phrase, a job description never written down, or a poetic observation.
- Must feel personal and specific to their score and situation.
- Should make them laugh, wince, or feel seen — ideally all three.
- Under 8 words.
- Reply with ONLY the name. No explanation. No quotes.`;try{let e=await(await fetch(`/.netlify/functions/claude`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({model:`claude-sonnet-4-20250514`,max_tokens:60,messages:[{role:`user`,content:u}]})})).json();return e.content&&e.content[0]&&e.content[0].text||`The Quiet Backbone of the Office`}catch{return`The Silent Engine of the Workplace`}}export{n as generateRoachName};