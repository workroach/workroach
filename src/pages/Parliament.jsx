import { Nav, Footer } from '../components/Nav';

const MINISTRIES = [
  { emoji: '👑', title: 'The Prime Roach', role: 'Leader of the Swarm', desc: 'Community elected. Sets direction. Casts the deciding vote on deadlocks. Represents Workroach publicly. Serves 6 months. Can be recalled by majority vote.', color: '#d4820a', status: 'Held by Founder · First election at 1,000 members' },
  { emoji: '💀', title: 'Ministry of Infestation', role: 'Home Affairs', desc: 'Owns the leaderboard. Decides which companies make The Crypt. Manages Roach Receipts moderation. The most powerful ministry — they control the public narrative.', color: '#c0392b', status: 'Appointment Open' },
  { emoji: '💰', title: 'Ministry of the Swarm', role: 'Finance', desc: 'Controls the community fund. Every rupee in, every rupee out is public. Proposes budget allocations. No single person can move funds without 3-ministry sign-off.', color: '#22c55e', status: 'Appointment Open' },
  { emoji: '🧠', title: 'Ministry of Intelligence', role: 'External Affairs', desc: 'Owns the data. Manages the Infestation Index reports. Decides what gets shared publicly. Handles media and journalist relationships.', color: '#3b82f6', status: 'Appointment Open' },
  { emoji: '⚖️', title: 'Ministry of Survival', role: 'Labour & Employment', desc: 'The employee advocate. Ensures Workroach never becomes employer-friendly. Veto power on any feature that could be used against employees. The conscience of the cabinet.', color: '#8b5cf6', status: 'Appointment Open' },
  { emoji: '🌿', title: 'Ministry of the Clean House', role: 'Commerce', desc: 'Manages relationships with good employers. Owns the Workroach Clean certification. The only ministry that talks to companies — with strict rules about what can be offered.', color: '#16a34a', status: 'Appointment Open' },
  { emoji: '🎨', title: 'Ministry of the Roach Name', role: 'Culture', desc: 'Owns brand, tone, creative direction. Approves all public communication. Makes sure Workroach never sounds corporate. The vibe police.', color: '#f59e0b', status: 'Appointment Open' },
  { emoji: '⚙️', title: 'Ministry of Infrastructure', role: 'Technology', desc: 'Owns the backend, the codebase, the data architecture. Decides what gets built next based on community votes.', color: '#64748b', status: 'Appointment Open' },
  { emoji: '🔥', title: 'The Opposition', role: 'Always Exists', desc: "Any member can form the opposition. They debate every cabinet decision publicly before it passes. Keeps the cabinet honest. This is the feature most community platforms skip — Workroach won't.", color: '#e67e22', status: 'Always open to all members' },
];

const RULES = [
  'One vote per verified email. No exceptions.',
  'Campaigns are 280 characters. Like a Roach Receipt.',
  'Voting open for 72 hours. Results public, permanent, on the site.',
  'All funds visible on a public dashboard at all times.',
  'Three ministry sign-off to release anything above ₹10,000.',
  'Monthly public statement from Ministry of the Swarm.',
  'No ministry can spend on themselves.',
  'Every cabinet decision is debated publicly before it passes.',
  'Any member can call a vote of no confidence with 10% member support.',
];

const ELECTION_STEPS = [
  { n: '01', t: 'Announce', d: '280 characters. Your campaign. Your vision. Like a Roach Receipt.' },
  { n: '02', t: 'Campaign', d: '72 hours. Other members can endorse, challenge, or debate publicly.' },
  { n: '03', t: 'Vote', d: 'One vote per verified member. Anonymous but counted publicly.' },
  { n: '04', t: 'Result', d: 'Permanent. Public. On the site forever. The swarm has spoken.' },
];

