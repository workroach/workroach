import { useState, useRef, useCallback, useEffect } from 'react';
import { Nav, Footer } from '../components/Nav';
import { Card, Tag, Btn, DrainMeter, Radar } from '../components/ui';
import { Avatar } from '../components/RoachAvatar';
import { QUESTIONS, scoreColor, EMAILJS_SERVICE, EMAILJS_TEMPLATE } from '../data/constants';
import emailjs from '@emailjs/browser';

// ── SCORE CARD CANVAS ─────────────────────────────────────────────────────────
function ScoreCard({ profile, quadrant, totalAvg, percAvg, structAvg, derived, roachName }) {
  const ref = useRef(null);
  const [dl, setDl] = useState(false);

  const draw = useCallback(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    const W = 900, H = 500; cv.width = W; cv.height = H;

    ctx.fillStyle = '#0c0a08'; ctx.fillRect(0, 0, W, H);
    for (let y = 0; y < H; y += 4) { ctx.fillStyle = 'rgba(0,0,0,0.06)'; ctx.fillRect(0, y, W, 1); }
    ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 2; ctx.strokeRect(10, 10, W - 20, H - 20);
    ctx.strokeStyle = 'rgba(212,130,10,0.2)'; ctx.lineWidth = 1; ctx.strokeRect(18, 18, W - 36, H - 36);
    ctx.fillStyle = '#141209'; ctx.fillRect(10, 10, 310, H - 20);
    ctx.strokeStyle = 'rgba(212,130,10,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(320, 20); ctx.lineTo(320, H - 20); ctx.stroke();

    const leftPanel = () => {
      ctx.fillStyle = '#d4820a'; ctx.font = 'bold 24px Arial'; ctx.textAlign = 'center';
      ctx.fillText('WORKROACH', 165, 196);
      ctx.fillStyle = 'rgba(212,130,10,0.5)'; ctx.font = '7px Arial';
      ctx.fillText('SURVIVAL AUDIT CERTIFICATE', 165, 210);
      ctx.strokeStyle = 'rgba(212,130,10,0.3)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, 222); ctx.lineTo(290, 222); ctx.stroke();
      ctx.fillStyle = '#f5f2ea'; ctx.font = 'bold 16px Arial'; ctx.textAlign = 'center';
      ctx.fillText(profile.name || 'Anonymous', 165, 246);
      if (profile.company) { ctx.fillStyle = 'rgba(240,235,224,0.6)'; ctx.font = '11px Arial'; ctx.fillText('at ' + profile.company, 165, 262); }
      ctx.strokeStyle = 'rgba(212,130,10,0.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, 278); ctx.lineTo(290, 278); ctx.stroke();
      if (roachName) {
        ctx.fillStyle = 'rgba(212,130,10,0.45)'; ctx.font = '7px Arial'; ctx.textAlign = 'center';
        ctx.fillText('YOUR ROACH NAME', 165, 298);
        const words = roachName.split(' '); const maxW = 230; let line = ''; const lines = [];
        ctx.font = 'italic bold 14px Arial';
        words.forEach(w => { const test = line + (line ? ' ' : '') + w; if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test; });
        if (line) lines.push(line);
        ctx.fillStyle = '#d4820a';
        lines.forEach((l, i) => ctx.fillText(l, 165, 318 + i * 19));
      }
      ctx.strokeStyle = 'rgba(212,130,10,0.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(40, H - 52); ctx.lineTo(290, H - 52); ctx.stroke();
      ctx.fillStyle = 'rgba(212,130,10,0.6)'; ctx.font = '9px Arial'; ctx.textAlign = 'center';
      ctx.fillText(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), 165, H - 32);
      ctx.fillStyle = 'rgba(212,130,10,0.35)'; ctx.font = '8px Arial';
      ctx.fillText('workroach.com', 165, H - 16);
    };

    const rightPanel = () => {
      const rx = 340;
      ctx.fillStyle = quadrant.color; ctx.font = 'bold 82px Arial'; ctx.textAlign = 'left';
      ctx.fillText(totalAvg.toFixed(1), rx, 115);
      ctx.fillStyle = 'rgba(240,235,224,0.28)'; ctx.font = 'bold 26px Arial';
      ctx.fillText('/5.0', rx + 168, 100);
      ctx.fillStyle = quadrant.color; ctx.font = 'bold 20px Arial';
      ctx.fillText(quadrant.emoji + ' ' + quadrant.label, rx, 148);
      ctx.fillStyle = quadrant.color; ctx.fillRect(rx, 160, 72, 16);
      ctx.fillStyle = '#0c0a08'; ctx.font = 'bold 7px Arial'; ctx.textAlign = 'center';
      ctx.fillText(quadrant.badge, rx + 36, 171); ctx.textAlign = 'left';
      ctx.fillStyle = 'rgba(240,235,224,0.5)'; ctx.font = 'italic 11px Arial';
      ctx.fillText('"' + quadrant.tagline + '"', rx, 200);
      ctx.strokeStyle = 'rgba(212,130,10,0.18)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(rx, 215); ctx.lineTo(W - 22, 215); ctx.stroke();

      const mets = [
        { l: 'DRAIN RATE', v: derived.drainPct + '%', c: derived.drainPct > 70 ? '#c0392b' : derived.drainPct > 40 ? '#e67e22' : '#22c55e' },
        { l: 'BURNOUT RISK', v: derived.burnoutPct + '%', c: derived.burnoutPct > 70 ? '#c0392b' : derived.burnoutPct > 40 ? '#e67e22' : '#22c55e' },
        { l: 'REAL HOURLY', v: derived.realHourly, c: '#d4820a' },
        { l: 'UNPAID OT/YR', v: derived.unpaidValue, c: '#c0392b' },
        { l: 'STRUCTURAL', v: structAvg.toFixed(1) + '/5', c: structAvg >= 4 ? '#22c55e' : structAvg >= 3 ? '#d4820a' : '#c0392b' },
        { l: 'PERCEPTION', v: percAvg.toFixed(1) + '/5', c: percAvg >= 4 ? '#22c55e' : percAvg >= 3 ? '#d4820a' : '#c0392b' },
      ];
      mets.forEach((m, i) => {
        const col = i % 3, row = Math.floor(i / 3), mx = rx + col * 180, my = 232 + row * 90;
        ctx.fillStyle = 'rgba(212,130,10,0.06)'; ctx.fillRect(mx, my, 165, 76);
        ctx.strokeStyle = 'rgba(212,130,10,0.14)'; ctx.lineWidth = 1; ctx.strokeRect(mx, my, 165, 76);
        ctx.fillStyle = 'rgba(240,235,224,0.45)'; ctx.font = '7px Arial'; ctx.textAlign = 'left';
        ctx.fillText(m.l, mx + 9, my + 18);
        ctx.fillStyle = m.c; ctx.font = 'bold 19px Arial';
        ctx.fillText(m.v, mx + 9, my + 52);
      });

      const bx = rx, by = 442, bw = W - rx - 22, bh = 7;
      ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fillRect(bx, by, bw, bh);
      const fw = bw * ((totalAvg - 1) / 4);
      const gr = ctx.createLinearGradient(bx, 0, bx + fw, 0);
      gr.addColorStop(0, '#c0392b'); gr.addColorStop(0.5, '#d4820a'); gr.addColorStop(1, '#22c55e');
      ctx.fillStyle = gr; ctx.fillRect(bx, by, fw, bh);
      ctx.fillStyle = 'rgba(240,235,224,0.3)'; ctx.font = '7px Arial';
      ctx.textAlign = 'left'; ctx.fillText('FULLY DRAINED', bx, by + 20);
      ctx.textAlign = 'right'; ctx.fillText('THRIVING', bx + bw, by + 20);
    };

    if (profile.avatar) {
      const img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save(); ctx.beginPath(); ctx.arc(165, 110, 55, 0, Math.PI * 2); ctx.clip();
        ctx.drawImage(img, 110, 55, 110, 110); ctx.restore();
        ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(165, 110, 55, 0, Math.PI * 2); ctx.stroke();
        leftPanel(); rightPanel();
      };
      img.onerror = () => {
        const drawRoach = (cx, cy, sz) => {
          ctx.save(); ctx.translate(cx, cy); ctx.scale(sz, sz);
          ctx.beginPath(); ctx.ellipse(0, 8, 13, 17, 0, 0, Math.PI * 2); ctx.fillStyle = '#1a1a0f'; ctx.fill();
          ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.ellipse(0, -7, 9, 8, 0, 0, Math.PI * 2); ctx.fillStyle = '#1a1a0f'; ctx.fill();
          ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 1.5; ctx.stroke();
          ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 1.2;
          [[0,-15,-9,-24],[0,-15,9,-24],[-13,-2,-27,-8],[-13,6,-28,4],[-13,14,-25,21],[13,-2,27,-8],[13,6,28,4],[13,14,25,21]].forEach(l => {
            ctx.beginPath(); ctx.moveTo(l[0], l[1]); ctx.lineTo(l[2], l[3]); ctx.stroke();
          });
          ctx.fillStyle = '#d4820a';
          [[-4,-8],[4,-8]].forEach(e => { ctx.beginPath(); ctx.arc(e[0], e[1], 2, 0, Math.PI * 2); ctx.fill(); });
          ctx.restore();
        };
        drawRoach(165, 100, 2.0); leftPanel(); rightPanel();
      };
      img.src = profile.avatar;
    } else {
      const drawRoach = (cx, cy, sz) => {
        ctx.save(); ctx.translate(cx, cy); ctx.scale(sz, sz);
        ctx.beginPath(); ctx.ellipse(0, 8, 13, 17, 0, 0, Math.PI * 2); ctx.fillStyle = '#1a1a0f'; ctx.fill();
        ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.ellipse(0, -7, 9, 8, 0, 0, Math.PI * 2); ctx.fillStyle = '#1a1a0f'; ctx.fill();
        ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.strokeStyle = '#d4820a'; ctx.lineWidth = 1.2;
        [[0,-15,-9,-24],[0,-15,9,-24],[-13,-2,-27,-8],[-13,6,-28,4],[-13,14,-25,21],[13,-2,27,-8],[13,6,28,4],[13,14,25,21]].forEach(l => {
          ctx.beginPath(); ctx.moveTo(l[0], l[1]); ctx.lineTo(l[2], l[3]); ctx.stroke();
        });
        ctx.fillStyle = '#d4820a';
        [[-4,-8],[4,-8]].forEach(e => { ctx.beginPath(); ctx.arc(e[0], e[1], 2, 0, Math.PI * 2); ctx.fill(); });
        ctx.restore();
      };
      drawRoach(165, 100, 2.0); leftPanel(); rightPanel();
    }
  }, [profile, quadrant, totalAvg, percAvg, structAvg, derived, roachName]);

  useEffect(() => { const t = setTimeout(draw, 300); return () => clearTimeout(t); }, [draw]);
  useEffect(() => { if (roachName) { const t = setTimeout(draw, 100); return () => clearTimeout(t); } }, [roachName, draw]);

  const download = () => {
    setDl(true);
    const a = document.createElement('a');
    a.download = 'Workroach_' + (profile.name || 'Card').replace(/\s/g, '_') + '.png';
    a.href = ref.current.toDataURL('image/png', 1.0); a.click();
    setTimeout(() => setDl(false), 1000);
  };

  const share = () => {
    ref.current.toBlob(async blob => {
      const file = new File([blob], 'workroach.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file], title: 'My Workroach Survival Index', text: (roachName || 'I am a Workroach') + '.\nSurvival Index: ' + totalAvg.toFixed(1) + '/5\nworkroach.com' }); }
        catch (e) {}
      } else download();
    }, 'image/png');
  };

  return (
    <div>
      <div style={{ marginBottom: 10, borderRadius: 9, overflow: 'hidden', border: '1px solid var(--bdr)' }}>
        <canvas ref={ref} style={{ width: '100%', display: 'block' }} />
      </div>
      {roachName && (
        <div style={{ marginBottom: 10, padding: '10px 14px', background: 'var(--aglow)', border: '1px solid var(--bdr)', borderRadius: 7, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--adim)', letterSpacing: 2, marginBottom: 3 }}>YOUR ROACH NAME</div>
          <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,2vw,18px)', color: 'var(--amber)', fontStyle: 'italic' }}>{roachName}</div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <Btn onClick={share}>📤 Share Card</Btn>
        <Btn onClick={download} disabled={dl} outline>{dl ? 'Saving...' : '⬇ Save PNG'}</Btn>
      </div>
      <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', letterSpacing: 1, textAlign: 'center' }}>No points for gloating. All points for posting. Thank you for voting.</div>
    </div>
  );
}

// ── AI SECTION ────────────────────────────────────────────────────────────────
function AISection({ btnText, prompt, color, btnStyle }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const c = color || 'var(--amber)';

  const go = async () => {
    setLoading(true); setText('');
    try {
      const res = await fetch('/.netlify/functions/claude', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json();
      setText((data.content && data.content.map(b => b.text || '').join('')) || 'Could not generate.');
      setDone(true);
    } catch (e) { setText('Connection failed.'); setDone(true); }
    setLoading(false);
  };

  const lines = text.split('\n').map((l, i) => {
    if (l.startsWith('**') && l.endsWith('**')) return (
      <div key={i} style={{ fontFamily: 'var(--fm)', fontSize: 10, color: c, letterSpacing: 3, marginTop: 18, marginBottom: 6, borderLeft: '2px solid ' + c, paddingLeft: 9 }}>
        {l.replace(/\*\*/g, '').toUpperCase()}
      </div>
    );
    if (!l.trim()) return <div key={i} style={{ height: 3 }} />;
    const isLast = l.startsWith('You are not');
    return (
      <p key={i} style={{ fontFamily: isLast ? 'var(--fd)' : 'var(--fs)', fontSize: isLast ? 'clamp(16px,2.5vw,20px)' : 'clamp(13px,1.5vw,15px)', lineHeight: isLast ? 1.3 : 1.9, color: isLast ? c : 'var(--tmid)', fontStyle: isLast ? 'normal' : 'italic', marginTop: isLast ? 12 : 0 }}>
        {l}
      </p>
    );
  });

  return (
    <div>
      {!done && <Btn onClick={go} disabled={loading} style={btnStyle || {}}>{loading ? 'Working...' : btnText}</Btn>}
      {loading && (
        <div style={{ display: 'flex', gap: 5, marginTop: 12, justifyContent: 'center' }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c, animation: 'pulse 1.2s ' + (i * .2) + 's infinite' }} />)}
        </div>
      )}
      {done && (
        <div style={{ padding: 16, background: 'var(--inp)', border: '1px solid ' + c + '30', borderRadius: 8, marginTop: 2 }}>
          {lines}
        </div>
      )}
    </div>
  );
}

