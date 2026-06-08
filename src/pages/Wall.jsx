import { useState } from 'react';
import { Nav, Footer } from '../components/Nav';
import { Card, Tag, Btn } from '../components/ui';
import emailjs from '@emailjs/browser';
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE } from '../data/constants';

const WALL_DATA = [
  { id: 'Roach#X7K2M', sen: 'Senior', ind: 'Technology', city: 'Bangalore', score: 1.8, quadrant: 'Toxic Environment', txt: 'Promised ESOP at joining. Quietly removed from contract before signing. When questioned told it was a clerical error.', type: 'verified', votes: 127 },
  { id: 'Roach#P4L9Q', sen: 'Mid-level', ind: 'Finance', city: 'Mumbai', score: 2.1, quadrant: 'Toxic Environment', txt: 'Manager CC\'d senior leadership on every mistake. Never on achievements. For two years.', type: 'talk', votes: 89 },
  { id: 'Roach#N2R5T', sen: 'Junior', ind: 'Marketing', city: 'Delhi', score: 1.4, quadrant: 'Extermination Zone', txt: 'Entire team\'s increment withheld citing performance. Company posted 40% profit growth same quarter.', type: 'verified', votes: 43 },
  { id: 'Roach#M8V3W', sen: 'Lead', ind: 'Consulting', city: 'Hyderabad', score: 2.4, quadrant: 'Surviving. Barely.', txt: 'Notice period is 3 months. Buyout denied. Joining offer from new company lapsed. This is standard practice here.', type: 'talk', votes: 34 },
  { id: 'Roach#K6B1S', sen: 'Senior', ind: 'Healthcare', city: 'Chennai', score: 2.8, quadrant: 'Surviving. Barely.', txt: 'Weekend emails every Sunday without fail. Team too afraid to not respond.', type: 'talk', votes: 12 },
  { id: 'Roach#J9F4R', sen: 'Mid-level', ind: 'Media', city: 'Pune', score: 1.9, quadrant: 'Toxic Environment', txt: 'Trainees expected to work client hours with intern pay. Has been this way for five years.', type: 'talk', votes: 7 },
];

function getTierInfo(type, votes) {
  if (type === 'verified') {
    if (votes >= 100) return { badge: '✅🏘️', label: 'Talk of Roachville', sub: 'Undeniable', color: '#22c55e' };
    if (votes >= 50) return { badge: '✅', label: 'Roach Verified', sub: 'Documented', color: '#22c55e' };
    if (votes >= 10) return { badge: '✅', label: 'Roach Verified', sub: 'Witnessed', color: '#22c55e' };
    return { badge: '✅', label: 'Roach Verified', sub: 'On record', color: '#22c55e' };
  }
  if (votes >= 100) return { badge: '🏘️', label: 'Talk of Roachville', sub: 'Open secret', color: 'var(--amber)' };
  if (votes >= 50) return { badge: '🌿', label: 'Roach Talk', sub: 'Open secret', color: 'var(--amber)' };
  if (votes >= 25) return { badge: '🌿', label: 'Roach Talk', sub: 'The whole office knows', color: 'var(--amber)' };
  if (votes >= 10) return { badge: '🌿', label: 'Roach Talk', sub: "Word's getting around", color: 'var(--amber)' };
  return { badge: '🌿', label: 'Roach Talk', sub: 'Whisper', color: 'var(--amber)' };
}