export function ParliamentPage({ navProps, goto, PAGES }) {
  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />

        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', letterSpacing: 4, color: 'var(--adim)', marginBottom: 12 }}>THE WORKROACH</div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(36px,7vw,72px)', letterSpacing: 4, color: 'var(--amber)', marginBottom: 12, lineHeight: .95 }}>PARLIAMENT</h1>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,1.8vw,18px)', color: 'var(--tdim)', fontStyle: 'italic', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>Democratically elected by the roaches. Accountable to the swarm. Built so no single person — including the founder — can run this alone.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginBottom: 48 }}>
          {MINISTRIES.map((m, i) => (
            <div key={i} className="fu" style={{ animationDelay: i * .05 + 's', background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: 'clamp(16px,2.5vw,24px)', borderTop: '3px solid ' + m.color }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ fontSize: 'clamp(24px,3vw,32px)' }}>{m.emoji}</div>
                <div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(14px,1.8vw,18px)', letterSpacing: 2, color: m.color, lineHeight: 1.1 }}>{m.title}</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(8px,1vw,10px)', color: 'var(--tdim)', letterSpacing: 2, marginTop: 2 }}>{m.role.toUpperCase()}</div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.75, marginBottom: 12 }}>{m.desc}</p>
              <div style={{ padding: '6px 10px', background: m.color + '15', border: '1px solid ' + m.color + '30', borderRadius: 6, fontFamily: 'var(--fm)', fontSize: 'clamp(8px,1vw,10px)', color: m.color, letterSpacing: 1 }}>{m.status}</div>
            </div>
          ))}
        </div>

        <div className="fu" style={{ marginBottom: 48 }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: 'clamp(20px,3vw,36px)' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,3.5vw,32px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 24 }}>THE RULES OF THE SWARM</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {RULES.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, paddingBottom: 12, borderBottom: i < RULES.length - 1 ? '1px solid var(--bdr)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,2.5vw,24px)', color: 'var(--amber)', minWidth: 32, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
                  <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fu" style={{ marginBottom: 48 }}>
          <div style={{ background: 'rgba(192,57,43,0.06)', border: '2px solid #c0392b', borderRadius: 12, padding: 'clamp(20px,3vw,36px)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,2.5vw,28px)', letterSpacing: 3, color: '#c0392b', marginBottom: 12 }}>THE ONE UNBREAKABLE LAW</div>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(15px,2vw,20px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>Workroach never takes money from employers to improve their standing. Ever. No exceptions. Not negotiable. Not a cabinet decision.</p>
          </div>
        </div>

        <div className="fu" style={{ marginBottom: 48 }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 12, padding: 'clamp(20px,3vw,36px)' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,3.5vw,32px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 8 }}>HOW ELECTIONS WORK</h2>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tdim)', fontStyle: 'italic', marginBottom: 20, lineHeight: 1.7 }}>Any Workroach community member can stand for any ministry. Here's how.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 14 }}>
              {ELECTION_STEPS.map(s => (
                <div key={s.n} style={{ padding: 'clamp(14px,2vw,20px)', background: 'var(--inp)', borderRadius: 8, border: '1px solid var(--bdr)' }}>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(24px,3.5vw,36px)', color: 'var(--amber)', lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(14px,1.8vw,18px)', letterSpacing: 2, color: 'var(--text)', marginBottom: 6 }}>{s.t.toUpperCase()}</div>
                  <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.6 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fu" style={{ background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 12, padding: 'clamp(24px,4vw,48px)', textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(20px,3.5vw,36px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 8 }}>FIRST ELECTION</div>
          <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,1.8vw,18px)', color: 'var(--tmid)', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.7 }}>Opens when the Workroach community reaches 1,000 verified members.</div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.3vw,13px)', color: 'var(--tdim)', letterSpacing: 2 }}>CURRENT MEMBERS: 1 · NEEDED: 999</div>
          <div style={{ marginTop: 16, background: 'var(--bdr)', borderRadius: 4, height: 8, overflow: 'hidden', maxWidth: 400, margin: '16px auto 0' }}>
            <div style={{ width: '0.1%', height: '100%', background: 'linear-gradient(90deg,var(--adim),var(--amber))', borderRadius: 4 }} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,28px)', letterSpacing: 4, color: 'var(--amber)', marginBottom: 6 }}>SURVIVE. EXPOSE. SCATTER THEM.</div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1.2vw,11px)', color: 'var(--tdim)', letterSpacing: 3 }}>WORKROACH.COM</div>
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