// ── DOWNLOAD REPORT ───────────────────────────────────────────────────────────
function DownloadReport({ profile, quadrant, audit, derived, avg }) {
  const [email, setEmail] = useState(profile.email || '');
  const [subscribe, setSubscribe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const go = async () => {
    if (!email) { setErr('Please enter your email.'); return; }
    if (!email.includes('@')) { setErr('Please enter a valid email.'); return; }
    setErr(''); setLoading(true);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        name: profile.name || 'Anonymous',
        user_email: email,
        company: profile.company || 'Not disclosed',
        industry: profile.industry || 'Not disclosed',
        city: profile.city || 'Not disclosed',
        seniority: profile.seniority || 'Not disclosed',
        score: avg.toFixed(1) + ' / 5.0',
        quadrant: quadrant.label + ' (' + quadrant.badge + ')',
        drain: derived.drainPct + '%',
        burnout: derived.burnoutPct + '%',
        real_hourly: derived.realHourly,
        unpaid_ot: derived.unpaidValue,
        work_mode: audit.workMode || 'Not disclosed',
        days: (audit.days || 0) + ' days/week',
        unpaid_hours: (audit.unpaidOT || 0) + ' hrs/week',
        trainees: (audit.trainees || 0) + ' people',
        leave: (audit.leave || 0) + ' days/year',
        bonus: audit.bonus || 'Not disclosed',
        increment: audit.increment || 'Not disclosed',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      });
      setDone(true); window.print();
    // Subscribe to Mailchimp if checkbox ticked
    if (subscribe) {
      try {
        const mcData = new FormData();
        mcData.append('EMAIL', email);
        mcData.append('b_db3a36b5542c64869f590454b_2a3eb2ce9b', '');
        await fetch('https://workroach.us16.list-manage.com/subscribe/post?u=db3a36b5542c64869f590454b&id=2a3eb2ce9b&f_id=0099c2e1f0', {
          method: 'POST', body: mcData, mode: 'no-cors',
        });
      } catch (e) {}
    }
    } catch (e) { setErr('Could not send. Try again.'); }
    setLoading(false);
  };

  if (done) return (
    <div style={{ textAlign: 'center', padding: 18, background: 'var(--aglow)', border: '1px solid var(--bdr)', borderRadius: 9 }}>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 20, letterSpacing: 2, color: 'var(--amber)', marginBottom: 4 }}>REPORT INCOMING</div>
      <div style={{ fontFamily: 'var(--fs)', fontSize: 13, color: 'var(--tdim)', fontStyle: 'italic' }}>Your PDF is printing. A copy is on its way to {email}.</div>
    </div>
  );

  return (
    <div>
      <p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 14, color: 'var(--tdim)', marginBottom: 14, lineHeight: 1.7 }}>Enter your email to download your full Survival Report as a PDF.</p>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" type="email" style={{ width: '100%', padding: '11px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--fm)', fontSize: 13, marginBottom: 10 }} />
      <div onClick={() => setSubscribe(!subscribe)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, cursor: 'pointer', userSelect: 'none' }}>
        <div style={{ width: 18, height: 18, borderRadius: 4, border: '1.5px solid var(--amber)', background: subscribe ? 'var(--amber)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .15s' }}>
          {subscribe && <span style={{ color: '#0c0a08', fontSize: 11, fontWeight: 700 }}>✓</span>}
        </div>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--tmid)', letterSpacing: .5 }}>Subscribe to the monthly Infestation Index — real data, no spam</span>
      </div>
      {err && <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: '#c0392b', marginBottom: 10 }}>{err}</div>}
      <Btn onClick={go} disabled={loading}>{loading ? 'Sending...' : '⬇ Download PDF Report'}</Btn>
      <div style={{ marginTop: 9, fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', letterSpacing: .5, lineHeight: 1.6 }}>We don't sell data. Ever. By continuing you agree to our Terms & Privacy Policy.</div>
    </div>
  );
}

