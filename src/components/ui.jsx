// ── SHARED UI PRIMITIVES ──────────────────────────────────────────────────────

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--bdr)',
      borderRadius: 11, padding: 'clamp(14px,2.5vw,22px)', ...style
    }}>
      {children}
    </div>
  );
}

export function Tag({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: 'var(--fm)', fontSize: 'clamp(11px,1.2vw,13px)',
      letterSpacing: 3, color: 'var(--amber)', textTransform: 'uppercase',
      marginBottom: 10, ...style
    }}>
      {children}
    </div>
  );
}

export function Btn({ children, onClick, disabled, outline, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: outline ? 'transparent' : disabled ? 'rgba(212,130,10,0.07)' : 'linear-gradient(135deg,var(--amber),var(--adim))',
        color: disabled ? 'var(--tdim)' : outline ? 'var(--amber)' : '#0c0a08',
        border: outline ? '1px solid var(--amber)' : 'none',
        borderRadius: 8,
        padding: 'clamp(11px,2vw,14px) clamp(16px,3vw,22px)',
        fontSize: 'clamp(10px,1.5vw,12px)',
        fontFamily: 'var(--fm)', fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        letterSpacing: 2, transition: 'all .18s', width: '100%',
        boxShadow: disabled || outline ? 'none' : '0 4px 18px var(--aglow)',
        ...style
      }}
    >
      {children}
    </button>
  );
}

export function Pill({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {options.map(opt => (
        <div
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            padding: '10px 13px', borderRadius: 7, cursor: 'pointer',
            transition: 'all .13s',
            border: value === opt ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)',
            background: value === opt ? 'var(--aglow)' : 'var(--inp)',
            display: 'flex', alignItems: 'center', gap: 10
          }}
        >
          <div style={{
            width: 14, height: 14, borderRadius: '50%', flexShrink: 0,
            border: value === opt ? '5px solid var(--amber)' : '1.5px solid var(--bdr)'
          }} />
          <span style={{
            fontFamily: 'var(--fb)', fontSize: 'clamp(13px,1.5vw,15px)',
            color: value === opt ? 'var(--text)' : 'var(--tmid)',
            fontStyle: value === opt ? 'italic' : 'normal'
          }}>
            {opt}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Stepper({ value, onChange, min = 0, max = 99, unit = '' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <button onClick={() => onChange(Math.max(min, value - 1))} style={{ width: 33, height: 33, border: '1px solid var(--bdr)', borderRadius: 6, background: 'transparent', color: 'var(--amber)', fontSize: 18, cursor: 'pointer' }}>−</button>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 28, color: 'var(--amber)', minWidth: 42, textAlign: 'center' }}>{value}</div>
      <button onClick={() => onChange(Math.min(max, value + 1))} style={{ width: 33, height: 33, border: '1px solid var(--bdr)', borderRadius: 6, background: 'transparent', color: 'var(--amber)', fontSize: 18, cursor: 'pointer' }}>+</button>
      {unit && <span style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--tdim)' }}>{unit}</span>}
    </div>
  );
}

export function Select({ options, value, onChange, placeholder = 'Select...' }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', padding: '10px 13px',
        background: 'var(--inp)', border: '1px solid var(--bdr)',
        borderRadius: 7, color: value ? 'var(--text)' : 'var(--tdim)',
        fontFamily: 'var(--fb)', fontSize: 'clamp(13px,1.5vw,15px)',
        fontStyle: 'italic', cursor: 'pointer', appearance: 'none'
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(o => (
        <option key={o} value={o} style={{ background: '#1c190f', color: '#f5f2ea', fontStyle: 'normal' }}>{o}</option>
      ))}
    </select>
  );
}

export function Toggle({ value, onChange, yes = 'Yes', no = 'No' }) {
  return (
    <div style={{ display: 'flex', gap: 9 }}>
      {[{ v: true, l: yes }, { v: false, l: no }].map(opt => (
        <div
          key={String(opt.v)}
          onClick={() => onChange(opt.v)}
          style={{
            flex: 1, padding: '10px', borderRadius: 7, textAlign: 'center',
            cursor: 'pointer', transition: 'all .13s',
            border: value === opt.v ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)',
            background: value === opt.v ? 'var(--aglow)' : 'transparent',
            fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.2vw,12px)',
            letterSpacing: 1, color: value === opt.v ? 'var(--amber)' : 'var(--tdim)'
          }}
        >
          {opt.l}
        </div>
      ))}
    </div>
  );
}