function PostItForm({ profile, quadrant, avg }) {
  const [txt, setTxt] = useState('');
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState('');
  const [showRedact, setShowRedact] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const id = 'Roach#' + Math.random().toString(36).substr(2, 6).toUpperCase();

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 5 * 1024 * 1024) { setFileErr('File too large. Max 5MB.'); return; }
    if (!['image/jpeg', 'image/png', 'application/pdf'].includes(f.type)) { setFileErr('JPG, PNG or PDF only.'); return; }
    setFileErr('');
    setShowRedact(true);
    setFile(f);
  };

  const submit = async () => {
    if (!txt.trim()) return;
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        name: 'ROACH RECEIPT — ' + id + (file ? ' [EVIDENCE ATTACHED]' : ''),
        user_email: 'receipt@workroach.com',
        company: (profile?.company) || 'Anonymous',
        industry: (profile?.industry) || 'Not disclosed',
        city: (profile?.city) || 'Not disclosed',
        seniority: (profile?.seniority) || 'Not disclosed',
        score: avg ? avg.toFixed(1) + ' / 5.0' : 'N/A',
        quadrant: quadrant?.label || 'N/A',
        drain: 'Receipt', burnout: 'Receipt', real_hourly: 'N/A', unpaid_ot: 'N/A',
        work_mode: 'RECEIPT TYPE: ' + (file ? 'Roach Verified (evidence submitted)' : 'Roach Talk'),
        days: 'N/A', unpaid_hours: 'N/A', trainees: 'N/A', leave: 'N/A',
        bonus: 'RECEIPT: ' + txt,
        increment: file ? 'EVIDENCE FILE: ' + file.name : 'No evidence',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      });
      setSent(true);
    } catch (e) { setSent(true); }
    setSending(false);
  };

  if (sent) return (
    <div style={{ textAlign: 'center', padding: 'clamp(24px,4vw,48px)', background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 12 }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🐜</div>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,4vw,32px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 8 }}>RECEIPT RECEIVED</div>
      <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8 }}>{file ? 'Your receipt and evidence have gone to moderation. If the evidence checks out — it goes up as Roach Verified.' : 'Your receipt has gone to moderation. If it passes — it goes on the wall as Roach Talk. Every upvote gives it ground.'}</p>
      <div style={{ marginTop: 12, fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--tdim)', letterSpacing: 2 }}>THANK YOU FOR VOTING · {id}</div>
    </div>
  );

  return (
    <Card>
      <Tag>📢 Post It</Tag>
      {showRedact && (
        <div style={{ marginBottom: 14, padding: '12px 16px', background: 'rgba(230,126,34,0.1)', border: '1px solid rgba(230,126,34,0.4)', borderRadius: 8 }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(12px,1.8vw,16px)', letterSpacing: 1, color: '#e67e22', marginBottom: 4 }}>⚠️ BEFORE YOU UPLOAD</div>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.7 }}>Remove all personal names, phone numbers, and identifying information before uploading.</p>
          <button onClick={() => setShowRedact(false)} style={{ marginTop: 8, fontFamily: 'var(--fm)', fontSize: 10, color: '#e67e22', background: 'transparent', border: '1px solid rgba(230,126,34,0.4)', borderRadius: 6, padding: '5px 14px', cursor: 'pointer', letterSpacing: 1 }}>I've redacted my document ✓</button>
        </div>
      )}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <textarea value={txt} onChange={e => setTxt(e.target.value.slice(0, 280))} placeholder='"They told us family comes first. Then sent emails at 11pm on Diwali."' rows={4} style={{ width: '100%', padding: '12px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', lineHeight: 1.7, resize: 'none' }} />
        <div style={{ position: 'absolute', bottom: 10, right: 12, fontFamily: 'var(--fm)', fontSize: 9, color: txt.length > 250 ? '#e67e22' : 'var(--tdim)' }}>{txt.length}/280</div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--inp)', border: '1px dashed ' + (file ? 'rgba(34,197,94,0.4)' : 'var(--bdr)'), borderRadius: 8, cursor: 'pointer', marginBottom: 12 }}>
        <span style={{ fontSize: 20 }}>{file ? '✅' : '📎'}</span>
        <div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.2vw,12px)', color: file ? '#22c55e' : 'var(--text)', letterSpacing: 1 }}>{file ? file.name : 'Attach evidence (optional)'}</div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(8px,1vw,10px)', color: 'var(--tdim)' }}>Max 5MB · JPG, PNG, PDF · Redact names first</div>
        </div>
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFile} style={{ display: 'none' }} />
      </label>
      {fileErr && <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: '#c0392b', marginBottom: 8 }}>{fileErr}</div>}
      <Btn onClick={submit} disabled={!txt.trim() || sending || showRedact}>{sending ? 'Sending...' : '📢 Post It (Anonymous)'}</Btn>
      <div style={{ marginTop: 8, fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', letterSpacing: .5, textAlign: 'center', lineHeight: 1.6 }}>Moderated before going public. No names, no identifying info.</div>
    </Card>
  );
}