// ── SOCIAL SHARE ──────────────────────────────────────────────────────────────
function SocialShare({ profile, quadrant, totalAvg, derived, roachName }) {
  const [copied, setCopied] = useState(false);
  const txt = (roachName || 'I am a Workroach') + '.\n\nSurvival Index: ' + totalAvg.toFixed(1) + '/5 — ' + quadrant.label + '\nDrain Rate: ' + derived.drainPct + '%' + (derived.burnoutPct > 60 ? '\nBurnout Risk: ' + derived.burnoutPct + '%' : '') + (profile.company ? '\nCompany: ' + profile.company : '') + '\n\nNo points for gloating. All points for posting.\nworkroach.com';
  const url = 'https://workroach.com';
  const copy = () => { if (navigator.clipboard) { navigator.clipboard.writeText(txt + '\n' + url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }); } };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        {navigator.share && <Btn onClick={async () => { try { await navigator.share({ title: 'My Workroach Survival Index', text: txt, url }); } catch (e) {} }}>📤 Share</Btn>}
        <button onClick={() => window.open('https://wa.me/?text=' + encodeURIComponent(txt + '\n' + url), '_blank')} style={{ padding: 10, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: 7, color: '#25d366', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 }}>💬 WhatsApp</button>
        <button onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank')} style={{ padding: 10, background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.3)', borderRadius: 7, color: '#0a66c2', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 }}>in LinkedIn</button>
        <button onClick={() => window.open('https://x.com/intent/tweet?text=' + encodeURIComponent(txt) + '&url=' + encodeURIComponent(url), '_blank')} style={{ padding: 10, background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, cursor: 'pointer', letterSpacing: 1 }}>𝕏 Post</button>
      </div>
      <button onClick={copy} style={{ width: '100%', padding: 9, background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 7, color: copied ? '#22c55e' : 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1, transition: 'color .2s' }}>{copied ? '✓ Copied!' : '📋 Copy share text'}</button>
    </div>
  );
}