export function RoachLogo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="37" rx="13" ry="17" fill="var(--bg2)" stroke="var(--amber)" strokeWidth="1.5" />
      <ellipse cx="32" cy="22" rx="9" ry="8" fill="var(--bg2)" stroke="var(--amber)" strokeWidth="1.5" />
      <line x1="32" y1="14" x2="23" y2="5" stroke="var(--amber)" strokeWidth="1.2" />
      <line x1="32" y1="14" x2="41" y2="5" stroke="var(--amber)" strokeWidth="1.2" />
      <line x1="19" y1="29" x2="5" y2="23" stroke="var(--amber)" strokeWidth="1.1" />
      <line x1="19" y1="38" x2="4" y2="36" stroke="var(--amber)" strokeWidth="1.1" />
      <line x1="19" y1="47" x2="7" y2="54" stroke="var(--amber)" strokeWidth="1.1" />
      <line x1="45" y1="29" x2="59" y2="23" stroke="var(--amber)" strokeWidth="1.1" />
      <line x1="45" y1="38" x2="60" y2="36" stroke="var(--amber)" strokeWidth="1.1" />
      <line x1="45" y1="47" x2="57" y2="54" stroke="var(--amber)" strokeWidth="1.1" />
      <circle cx="28" cy="21" r="2" fill="var(--amber)" />
      <circle cx="36" cy="21" r="2" fill="var(--amber)" />
      <rect x="21" y="49" width="22" height="7" rx="2" fill="var(--amber)" />
    </svg>
  );
}

export function DrainMeter({ score }) {
  const drain = Math.round((1 - (score - 1) / 4) * 100);
  const color = score >= 4 ? '#22c55e' : score >= 3 ? 'var(--amber)' : score >= 2 ? '#e67e22' : '#c0392b';
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: 2, color: 'var(--tdim)' }}>FULLY DRAINED</span>
        <span style={{ fontFamily: 'var(--fm)', fontSize: 9, letterSpacing: 2, color: 'var(--tdim)' }}>THRIVING</span>
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: 20 }).map((_, i) => {
          const filled = ((score - 1) / 4) * 100 >= (i + 1) * 5 - 2.5;
          return <div key={i} style={{ flex: 1, height: 9, borderRadius: 2, background: filled ? color : 'var(--bdr)', transition: 'background .5s' }} />;
        })}
      </div>
      <div style={{ marginTop: 4, textAlign: 'center', fontFamily: 'var(--fm)', fontSize: 9, color, letterSpacing: 2 }}>DRAIN RATE: {drain}%</div>
    </div>
  );
}

export function Radar({ scores, color = 'var(--amber)' }) {
  const { QUESTIONS } = require('../data/constants');
  const keys = Object.keys(scores);
  const n = keys.length;
  const cx = 115, cy = 115, r = 85;
  const ang = i => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, ratio) => ({ x: cx + r * ratio * Math.cos(ang(i)), y: cy + r * ratio * Math.sin(ang(i)) });
  const gp = ratio => keys.map((_, i) => pt(i, ratio)).map(p => `${p.x},${p.y}`).join(' ');
  const dp = keys.map((k, i) => pt(i, (scores[k] || 0) / 5));
  return (
    <svg viewBox="0 0 230 230" style={{ width: '100%', maxWidth: 220 }}>
      {[.2, .4, .6, .8, 1].map((r2, li) => <polygon key={li} points={gp(r2)} fill="none" stroke="var(--bdr)" strokeWidth="1" />)}
      {keys.map((_, i) => { const o = pt(i, 1); return <line key={i} x1={cx} y1={cy} x2={o.x} y2={o.y} stroke="var(--bdr)" strokeWidth="1" />; })}
      <polygon points={dp.map(p => `${p.x},${p.y}`).join(' ')} fill={color + '1a'} stroke={color} strokeWidth="1.8" />
      {dp.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />)}
      {keys.map((k, i) => {
        const q = QUESTIONS.find(q => q.id === k);
        const lp = pt(i, 1.26);
        return <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fill="var(--tdim)" fontSize="9" fontFamily="JetBrains Mono,monospace">{q && q.emoji}</text>;
      })}
    </svg>
  );
}
