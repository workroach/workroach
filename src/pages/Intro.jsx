import { useState } from 'react';
import { Nav, Footer } from '../components/Nav';
import { RoachLogo } from '../components/ui';
import { QUADRANTS } from '../data/constants';

// ── TAG INFO POPUPS ───────────────────────────────────────────────────────────
const TAG_INFO = {
  '💰 Pay':         { title: 'Pay & Rewards', desc: 'Are you fairly compensated for the work you actually do? We calculate your real hourly rate including unpaid overtime.' },
  '⏱️ Overtime':    { title: 'Workload & Hours', desc: 'How much extra are you working beyond your agreed scope — paid, unpaid, and from home after hours?' },
  '🚪 Boundaries':  { title: 'Boundaries & Time', desc: 'Do they respect your evenings and weekends? Or is "always available" the unwritten rule?' },
  '📈 Growth':      { title: 'Career Growth', desc: 'Are you actually growing — or just getting more experienced at the same plateau?' },
  '🎙️ Voice':       { title: 'Voice & Influence', desc: 'When you speak up, does it land? Or does feedback disappear into a void?' },
  '🏆 Recognition': { title: 'Recognition', desc: 'When you do great work, what actually happens? Silence? Credit to someone else? Just more work?' },
  '🧠 Safety':      { title: 'Psychological Safety', desc: 'Can you make mistakes, say no, or disagree — without it costing you?' },
  '👤 Manager':     { title: 'Manager Quality', desc: 'Does your manager advocate for you? Or take credit, give blame, and make Mondays worse?' },
  '⚖️ Inclusion':   { title: 'Fairness & Inclusion', desc: 'Is your company\'s approach to inclusion lived reality — or just a poster on the wall?' },
  '💡 Fair Rate':   { title: 'Fair Rate Calculator™', desc: 'We calculate what the market actually owes you — and give you the exact sentences to say in your next appraisal.' },
  '🐜 Roach Name':  { title: 'Your Roach Name', desc: 'An AI-generated name that captures your work reality in under 8 words. Uncomfortably accurate.' },
};

function TagChip({ tag, onClick }) {
  return (
    <span
      onClick={() => onClick(tag)}
      style={{ background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 20, padding: '4px 12px', fontSize: 'clamp(10px,1.2vw,12px)', color: 'var(--tdim)', fontFamily: 'var(--fm)', cursor: 'pointer', transition: 'all .15s', display: 'inline-flex', alignItems: 'center', gap: 4 }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--amber)'; e.currentTarget.style.color = 'var(--amber)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.color = 'var(--tdim)'; }}
    >
      {tag}
    </span>
  );
}

function TagPopup({ tag, info, onClose }) {
  if (!tag || !info) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--card)', border: '1px solid var(--bhi)', borderRadius: 12, padding: 'clamp(20px,4vw,32px)', maxWidth: 360, width: '100%' }}>
        <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,24px)', letterSpacing: 2, color: 'var(--amber)', marginBottom: 10 }}>{info.title.toUpperCase()}</div>
        <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8 }}>{info.desc}</p>
        <button onClick={onClose} style={{ marginTop: 18, width: '100%', padding: '10px', background: 'var(--aglow)', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--amber)', fontFamily: 'var(--fm)', fontSize: 11, cursor: 'pointer', letterSpacing: 2 }}>GOT IT ✓</button>
      </div>
    </div>
  );
}