// ── RESULTS PAGE ──────────────────────────────────────────────────────────────
export function ResultsPage({ profile, audit, quadrant, totalAvg, percAvg, structAvg, median, derived, roachName, roachLoading, navProps, goto, PAGES, resetAll, salDisplay }) {
  const sorted = [...QUESTIONS].sort((a, b) => (audit.answers[a.id] || 0) - (audit.answers[b.id] || 0));

  const aiPrompt = `You are the sharp candid voice of Workroach.com. Zero tolerance for corporate gaslighting.

Employee: ${profile.name || 'Anonymous'} | Company: ${profile.company || 'Undisclosed'} | Industry: ${profile.industry || 'Unknown'} | Role: ${profile.seniority || 'Unknown'} | City: ${profile.city || 'Unknown'}
Result: "${quadrant.label}" — ${totalAvg.toFixed(1)}/5.0 | Burnout: ${derived.burnoutPct}% | Drain: ${derived.drainPct}%
Perception: ${QUESTIONS.map(q => q.cat + ': ' + (audit.answers[q.id] || 0) + '/5').join(', ')}

4 sections:
**THE HONEST READ** — 2-3 sentences, blunt
**WHERE YOU STILL HAVE POWER** — concrete leverage  
**THREE MOVES. MAKE THEM.** — specific, tactical
**YOUR 6-MONTH WINDOW** — what change vs staying looks like

Max 360 words. Workroach voice.`;

  const fairRatePrompt = `Compensation expert on Workroach.com. Specific and ruthlessly honest.

Profile: ${profile.seniority || 'Mid-level'} in ${profile.industry || 'industry'}, ${profile.city || 'India'}, ${profile.tenure || '?'} yrs exp
Current: ${salDisplay || 'Undisclosed'} | Real hourly: ${derived.realHourly}
Median: ${median ? '₹' + Math.round(median.salINR / 12).toLocaleString('en-IN') + '/month' : 'unknown'}
Unpaid OT: ${audit.unpaidOT || 0} hrs/week | Trainees: ${audit.trainees || 0}

4 sections:
**WHAT THE MARKET OWES YOU** — specific monthly INR range
**YOUR NEGOTIATION NUMBERS** — minimum, opening ask, real hourly worth
**THE GAP** — exact annual gap, what that money could have been
**THREE LINES FOR YOUR NEXT APPRAISAL** — exact sentences to say

Max 280 words.`;

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />

        {/* ── HERO ── */}
        <div className="fu" style={{ textAlign: 'center', paddingBottom: 'clamp(24px,3vw,40px)', borderBottom: '1px solid var(--bdr)', marginBottom: 'clamp(20px,2.5vw,32px)' }}>
          <Tag style={{ display: 'flex', justifyContent: 'center' }}>Survival Audit Complete</Tag>

          {profile.name && <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.8vw,16px)', color: 'var(--tmid)', marginBottom: 5, fontStyle: 'italic' }}>{profile.name}{profile.company ? ' · ' + profile.company : ''}</div>}

          {(profile.avatar || profile.soulUrl) && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <Avatar url={profile.avatar} soulUrl={profile.soulUrl} size={80} name={profile.name} />
            </div>
          )}

          {roachLoading && <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', marginBottom: 8, letterSpacing: 1, animation: 'pulse 1s infinite' }}>Generating your Roach Name...</div>}
          {roachName && !roachLoading && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--adim)', letterSpacing: 2, marginBottom: 3 }}>YOUR ROACH NAME</div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,2vw,20px)', color: 'var(--amber)', fontStyle: 'italic' }}>{roachName}</div>
            </div>
          )}

          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,5.5vw,52px)', letterSpacing: 3, color: quadrant.color, margin: '4px 0' }}>{quadrant.label}</h2>
          <div style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', color: 'var(--tmid)', fontSize: 'clamp(12px,1.5vw,15px)', marginBottom: 10 }}>"{quadrant.tagline}"</div>
          <div style={{ display: 'inline-block', padding: '2px 9px', border: '1px solid ' + quadrant.color, borderRadius: 3, fontFamily: 'var(--fm)', fontSize: 8, color: quadrant.color, letterSpacing: 3, marginBottom: 16 }}>{quadrant.badge}</div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, justifyContent: 'center', marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(52px,8vw,80px)', color: quadrant.color, letterSpacing: 2, lineHeight: 1 }}>{totalAvg.toFixed(1)}</span>
            <span style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(16px,2vw,22px)', color: 'var(--tdim)' }}>/5.0</span>
          </div>
          <DrainMeter score={totalAvg} />

          {median && (
            <div style={{ marginTop: 16, padding: 'clamp(10px,2vw,16px)', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8 }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', letterSpacing: 2, marginBottom: 8 }}>YOUR BRACKET · {profile.industry || 'Industry'} · {profile.seniority || 'Level'}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: 10 }}>
                {[
                  { l: 'Your Score', v: totalAvg.toFixed(1) + '/5', c: quadrant.color },
                  { l: 'Bracket Median', v: median.idx.toFixed(1) + '/5', c: 'var(--amber)' },
                  { l: 'Median Salary', v: '₹' + Math.round(median.salINR / 12).toLocaleString('en-IN') + '/mo', c: 'var(--amber)' },
                ].map(item => (
                  <div key={item.l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: 1, marginBottom: 2 }}>{item.l}</div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(14px,2.5vw,20px)', color: item.c, letterSpacing: 1 }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(110px,1fr))', gap: 'clamp(6px,1vw,10px)', marginTop: 14 }}>
            {[
              { l: 'Burnout Risk', v: derived.burnoutPct + '%', c: derived.burnoutPct > 70 ? '#c0392b' : derived.burnoutPct > 40 ? '#e67e22' : '#22c55e' },
              { l: 'Real Hourly', v: derived.realHourly, c: 'var(--amber)' },
              { l: 'Unpaid OT/yr', v: derived.unpaidValue, c: '#c0392b' },
              { l: 'Structural', v: structAvg.toFixed(1) + '/5', c: scoreColor(structAvg) },
              { l: 'Perception', v: percAvg.toFixed(1) + '/5', c: scoreColor(percAvg) },
            ].map(item => (
              <div key={item.l} style={{ padding: 'clamp(7px,1.2vw,11px)', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 6 }}>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: 1, marginBottom: 2 }}>{item.l}</div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(15px,2.5vw,20px)', color: item.c, letterSpacing: 1 }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Burnout warning */}
        {derived.burnoutPct > 70 && (
          <div className="fu" style={{ marginBottom: 16, padding: '13px 15px', background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.25)', borderRadius: 8 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: '#c0392b', letterSpacing: 2, marginBottom: 4 }}>⚠️ HIGH BURNOUT RISK: {derived.burnoutPct}%</div>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.5vw,14px)', color: 'var(--tmid)', lineHeight: 1.7, fontStyle: 'italic' }}>Your pattern of unpaid overtime, boundary violations and low psychological safety puts you in high burnout territory. This is a number, not a metaphor.</p>
          </div>
        )}

        {/* Perception breakdown */}
        <div className="fu" style={{ animationDelay: '.1s', marginBottom: 16 }}>
          <Card>
            <Tag>Perception Breakdown</Tag>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2vw,24px)', alignItems: 'flex-start' }}>
              <div style={{ flex: '0 0 clamp(170px,30%,240px)' }}>
                <Radar scores={audit.answers} color={quadrant.color} />
              </div>
              <div style={{ flex: 1, minWidth: 140 }}>
                {QUESTIONS.map(q => {
                  const s = audit.answers[q.id] || 0;
                  const c = scoreColor(s);
                  return (
                    <div key={q.id} style={{ marginBottom: 7 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', color: 'var(--tmid)' }}>{q.emoji} {q.cat}</span>
                        <span style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', color: c, fontWeight: 700 }}>{s}/5</span>
                      </div>
                      <div style={{ background: 'var(--bdr)', borderRadius: 2, height: 5, overflow: 'hidden' }}>
                        <div style={{ width: (s / 5) * 100 + '%', height: '100%', background: c, borderRadius: 2 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Strongest / Most Drained */}
        <div className="fu" style={{ animationDelay: '.14s', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: 'clamp(8px,1.5vw,12px)', marginBottom: 16 }}>
          <div style={{ padding: 'clamp(10px,1.5vw,14px)', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.14)', borderRadius: 8 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: '#22c55e', letterSpacing: 2, marginBottom: 5 }}>STRONGEST AREA</div>
            <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--text)', fontStyle: 'italic' }}>{sorted[sorted.length - 1]?.emoji} {sorted[sorted.length - 1]?.cat}</div>
          </div>
          {sorted.slice(0, 2).map((q, i) => (
            <div key={i} style={{ padding: 'clamp(10px,1.5vw,14px)', background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.14)', borderRadius: 8 }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: '#c0392b', letterSpacing: 2, marginBottom: 5 }}>MOST DRAINED {i + 1}</div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--text)', fontStyle: 'italic' }}>{q.emoji} {q.cat}</div>
            </div>
          ))}
        </div>

        {/* Real cost */}
        {(derived.realHourly !== 'N/A' || derived.unpaidValue !== 'N/A') && (
          <div className="fu" style={{ animationDelay: '.16s', marginBottom: 16 }}>
            <Card>
              <Tag>The Real Cost of This Job™</Tag>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(8px,1.5vw,12px)' }}>
                {derived.realHourly !== 'N/A' && (
                  <div style={{ padding: 'clamp(10px,1.5vw,14px)', background: 'var(--inp)', borderRadius: 6, border: '1px solid var(--bdr)' }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: 1, marginBottom: 3 }}>REAL HOURLY RATE</div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,24px)', color: 'var(--amber)', letterSpacing: 1 }}>{derived.realHourly}</div>
                  </div>
                )}
                {derived.unpaidValue !== 'N/A' && (
                  <div style={{ padding: 'clamp(10px,1.5vw,14px)', background: 'rgba(192,57,43,0.05)', borderRadius: 6, border: '1px solid rgba(192,57,43,0.14)' }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: '#c0392b', letterSpacing: 1, marginBottom: 3 }}>DONATED TO EMPLOYER/YR</div>
                    <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,24px)', color: '#c0392b', letterSpacing: 1 }}>{derived.unpaidValue}</div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Score card */}
        <div className="fu" style={{ animationDelay: '.18s', marginBottom: 16 }}>
          <Card>
            <Tag>🐜 Your Roach Score Card</Tag>
            <p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 14, color: 'var(--tdim)', marginBottom: 14, lineHeight: 1.7 }}>Your official Workroach certificate. Screenshot it. Post it.</p>
            <ScoreCard profile={{ name: profile.name, company: profile.company, avatar: profile.avatar, soulUrl: profile.soulUrl }} quadrant={quadrant} totalAvg={totalAvg} percAvg={percAvg} structAvg={structAvg} derived={derived} roachName={roachName} />
          </Card>
        </div>

        {/* AI Analysis */}
        <div className="fu" style={{ animationDelay: '.20s', marginBottom: 16 }}>
          <Card>
            <Tag>Workroach Intelligence</Tag>
            <AISection btnText="🐜 Run Workroach Intelligence" prompt={aiPrompt} color="var(--amber)" />
          </Card>
        </div>

        {/* Fair Rate */}
        <div className="fu" style={{ animationDelay: '.22s', marginBottom: 16 }}>
          <Card>
            <Tag>Fair Rate Calculator™</Tag>
            <p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 14, color: 'var(--tdim)', marginBottom: 14, lineHeight: 1.7 }}>What should you actually be earning?</p>
            <AISection btnText="💰 Calculate My Fair Rate" prompt={fairRatePrompt} color="#22c55e" btnStyle={{ background: 'linear-gradient(135deg,#16a34a,#0d6b32)', color: '#f0ebe0', boxShadow: '0 4px 18px rgba(34,197,94,0.2)' }} />
          </Card>
        </div>

        {/* Social share */}
        <div className="fu" style={{ animationDelay: '.24s', marginBottom: 16 }}>
          <Card>
            <Tag>Spread the Word</Tag>
            <SocialShare profile={{ name: profile.name, company: profile.company }} quadrant={quadrant} totalAvg={totalAvg} derived={derived} roachName={roachName} />
          </Card>
        </div>

        {/* Quick post it */}
        <div className="fu" style={{ animationDelay: '.26s', marginBottom: 16 }}>
          <Card>
            <Tag>Roach Receipts™</Tag>
            <p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 14, color: 'var(--tdim)', marginBottom: 14, lineHeight: 1.7 }}>Drop your truth. Fight your corner. The Wall is waiting.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
              {[
                { em: '📢', t: 'POST IT', c: 'var(--amber)', d: 'Share your story. Goes on the wall.' },
                { em: '⚔️', t: 'FIGHT IT', c: '#c0392b', d: 'Formal action. Grievance Brief. Resources.' },
              ].map(btn => (
                <div key={btn.t} style={{ padding: 'clamp(14px,2vw,18px)', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{btn.em}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(14px,2vw,18px)', letterSpacing: 2, color: btn.c, marginBottom: 4 }}>{btn.t}</div>
                  <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(11px,1.3vw,13px)', color: 'var(--tdim)', fontStyle: 'italic' }}>{btn.d}</div>
                </div>
              ))}
            </div>
            <Btn onClick={() => goto(PAGES.WALL)}>🧾 Go to The Wall →</Btn>
          </Card>
        </div>

        {/* Download report */}
        <div className="fu" style={{ animationDelay: '.28s', marginBottom: 16 }}>
          <Card>
            <Tag>Download Your Survival Report</Tag>
            <DownloadReport profile={{ name: profile.name, company: profile.company, industry: profile.industry, city: profile.city, seniority: profile.seniority, email: profile.email }} quadrant={quadrant} audit={audit} derived={derived} avg={totalAvg} />
          </Card>
        </div>

        {/* Start over */}
        <div className="fu" style={{ animationDelay: '.30s', textAlign: 'center', marginBottom: 8 }}>
          <button onClick={resetAll} style={{ background: 'transparent', border: '1px solid var(--bdr)', color: 'var(--tdim)', borderRadius: 6, padding: '8px 20px', fontSize: 10, fontFamily: 'var(--fm)', cursor: 'pointer', letterSpacing: 1 }}>↩ Start Over</button>
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