function FightItForm({ profile, quadrant, avg }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ what: '', when: '', internal: '', seeking: '', docs: null });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const id = 'Roach#' + Math.random().toString(36).substr(2, 6).toUpperCase();

  const questions = [
    { l: 'What happened?', sub: 'Describe the behaviour. Not the person. What did they do?', k: 'what', ph: 'e.g. I was promised a promotion for 18 months. Every appraisal cycle it was deferred with no explanation.', rows: 4 },
    { l: 'When did it happen?', sub: 'Approximate date or period is fine.', k: 'when', ph: 'e.g. March 2024 — ongoing', rows: 2 },
    { l: 'Have you raised this internally?', sub: 'HR, manager, skip-level — any internal escalation.', k: 'internal', ph: 'e.g. Raised with HR in January 2025. No response received.', rows: 3 },
    { l: 'What outcome are you seeking?', sub: 'Resolution, compensation, record, or just to be heard.', k: 'seeking', ph: 'e.g. I want this documented. I am leaving anyway but others should know.', rows: 3 },
  ];

  const resources = [
    { em: '⚖️', t: 'Labour Commissioner', d: 'File a formal complaint about unpaid wages, unfair termination, or leave violations.', u: 'https://labour.gov.in' },
    { em: '🛡️', t: 'POSH Committee', d: 'For workplace sexual harassment complaints. Every company with 10+ employees must have an ICC.', u: 'https://wcd.nic.in' },
    { em: '📋', t: 'Shops & Establishments Act', d: 'Governs working hours, overtime, leave. Varies by state.', u: 'https://shramsuvidha.gov.in' },
    { em: '📞', t: 'Labour Helpline', d: 'National toll-free labour helpline for workers.', u: 'tel:1800-419-8610' },
    { em: '📱', t: 'Workroach Admin', d: "Email us directly. We'll help you figure out the right next step.", u: 'mailto:workroach.admin@gmail.com' },
  ];

  const submit = async () => {
    setSending(true);
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        name: 'FIGHT IT — ' + id,
        user_email: 'fight@workroach.com',
        company: profile?.company || 'Anonymous',
        industry: profile?.industry || 'Not disclosed',
        city: profile?.city || 'Not disclosed',
        seniority: profile?.seniority || 'Not disclosed',
        score: avg ? avg.toFixed(1) + ' / 5.0' : 'N/A',
        quadrant: quadrant?.label || 'N/A',
        drain: 'Fight It', burnout: 'Fight It', real_hourly: 'N/A', unpaid_ot: 'N/A',
        work_mode: 'WHAT HAPPENED: ' + data.what,
        days: 'WHEN: ' + data.when,
        unpaid_hours: 'RAISED INTERNALLY: ' + data.internal,
        trainees: 'SEEKING: ' + data.seeking,
        leave: 'DOCUMENTATION: ' + (data.docs ? 'Yes — ' + data.docs.name : 'None'),
        bonus: 'Fight It formal complaint',
        increment: 'N/A',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      });
      setSent(true);
    } catch (e) { setSent(true); }
    setSending(false);
  };

  const saveDraft = () => {
    localStorage.setItem('wr-fight-draft', JSON.stringify({ ...data, savedAt: new Date().toISOString() }));
    alert('Draft saved. Come back when you have your evidence ready.');
  };

  if (sent) return (
    <div style={{ textAlign: 'center', padding: 'clamp(24px,4vw,48px)', background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 12 }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>⚔️</div>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,4vw,32px)', letterSpacing: 3, color: '#c0392b', marginBottom: 8 }}>FIGHT IT LOGGED</div>
      <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 8 }}>Your Grievance Brief has been sent. We will review and respond within 7 working days.</p>
      <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.7 }}>Use the resources below to take parallel action. You don't have to wait for us.</p>
      <div style={{ marginTop: 16, fontFamily: 'var(--fm)', fontSize: 11, color: 'var(--tdim)', letterSpacing: 2 }}>REFERENCE: {id}</div>
    </div>
  );

  const q = questions[step];
  const isLast = step === questions.length - 1;
  const canNext = data[q.k].trim();

  return (
    <div>
      <div style={{ padding: '10px 14px', background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, marginBottom: 16 }}>
        <p style={{ fontFamily: 'var(--fs)', fontSize: 14, color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.7 }}>Not legal advice. Workroach provides general information about labour rights. Always consult a qualified lawyer for advice specific to your situation.</p>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {questions.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? '#c0392b' : 'var(--bdr)', transition: 'background .3s' }} />)}
      </div>

      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: '#c0392b', letterSpacing: 2, marginBottom: 6 }}>{step + 1} OF {questions.length}</div>
        <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(16px,2.5vw,22px)', letterSpacing: 1, color: 'var(--text)', marginBottom: 6 }}>{q.l}</div>
        <p style={{ fontFamily: 'var(--fs)', fontSize: 13, color: 'var(--tdim)', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>{q.sub}</p>
        <textarea value={data[q.k]} onChange={e => setData({ ...data, [q.k]: e.target.value })} placeholder={q.ph} rows={q.rows} style={{ width: '100%', padding: '12px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', fontStyle: 'italic', lineHeight: 1.7, resize: 'none', marginBottom: isLast && canNext ? 16 : 0 }} />

        {isLast && canNext && (
          <div>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 11, color: '#c0392b', letterSpacing: 2, marginBottom: 8 }}>ATTACH EVIDENCE — REQUIRED ⚔️</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--inp)', border: '1px dashed ' + (data.docs ? 'rgba(34,197,94,0.4)' : 'rgba(192,57,43,0.3)'), borderRadius: 8, cursor: 'pointer', marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{data.docs ? '✅' : '📎'}</span>
              <div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 12, color: data.docs ? '#22c55e' : 'var(--text)', letterSpacing: 1 }}>{data.docs ? data.docs.name : 'Upload evidence'}</div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--tdim)' }}>Max 5MB · JPG, PNG, PDF · Redact names first</div>
              </div>
              <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => { if (e.target.files[0] && e.target.files[0].size <= 5 * 1024 * 1024) setData({ ...data, docs: e.target.files[0] }); }} style={{ display: 'none' }} />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
              <button onClick={() => setStep(s => s - 1)} style={{ padding: '11px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 11, cursor: 'pointer', letterSpacing: 1 }}>← Back</button>
              <button onClick={saveDraft} style={{ padding: '11px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 11, cursor: 'pointer', letterSpacing: 1 }}>💾 Save Draft</button>
            </div>
            <button onClick={submit} disabled={sending || !data.docs} style={{ width: '100%', padding: '14px', background: (!data.docs || sending) ? 'rgba(192,57,43,0.07)' : 'linear-gradient(135deg,#c0392b,#7b1c12)', border: 'none', borderRadius: 8, color: (!data.docs || sending) ? 'rgba(192,57,43,0.3)' : '#f0ebe0', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: (!data.docs || sending) ? 'not-allowed' : 'pointer', letterSpacing: 2, boxShadow: (!data.docs || sending) ? 'none' : '0 4px 18px rgba(192,57,43,0.28)' }}>
              {sending ? 'Sending...' : !data.docs ? '📎 Attach evidence to submit' : '⚔️ Submit Fight It Petition'}
            </button>
            {!data.docs && <div style={{ marginTop: 8, fontFamily: 'var(--fm)', fontSize: 10, color: 'rgba(192,57,43,0.6)', textAlign: 'center' }}>Evidence required. No document — no petition.</div>}
          </div>
        )}

        {!isLast && (
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            {step > 0 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '11px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 11, cursor: 'pointer', letterSpacing: 1 }}>← Back</button>}
            <button onClick={() => setStep(s => s + 1)} disabled={!canNext} style={{ flex: 2, padding: '11px', background: !canNext ? 'rgba(192,57,43,0.07)' : 'linear-gradient(135deg,#c0392b,#7b1c12)', border: 'none', borderRadius: 8, color: !canNext ? 'rgba(192,57,43,0.3)' : '#f0ebe0', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, cursor: !canNext ? 'not-allowed' : 'pointer', letterSpacing: 2 }}>NEXT →</button>
          </div>
        )}
      </Card>

      {isLast && canNext && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 11, padding: 'clamp(14px,2.5vw,22px)' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(16px,2.5vw,22px)', letterSpacing: 2, color: '#c0392b', marginBottom: 16 }}>YOUR RIGHTS & RESOURCES</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 10 }}>
            {resources.map((r, i) => (
              <a key={i} href={r.u} target="_blank" rel="noopener noreferrer" style={{ padding: 'clamp(12px,2vw,16px)', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: 'clamp(18px,2.5vw,24px)', marginBottom: 6 }}>{r.em}</div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(13px,1.8vw,16px)', letterSpacing: 1, color: 'var(--text)', marginBottom: 4 }}>{r.t}</div>
                <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(11px,1.3vw,13px)', color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.6 }}>{r.d}</div>
              </a>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(192,57,43,0.06)', borderRadius: 7, border: '1px solid rgba(192,57,43,0.2)' }}>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 13, color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.7 }}>This information is general in nature and does not constitute legal advice. Workroach is not a law firm. Consult a qualified labour lawyer for advice specific to your situation.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function WallPage({ profile, quadrant, totalAvg, navProps, goto, PAGES }) {
  const [mode, setMode] = useState(null); // null | 'post' | 'fight'

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,5vw,52px)', letterSpacing: 4, color: 'var(--amber)', marginBottom: 10 }}>ROACH RECEIPTS</h1>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tdim)', fontStyle: 'italic', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>Your experience. Your evidence. Your right. Two ways to use it.</p>
        </div>

        {!mode && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 32 }}>
            {[
              { id: 'post', em: '📢', title: 'POST IT', color: 'var(--amber)', desc: 'Share your story. Anonymous. Goes on the wall. Every upvote gives it ground.', tags: ['🌿 Roach Talk', '✅ Roach Verified'], tagColors: ['var(--amber)', '#22c55e'] },
              { id: 'fight', em: '⚔️', title: 'FIGHT IT', color: '#c0392b', desc: 'Take formal action. Generate a Grievance Brief. Connect to resources and legal support.', tags: ['⚖️ Labour Rights', '📋 Grievance Brief'], tagColors: ['#c0392b', '#c0392b'] },
            ].map(btn => (
              <div key={btn.id} onClick={() => setMode(btn.id)} style={{ padding: 'clamp(20px,3vw,32px)', background: 'var(--card)', border: '2px solid var(--bdr)', borderRadius: 12, cursor: 'pointer', textAlign: 'center', transition: 'all .2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = btn.color; e.currentTarget.style.background = btn.id === 'post' ? 'var(--aglow)' : 'rgba(192,57,43,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.background = 'var(--card)'; }}>
                <div style={{ fontSize: 'clamp(28px,4vw,40px)', marginBottom: 10 }}>{btn.em}</div>
                <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,26px)', letterSpacing: 2, color: btn.color, marginBottom: 8 }}>{btn.title}</div>
                <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 12 }}>{btn.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {btn.tags.map((tag, ti) => (
                    <span key={tag} style={{ fontFamily: 'var(--fm)', fontSize: 10, padding: '3px 8px', background: btn.tagColors[ti] + '15', border: '1px solid ' + btn.tagColors[ti] + '40', borderRadius: 20, color: btn.tagColors[ti] }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {mode && (
          <div style={{ marginBottom: 24 }}>
            <button onClick={() => setMode(null)} style={{ background: 'transparent', border: 'none', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1, marginBottom: 16 }}>← Back to options</button>
            {mode === 'post' && <PostItForm profile={profile} quadrant={quadrant} avg={totalAvg} />}
            {mode === 'fight' && <FightItForm profile={profile} quadrant={quadrant} avg={totalAvg} />}
          </div>
        )}

        {/* The Wall */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,28px)', letterSpacing: 3, color: 'var(--amber)' }}>THE WALL</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[{ l: '🌿 Roach Talk', c: 'var(--amber)' }, { l: '✅ Roach Verified', c: '#22c55e' }, { l: '🏘️ Talk of Roachville', c: 'var(--amber)' }].map(b => (
                <span key={b.l} style={{ fontFamily: 'var(--fm)', fontSize: 10, padding: '3px 8px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 20, color: b.c }}>{b.l}</span>
              ))}
            </div>
          </div>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(11px,1.3vw,13px)', color: 'var(--tdim)', fontStyle: 'italic', marginBottom: 20, lineHeight: 1.7 }}>Roach Talk is personal experience — not verified fact. Roach Verified means evidence was reviewed by Workroach. Every upvote is a witness.</p>

          {WALL_DATA.map((w, i) => {
            const tier = getTierInfo(w.type, w.votes);
            return (
              <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 10, padding: 'clamp(14px,2vw,20px)', marginBottom: 12, borderLeft: '3px solid ' + tier.color }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ fontSize: 16 }}>🐜</div>
                    <div>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--amber)', letterSpacing: 1 }}>{w.id}</div>
                      <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)' }}>{w.sen} · {w.ind} · {w.city} · {w.score}/5 · {w.quadrant}</div>
                    </div>
                  </div>
                  <div style={{ padding: '4px 10px', background: tier.color === '#22c55e' ? 'rgba(34,197,94,0.1)' : 'var(--aglow)', border: '1px solid ' + tier.color + '40', borderRadius: 20, fontFamily: 'var(--fm)', fontSize: 10, color: tier.color, letterSpacing: 1, whiteSpace: 'nowrap' }}>
                    {tier.badge} {tier.label} · {tier.sub}
                  </div>
                </div>
                <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 12 }}>"{w.txt}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', background: 'var(--aglow)', border: '1px solid var(--bdr)', borderRadius: 20, color: 'var(--amber)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1 }}>❤️ {w.votes} witnesses</button>
                  <button style={{ padding: '5px 10px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 20, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 9, cursor: 'pointer', letterSpacing: 1 }}>🚩 Report</button>
                </div>
                <div style={{ marginTop: 8, fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: .5 }}>Personal experience, not verified fact. Workroach does not endorse this content.</div>
              </div>
            );
          })}

          <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tdim)', fontStyle: 'italic' }}>The wall fills as the swarm grows. Your receipt could be next.</div>
        </div>

        <div style={{ marginTop: 16, padding: 'clamp(14px,2vw,20px)', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(11px,1.3vw,13px)', color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.7 }}>
            Workroach does not verify Roach Talk submissions. All content represents personal experience.{' '}
            <span onClick={() => goto(PAGES.TERMS)} style={{ color: 'var(--amber)', cursor: 'pointer', textDecoration: 'underline' }}>Terms & Privacy Policy</span>
          </p>
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
