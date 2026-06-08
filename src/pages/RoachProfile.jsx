import { useState } from 'react';
import { Nav, Footer } from '../components/Nav';
import { AvatarSetup, generateAvatarUrl } from '../components/RoachAvatar';
import { Card, Tag } from '../components/ui';
import { Avatar } from '../components/RoachAvatar';
import { ROACH_STAGES, BADGES, QUADRANTS } from '../data/constants';

export function RoachProfilePage({ profile, roachName, totalAvg, quadrant, navProps, goto, PAGES }) {
  const [editingAvatar, setEditingAvatar] = useState(false);
  const { name, setName, email, avatar, setAvatar, soulUrl, industry, seniority, city, memberSince, auditCount, badges, gender, setGender } = profile;

  const handleSignOut = () => {
    if (window.confirm('Sign out? Your audit data will be cleared.')) {
      // Nuclear clear — get every wr- key
      const keys = Object.keys(localStorage).filter(k => k.startsWith('wr-'));
      keys.forEach(k => localStorage.removeItem(k));
      // Also clear netlify identity session
      if (window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
        window.netlifyIdentity.logout();
      }
      // Hard redirect with cache bust
      window.location.replace(window.location.origin + '/?fresh=' + Date.now());
    }
  };

  const handleAvatarConfirm = (newName, newGender, newAvatarUrl) => {
    if (newName) profile.setName(newName);
    if (newGender) setGender(newGender);
    if (newAvatarUrl) setAvatar(newAvatarUrl);
    setEditingAvatar(false);
  };

  const roachStage = ROACH_STAGES.slice().reverse().find(s => auditCount >= s.minAudits) || ROACH_STAGES[0];
  const nextStage = ROACH_STAGES.find(s => auditCount < s.minAudits);

  const memberDate = memberSince ? new Date(memberSince).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently joined';

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />

        {/* Identity card */}
        <div className="fu" style={{ marginBottom: 20 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <Avatar url={avatar} soulUrl={soulUrl} size={80} name={name} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,4vw,32px)', letterSpacing: 2, color: 'var(--text)', marginBottom: 2 }}>{name || 'Anonymous Roach'}</div>
                {roachName && <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--amber)', fontStyle: 'italic', marginBottom: 6 }}>{roachName}</div>}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--fm)', fontSize: 10, padding: '3px 10px', background: 'var(--aglow)', border: '1px solid var(--bdr)', borderRadius: 20, color: 'var(--amber)' }}>{roachStage.emoji} {roachStage.label}</span>
                  {industry && <span style={{ fontFamily: 'var(--fm)', fontSize: 10, padding: '3px 10px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 20, color: 'var(--tdim)' }}>{industry}</span>}
                  {city && <span style={{ fontFamily: 'var(--fm)', fontSize: 10, padding: '3px 10px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 20, color: 'var(--tdim)' }}>{city}</span>}
                </div>
              </div>
            </div>

            {editingAvatar && (
          <div style={{ marginTop: 16, padding: 16, background: 'var(--inp)', borderRadius: 10, border: '1px solid var(--bdr)' }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--amber)', letterSpacing: 2, marginBottom: 14 }}>EDIT YOUR ROACH</div>
            <AvatarSetup initialName={name} initialGender={gender} onConfirm={handleAvatarConfirm} />
            <button onClick={() => setEditingAvatar(false)} style={{ marginTop: 10, width: '100%', padding: '9px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1 }}>Cancel</button>
          </div>
        )}

        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--bdr)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 12 }}>
              {[
                { l: 'Member Since', v: memberDate },
                { l: 'Audits Completed', v: String(auditCount) },
                { l: 'Current Score', v: totalAvg ? totalAvg.toFixed(1) + '/5' : 'No audit yet' },
                { l: 'Quadrant', v: quadrant ? quadrant.label : '—' },
              ].map(item => (
                <div key={item.l}>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', letterSpacing: 1, marginBottom: 3 }}>{item.l}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(13px,2vw,17px)', color: 'var(--amber)', letterSpacing: 1 }}>{item.v}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Roach Stage progress */}
        <div className="fu" style={{ animationDelay: '.06s', marginBottom: 16 }}>
          <Card>
            <Tag>Roach Stage</Tag>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {ROACH_STAGES.map((stage, i) => {
                const reached = auditCount >= stage.minAudits;
                return (
                  <div key={stage.id} style={{ flex: 1, textAlign: 'center', padding: '10px 6px', borderRadius: 8, background: reached ? 'var(--aglow)' : 'var(--inp)', border: '1px solid ' + (reached ? 'var(--amber)' : 'var(--bdr)'), transition: 'all .3s' }}>
                    <div style={{ fontSize: 'clamp(16px,2.5vw,24px)', marginBottom: 4 }}>{stage.emoji}</div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(7px,.9vw,9px)', color: reached ? 'var(--amber)' : 'var(--tdim)', letterSpacing: .5 }}>{stage.label}</div>
                  </div>
                );
              })}
            </div>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.7 }}>
              {roachStage.desc}
              {nextStage && ` Complete ${nextStage.minAudits - auditCount} more audit${nextStage.minAudits - auditCount > 1 ? 's' : ''} to reach ${nextStage.emoji} ${nextStage.label}.`}
            </p>
          </Card>
        </div>

        {/* Badges */}
        <div className="fu" style={{ animationDelay: '.1s', marginBottom: 16 }}>
          <Card>
            <Tag>Badges</Tag>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
              {BADGES.map(badge => {
                const earned = badges.includes(badge.id);
                return (
                  <div key={badge.id} style={{ padding: '12px', background: earned ? 'var(--aglow)' : 'var(--inp)', border: '1px solid ' + (earned ? 'var(--bhi)' : 'var(--bdr)'), borderRadius: 8, opacity: earned ? 1 : .4 }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{badge.emoji}</div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: earned ? 'var(--amber)' : 'var(--tdim)', letterSpacing: 1, marginBottom: 3 }}>{badge.label}</div>
                    <div style={{ fontFamily: 'var(--fs)', fontSize: 11, color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.5 }}>{badge.desc}</div>
                    {!earned && <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', marginTop: 4 }}>Locked</div>}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Audit history */}
        <div className="fu" style={{ animationDelay: '.14s', marginBottom: 16 }}>
          <Card>
            <Tag>Audit History</Tag>
            {auditCount === 0 ? (
              <p style={{ fontFamily: 'var(--fs)', fontSize: 14, color: 'var(--tdim)', fontStyle: 'italic' }}>No audits yet. Take your first audit to build your history.</p>
            ) : (
              <div>
                <div style={{ padding: '12px 14px', background: 'var(--inp)', borderRadius: 8, border: '1px solid var(--bdr)', marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--tdim)', letterSpacing: 1, marginBottom: 3 }}>LATEST AUDIT</div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: 22, color: totalAvg >= 4 ? '#22c55e' : totalAvg >= 3 ? 'var(--amber)' : '#c0392b' }}>{totalAvg ? totalAvg.toFixed(1) + '/5' : '—'}</div>
                    </div>
                    {quadrant && <div style={{ fontFamily: 'var(--fm)', fontSize: 10, padding: '4px 10px', border: '1px solid ' + quadrant.color + '40', borderRadius: 20, color: quadrant.color }}>{quadrant.emoji} {quadrant.label}</div>}
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--fs)', fontSize: 12, color: 'var(--tdim)', fontStyle: 'italic' }}>Your audit scores are saved locally. Backend sync coming soon.</p>
              </div>
            )}
          </Card>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => goto(PAGES.PROFILE)} style={{ background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, padding: '12px 24px', color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 2 }}>
            {auditCount === 0 ? '🐜 Start My First Audit' : '🐜 Take New Audit'}
          </button>
          <button onClick={() => setEditingAvatar(!editingAvatar)} style={{ background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, padding: '12px 24px', color: 'var(--amber)', fontFamily: 'var(--fm)', fontSize: 12, cursor: 'pointer', letterSpacing: 2 }}>
            ✏️ Edit Avatar
          </button>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 8, padding: '12px 24px', color: '#c0392b', fontFamily: 'var(--fm)', fontSize: 12, cursor: 'pointer', letterSpacing: 2 }}>
            ↩ Sign Out
          </button>
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