export function IntroPage({ navProps, goto, PAGES, profile, onShowWelcome }) {
  const [activeTag, setActiveTag] = useState(null);
  const [showScale, setShowScale] = useState(false);

  const tags = Object.keys(TAG_INFO);

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />

        {/* Tag popup */}
        <TagPopup tag={activeTag} info={TAG_INFO[activeTag]} onClose={() => setActiveTag(null)} />

        <div style={{ textAlign: 'center' }}>

          {/* Logo + Title */}
          <div style={{ marginBottom: 5, animation: 'crawl 2.2s ease-in-out infinite', display: 'inline-block' }}>
            <RoachLogo size={72} />
          </div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(52px,10vw,110px)', letterSpacing: 4, lineHeight: .92, marginBottom: 10, color: 'var(--text)', animation: 'flicker 7s infinite' }}>
            WORK<span style={{ color: 'var(--amber)' }}>ROACH</span>
          </h1>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(15px,2.5vw,20px)', fontStyle: 'italic', color: 'var(--tmid)', marginBottom: 6 }}>
            "They exploited you. Now shine the light."
          </p>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(8px,1vw,10px)', letterSpacing: 3, color: 'var(--adim)', marginBottom: 28 }}>
            THE WORKPLACE AUDIT THAT NEVER DIES
          </div>

          {/* What to do — clear instruction */}
          <div style={{ maxWidth: 480, margin: '0 auto 28px', padding: 'clamp(16px,2.5vw,24px)', background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 12 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', letterSpacing: 3, color: 'var(--adim)', marginBottom: 10 }}>HOW IT WORKS</div>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.6vw,16px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.85, margin: 0 }}>
              Answer a set of questions about your job — pay, hours, your manager, how respected you feel. Takes about 6 minutes. We calculate your <strong style={{ color: 'var(--amber)', fontStyle: 'normal' }}>Survival Index</strong> and tell you exactly where your employer is failing you.
            </p>
          </div>

          {/* CTA — primary */}
          <button
            onClick={() => {
              const hasEmail = localStorage.getItem('wr-email');
              if (!hasEmail) {
                onShowWelcome();
              } else {
                goto(PAGES.PROFILE);
              }
            }}
            style={{ display: 'block', maxWidth: 'clamp(260px,50%,400px)', margin: '0 auto 10px', width: '100%', padding: 'clamp(14px,2vw,18px) 24px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 'clamp(12px,1.5vw,14px)', fontWeight: 700, cursor: 'pointer', letterSpacing: 2, boxShadow: '0 4px 18px var(--aglow)' }}
          >
            BEGIN SURVIVAL AUDIT →
          </button>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', color: 'var(--tdim)', letterSpacing: 1, marginBottom: 32 }}>
            Anonymous · ~6 min · No data sold. Ever.
          </div>

          {/* What we audit — tappable tags with popups */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', letterSpacing: 3, color: 'var(--adim)', marginBottom: 12 }}>
              WHAT WE AUDIT — TAP ANY TO LEARN MORE
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(5px,1vw,8px)', justifyContent: 'center' }}>
              {tags.map(t => <TagChip key={t} tag={t} onClick={setActiveTag} />)}
            </div>
          </div>

          {/* Quadrant scale — collapsed by default */}
          <div style={{ maxWidth: 'clamp(300px,50%,440px)', margin: '0 auto 28px' }}>
            <button
              onClick={() => setShowScale(s => !s)}
              style={{ background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, padding: '8px 20px', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 2, marginBottom: 10, width: '100%' }}
            >
              {showScale ? '▲ HIDE' : '▼ WHAT SCORES MEAN'}
            </button>
            {showScale && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[...QUADRANTS].reverse().map(q => (
                  <div key={q.id} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 13px', background: 'var(--inp)', borderRadius: 7, border: '1px solid var(--bdr)', textAlign: 'left' }}>
                    <span style={{ fontSize: 'clamp(12px,1.5vw,16px)' }}>{q.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.2vw,12px)', color: q.color }}>{q.label}</div>
                      <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(10px,1.1vw,12px)', color: 'var(--tdim)', fontStyle: 'italic', marginTop: 2 }}>{q.tagline}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(8px,1vw,10px)', padding: '2px 6px', border: '1px solid ' + q.color + '35', borderRadius: 3, color: q.color, flexShrink: 0 }}>{q.badge}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Secondary nav */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              { label: '📜 Our Philosophy', page: PAGES.PHILOSOPHY },
              { label: '🏛️ The Parliament', page: PAGES.PARLIAMENT },
              { label: '🧾 The Wall', page: PAGES.WALL },
            ].map(btn => (
              <button key={btn.page} onClick={() => goto(btn.page)} style={{ padding: '9px 16px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.2vw,12px)', color: 'var(--tdim)', cursor: 'pointer', letterSpacing: 1 }}>
                {btn.label}
              </button>
            ))}
          </div>

          {profile.name && (
            <button onClick={() => goto(PAGES.ROACH_PROFILE)} style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--amber)', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 20, padding: '6px 16px', cursor: 'pointer', letterSpacing: 1, marginBottom: 20 }}>
              🐜 My Roach Profile
            </button>
          )}
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
