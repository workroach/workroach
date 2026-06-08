import { useMemo } from 'react';

// ── ROACH AVATAR SYSTEM ───────────────────────────────────────────────────────
// Every avatar is a roach. Always. But their appearance reflects their reality.

// ── COLOUR PALETTES BY QUADRANT ───────────────────────────────────────────────
const QUADRANT_PALETTE = {
  5: { shell: '#c8a96e', belly: '#e8d4a0', eye: '#f0ebe0', pupil: '#1a1209', glow: '#d4820a', aura: 'none' },        // Clean House — golden sage
  4: { shell: '#2d5a27', belly: '#4a8a42', eye: '#f0ebe0', pupil: '#1a1209', glow: '#22c55e', aura: 'none' },        // Liveable — strong green
  3: { shell: '#5c4a1e', belly: '#8a6f2e', eye: '#d4820a', pupil: '#0c0a08', glow: '#d4820a', aura: 'none' },        // Surviving — amber worn
  2: { shell: '#3d2010', belly: '#5c3018', eye: '#e67e22', pupil: '#0c0a08', glow: '#e67e22', aura: 'none' },        // Toxic — dark orange
  1: { shell: '#1a0a0a', belly: '#2d1010', eye: '#c0392b', pupil: '#000', glow: '#c0392b', aura: 'rgba(192,57,43,0.2)' }, // Extermination — near black red
};

// ── SENIORITY SCALE ───────────────────────────────────────────────────────────
const SENIORITY_SCALE = {
  'Intern / Trainee': { bodyScale: 0.78, posture: 0, eyeSize: 1.3 },
  'Junior (0–2 yrs)': { bodyScale: 0.88, posture: 2, eyeSize: 1.15 },
  'Mid-level (2–5 yrs)': { bodyScale: 1.0, posture: 0, eyeSize: 1.0 },
  'Senior (5–10 yrs)': { bodyScale: 1.08, posture: -2, eyeSize: 0.95 },
  'Lead / Manager': { bodyScale: 1.12, posture: -4, eyeSize: 0.9 },
  'Director / VP': { bodyScale: 1.18, posture: -5, eyeSize: 0.88 },
  'C-Suite / Founder': { bodyScale: 1.25, posture: -6, eyeSize: 0.85 },
};

// ── GENDER ANTENNA STYLES ─────────────────────────────────────────────────────
const ANTENNA_STYLES = {
  'Male': { left: 'M0,0 Q-8,-20 -12,-35', right: 'M0,0 Q8,-20 12,-35' },
  'Female': { left: 'M0,0 Q-14,-18 -8,-36', right: 'M0,0 Q14,-18 8,-36' },
  'Non-binary': { left: 'M0,0 L-10,-34', right: 'M0,0 Q10,-18 8,-35' },
  'Prefer not to say': { left: 'M0,0 Q-16,-15 -6,-38', right: 'M0,0 Q6,-22 14,-32' },
  default: { left: 'M0,0 Q-8,-20 -12,-35', right: 'M0,0 Q8,-20 12,-35' },
};

// ── INDUSTRY ACCESSORIES ──────────────────────────────────────────────────────
function Accessory({ industry, palette, cx, cy }) {
  const color = palette.glow;
  const dim = 'rgba(255,255,255,0.6)';

  const accessories = {
    'Technology / IT': (
      <g transform={`translate(${cx + 18},${cy + 8})`}>
        <rect x="-10" y="-7" width="20" height="14" rx="2" fill="#1a1a2e" stroke={color} strokeWidth="1.2"/>
        <rect x="-8" y="-5" width="16" height="9" rx="1" fill="#0d0d1a" opacity=".8"/>
        <line x1="-6" y1="-2" x2="2" y2="-2" stroke={color} strokeWidth=".8" opacity=".7"/>
        <line x1="-6" y1="0" x2="4" y2="0" stroke={color} strokeWidth=".8" opacity=".5"/>
        <line x1="-6" y1="2" x2="0" y2="2" stroke={color} strokeWidth=".8" opacity=".7"/>
      </g>
    ),
    'Software / SaaS': (
      <g transform={`translate(${cx + 18},${cy + 8})`}>
        <rect x="-10" y="-7" width="20" height="14" rx="2" fill="#1a1a2e" stroke={color} strokeWidth="1.2"/>
        <text x="0" y="3" textAnchor="middle" fill={color} fontSize="7" fontFamily="monospace">{`</>`}</text>
      </g>
    ),
    'Finance & Banking': (
      <g transform={`translate(${cx + 20},${cy + 10})`}>
        <rect x="-9" y="-12" width="18" height="22" rx="2" fill="#2d1a00" stroke={color} strokeWidth="1.2"/>
        <rect x="-7" y="-10" width="14" height="3" rx="1" fill={color} opacity=".6"/>
        <rect x="-7" y="-5" width="14" height="2" rx="1" fill={color} opacity=".4"/>
        <rect x="-7" y="0" width="10" height="2" rx="1" fill={color} opacity=".4"/>
        <path d="M-3,5 L3,5 L3,8 L-3,8 Z" fill={color} opacity=".5"/>
      </g>
    ),
    'Investment & Wealth Management': (
      <g transform={`translate(${cx + 20},${cy + 10})`}>
        <rect x="-9" y="-12" width="18" height="22" rx="2" fill="#2d1a00" stroke={color} strokeWidth="1.2"/>
        <text x="0" y="4" textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">₹</text>
      </g>
    ),
    'Marketing & Communications': (
      <g transform={`translate(${cx + 22},${cy})`}>
        <path d="M-4,-14 L-4,14 L12,6 L12,-6 Z" fill={color} opacity=".8"/>
        <ellipse cx="14" cy="0" rx="4" ry="6" fill="none" stroke={color} strokeWidth="1.2"/>
        <line x1="-4" y1="-6" x2="-10" y2="-10" stroke={color} strokeWidth="1"/>
        <line x1="-4" y1="0" x2="-11" y2="0" stroke={color} strokeWidth="1"/>
        <line x1="-4" y1="6" x2="-10" y2="10" stroke={color} strokeWidth="1"/>
      </g>
    ),
    'Healthcare / Hospitals': (
      <g transform={`translate(${cx},${cy - 28})`}>
        <path d="M-8,2 Q-12,-2 -8,-8 Q-4,-14 0,-10 Q4,-14 8,-8 Q12,-2 8,2 Q4,6 0,10 Q-4,6 -8,2 Z" fill="none" stroke={color} strokeWidth="1.5" opacity=".8"/>
        <line x1="0" y1="-3" x2="0" y2="10" stroke={color} strokeWidth="1" opacity=".6"/>
      </g>
    ),
    'Legal & Compliance': (
      <g transform={`translate(${cx},${cy - 40})`}>
        <ellipse cx="0" cy="-4" rx="14" ry="5" fill="#f5f2ea" opacity=".9"/>
        <rect x="-10" y="-4" width="20" height="6" rx="1" fill="#e8e0d0" opacity=".8"/>
        <line x1="-10" y1="-8" x2="10" y2="-8" stroke="#c8b89a" strokeWidth="1"/>
        <line x1="-10" y1="-10" x2="10" y2="-10" stroke="#c8b89a" strokeWidth=".8"/>
      </g>
    ),
    'Education / EdTech': (
      <g transform={`translate(${cx},${cy - 42})`}>
        <rect x="-14" y="-4" width="28" height="6" rx="1" fill={color} opacity=".9"/>
        <polygon points="-14,-4 14,-4 10,-12 -10,-12" fill={color} opacity=".7"/>
        <rect x="-2" y="2" width="4" height="8" fill={color} opacity=".6"/>
        <rect x="-6" y="10" width="12" height="2" rx="1" fill={color} opacity=".5"/>
      </g>
    ),
    'Media & Entertainment': (
      <g transform={`translate(${cx + 20},${cy})`}>
        <circle cx="0" cy="0" r="10" fill="#1a0a0a" stroke={color} strokeWidth="1.2"/>
        <rect x="-5" y="-7" width="10" height="14" rx="1" fill="#0d0505" opacity=".8"/>
        <circle cx="0" cy="0" r="3" fill={color} opacity=".6"/>
        <line x1="-10" y1="-8" x2="-14" y2="-12" stroke={color} strokeWidth="1"/>
        <line x1="10" y1="-8" x2="14" y2="-12" stroke={color} strokeWidth="1"/>
      </g>
    ),
    'Consulting & Strategy': (
      <g transform={`translate(${cx + 18},${cy})`}>
        {[0, 4, 8, 12].map((y, i) => (
          <rect key={i} x="-8" y={y - 10} width="16" height="3" rx="1" fill={palette.shell} stroke={color} strokeWidth=".8" opacity={1 - i * 0.15}/>
        ))}
      </g>
    ),
    'Government / PSU': (
      <g transform={`translate(${cx + 18},${cy + 5})`}>
        <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#1a2d1a" stroke={color} strokeWidth="1.2" opacity=".8"/>
        <rect x="-4" y="-4" width="8" height="8" rx="1" fill={color} opacity=".4"/>
        <circle cx="0" cy="0" r="2" fill={color} opacity=".8"/>
      </g>
    ),
  };

  return accessories[industry] || null;
}

// ── SCORE FEATURES ────────────────────────────────────────────────────────────
function ScoreFeatures({ tier, palette, cx, cy }) {
  if (tier === 5) {
    // Sage — white beard, staff antenna tip, wise eyes
    return (
      <g>
        {/* White beard */}
        <path d={`M${cx - 10},${cy + 12} Q${cx},${cy + 28} ${cx + 10},${cy + 12}`} fill="none" stroke="#f0ebe0" strokeWidth="3" opacity=".85" strokeLinecap="round"/>
        <path d={`M${cx - 6},${cy + 14} Q${cx},${cy + 24} ${cx + 6},${cy + 14}`} fill="#f0ebe0" opacity=".3"/>
        {/* Wisdom glow */}
        <circle cx={cx} cy={cy} r="32" fill="none" stroke={palette.glow} strokeWidth="1" opacity=".2"/>
        {/* Staff tip on right antenna */}
        <circle cx={cx + 14} cy={cy - 38} r="3" fill={palette.glow} opacity=".9"/>
        <line x1={cx + 14} y1={cy - 35} x2={cx + 14} y2={cy - 20} stroke={palette.glow} strokeWidth="1.5" opacity=".6"/>
      </g>
    );
  }
  if (tier === 4) {
    // Bodybuilder — thick limbs, flex lines
    return (
      <g>
        <ellipse cx={cx - 22} cy={cy + 5} rx="6" ry="4" fill={palette.shell} opacity=".9"/>
        <ellipse cx={cx + 22} cy={cy + 5} rx="6" ry="4" fill={palette.shell} opacity=".9"/>
        <line x1={cx - 16} y1={cy + 3} x2={cx - 22} y2={cy - 2} stroke={palette.belly} strokeWidth="2" opacity=".7"/>
        <line x1={cx + 16} y1={cy + 3} x2={cx + 22} y2={cy - 2} stroke={palette.belly} strokeWidth="2" opacity=".7"/>
      </g>
    );
  }
  if (tier === 3) {
    // Bent antenna, small scar
    return (
      <g>
        <line x1={cx - 4} y1={cy - 14} x2={cx - 6} y2={cy - 20} stroke={palette.shell} strokeWidth="1.5" opacity=".5"/>
        <line x1={cx - 6} y1={cy - 20} x2={cx - 14} y2={cy - 28} stroke={palette.shell} strokeWidth="1.5" opacity=".5" strokeDasharray="2,2"/>
        <path d={`M${cx + 6},${cy - 5} L${cx + 10},${cy - 2} L${cx + 8},${cy + 2}`} fill="none" stroke={palette.glow} strokeWidth="1" opacity=".5"/>
      </g>
    );
  }
  if (tier === 2) {
    // Hunched, frayed antennae, dark circles
    return (
      <g>
        <ellipse cx={cx - 8} cy={cy - 8} rx="4" ry="2.5" fill="rgba(0,0,0,0.4)" opacity=".6"/>
        <ellipse cx={cx + 8} cy={cy - 8} rx="4" ry="2.5" fill="rgba(0,0,0,0.4)" opacity=".6"/>
        <line x1={cx - 12} y1={cy - 35} x2={cx - 18} y2={cy - 30} stroke={palette.shell} strokeWidth="1" opacity=".4"/>
        <line x1={cx + 12} y1={cy - 35} x2={cx + 18} y2={cy - 30} stroke={palette.shell} strokeWidth="1" opacity=".4"/>
      </g>
    );
  }
  if (tier === 1) {
    // Cracked shell, hollow eyes, dark aura
    return (
      <g>
        <path d={`M${cx - 5},${cy + 5} L${cx},${cy - 5} L${cx + 8},${cy + 8}`} fill="none" stroke="rgba(192,57,43,0.6)" strokeWidth="1.5"/>
        <path d={`M${cx - 10},${cy - 2} L${cx - 6},${cy + 6}`} fill="none" stroke="rgba(192,57,43,0.4)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r="35" fill="none" stroke="rgba(192,57,43,0.15)" strokeWidth="3"/>
        <ellipse cx={cx - 8} cy={cy - 8} rx="5" ry="3" fill="rgba(0,0,0,0.5)" opacity=".8"/>
        <ellipse cx={cx + 8} cy={cy - 8} rx="5" ry="3" fill="rgba(0,0,0,0.5)" opacity=".8"/>
      </g>
    );
  }
  return null;
}

// ── MAIN ROACH SVG GENERATOR ──────────────────────────────────────────────────
export function RoachSVG({ score = 3, seniority = 'Mid-level (2–5 yrs)', gender = 'default', industry = '', size = 120 }) {
  const tier = score >= 4.2 ? 5 : score >= 3.3 ? 4 : score >= 2.5 ? 3 : score >= 1.7 ? 2 : 1;
  const palette = QUADRANT_PALETTE[tier];
  const seniorityData = SENIORITY_SCALE[seniority] || SENIORITY_SCALE['Mid-level (2–5 yrs)'];
  const antenna = ANTENNA_STYLES[gender] || ANTENNA_STYLES.default;

  const cx = 60, cy = 65;
  const bs = seniorityData.bodyScale;
  const posture = seniorityData.posture;
  const eyeScale = seniorityData.eyeSize;

  // Body dimensions
  const bodyW = 22 * bs, bodyH = 30 * bs;
  const headW = 16 * bs, headH = 14 * bs;

  // Expression by tier
  const expressions = {
    5: `M${cx - 6},${cy - 3} Q${cx},${cy + 2} ${cx + 6},${cy - 3}`, // calm smile
    4: `M${cx - 5},${cy - 2} Q${cx},${cy + 1} ${cx + 5},${cy - 2}`, // slight smile
    3: `M${cx - 5},${cy - 2} L${cx + 5},${cy - 2}`,                  // neutral line
    2: `M${cx - 5},${cy} Q${cx},${cy - 4} ${cx + 5},${cy}`,          // slight frown
    1: `M${cx - 6},${cy + 1} Q${cx},${cy - 5} ${cx + 6},${cy + 1}`,  // frown
  };

  return (
    <svg
      viewBox="0 0 120 130"
      width={size}
      height={size * (130 / 120)}
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id={`shellGrad${tier}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={palette.belly} />
          <stop offset="100%" stopColor={palette.shell} />
        </radialGradient>
        <radialGradient id={`headGrad${tier}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor={palette.belly} />
          <stop offset="100%" stopColor={palette.shell} />
        </radialGradient>
        {palette.aura !== 'none' && (
          <filter id="auraBlur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        )}
      </defs>

      {/* Aura for extermination zone */}
      {palette.aura !== 'none' && (
        <ellipse cx={cx} cy={cy + 10} rx="38" ry="32" fill={palette.aura} filter="url(#auraBlur)" />
      )}

      {/* Legs — 3 per side */}
      {[
        { x1: cx - bodyW, y1: cy - 5, x2: cx - bodyW - 16, y2: cy - 14 },
        { x1: cx - bodyW, y1: cy + 4, x2: cx - bodyW - 18, y2: cy + 4 },
        { x1: cx - bodyW, y1: cy + 12, x2: cx - bodyW - 14, y2: cy + 20 },
        { x1: cx + bodyW, y1: cy - 5, x2: cx + bodyW + 16, y2: cy - 14 },
        { x1: cx + bodyW, y1: cy + 4, x2: cx + bodyW + 18, y2: cy + 4 },
        { x1: cx + bodyW, y1: cy + 12, x2: cx + bodyW + 14, y2: cy + 20 },
      ].map((leg, i) => (
        <line key={i} x1={leg.x1} y1={leg.y1} x2={leg.x2} y2={leg.y2}
          stroke={palette.shell} strokeWidth={1.5 * bs} strokeLinecap="round"
          opacity={tier === 1 ? 0.6 : 0.9}
        />
      ))}

      {/* Body */}
      <g transform={`translate(${cx},${cy}) rotate(${posture})`}>
        <ellipse cx="0" cy="0" rx={bodyW} ry={bodyH} fill={`url(#shellGrad${tier})`} />
        {/* Shell segment lines */}
        <ellipse cx="0" cy="-8" rx={bodyW * 0.85} ry={bodyH * 0.3} fill="none" stroke={palette.shell} strokeWidth="1" opacity=".4" />
        <ellipse cx="0" cy="4" rx={bodyW * 0.9} ry={bodyH * 0.35} fill="none" stroke={palette.shell} strokeWidth="1" opacity=".3" />
        {/* Belly shine */}
        <ellipse cx="-4" cy="-6" rx={bodyW * 0.4} ry={bodyH * 0.25} fill={palette.belly} opacity=".2" />
      </g>

      {/* Score features (beard, muscles, cracks etc) */}
      <ScoreFeatures tier={tier} palette={palette} cx={cx} cy={cy} />

      {/* Head */}
      <g transform={`translate(${cx},${cy - bodyH - headH * 0.3})`}>
        <ellipse cx="0" cy="0" rx={headW} ry={headH} fill={`url(#headGrad${tier})`} />

        {/* Eyes */}
        <ellipse cx={-headW * 0.45} cy={-headH * 0.15} rx={5 * eyeScale} ry={5.5 * eyeScale} fill={palette.eye} />
        <ellipse cx={headW * 0.45} cy={-headH * 0.15} rx={5 * eyeScale} ry={5.5 * eyeScale} fill={palette.eye} />
        <ellipse cx={-headW * 0.45} cy={-headH * 0.1} rx={2.5 * eyeScale} ry={3 * eyeScale} fill={palette.pupil} />
        <ellipse cx={headW * 0.45} cy={-headH * 0.1} rx={2.5 * eyeScale} ry={3 * eyeScale} fill={palette.pupil} />
        {/* Eye shine */}
        <circle cx={-headW * 0.52} cy={-headH * 0.22} r={1 * eyeScale} fill="rgba(255,255,255,0.6)" />
        <circle cx={headW * 0.38} cy={-headH * 0.22} r={1 * eyeScale} fill="rgba(255,255,255,0.6)" />

        {/* Expression */}
        <path d={expressions[tier].replace(new RegExp(`${cx}`, 'g'), '0').replace(new RegExp(`${cy}`, 'g'), '0').replace(new RegExp(`${cy - 2}`, 'g'), '-2').replace(new RegExp(`${cy + 2}`, 'g'), '2').replace(new RegExp(`${cy + 1}`, 'g'), '1').replace(new RegExp(`${cy - 4}`, 'g'), '-4').replace(new RegExp(`${cy - 5}`, 'g'), '-5').replace(new RegExp(`${cy - 3}`, 'g'), '-3')} fill="none" stroke={palette.pupil} strokeWidth="1.2" strokeLinecap="round" opacity=".7" />

        {/* Antennae */}
        <path d={antenna.left} transform={`translate(${-headW * 0.3},${-headH * 0.7})`}
          fill="none" stroke={palette.shell} strokeWidth="1.5" strokeLinecap="round" opacity=".9" />
        <path d={antenna.right} transform={`translate(${headW * 0.3},${-headH * 0.7})`}
          fill="none" stroke={palette.shell} strokeWidth="1.5" strokeLinecap="round" opacity=".9" />
        {/* Antenna tips */}
        <circle cx={-headW * 0.3 + (tier === 5 ? 14 : 12)} cy={-headH * 0.7 - 35} r="2.5" fill={palette.glow} opacity=".9" />
        <circle cx={headW * 0.3 + 12} cy={-headH * 0.7 - 35} r="2.5" fill={palette.glow} opacity=".9" />
      </g>

      {/* Industry accessory */}
      <Accessory industry={industry} palette={palette} cx={cx} cy={cy} />

      {/* C-Suite suit markings */}
      {(seniority === 'C-Suite / Founder' || seniority === 'Director / VP') && (
        <g>
          <line x1={cx - 4} y1={cy - bodyH * 0.4} x2={cx - 4} y2={cy + bodyH * 0.4} stroke={palette.belly} strokeWidth="1" opacity=".4" />
          <line x1={cx + 4} y1={cy - bodyH * 0.4} x2={cx + 4} y2={cy + bodyH * 0.4} stroke={palette.belly} strokeWidth="1" opacity=".4" />
          <ellipse cx={cx} cy={cy - bodyH * 0.5} rx="3" ry="2" fill={palette.glow} opacity=".5" />
        </g>
      )}

    </svg>
  );
}

// ── ROACH AVATAR DISPLAY (with soul dot) ─────────────────────────────────────
export function RoachAvatar({ score, seniority, gender, industry, size = 80, publicUrl, publicSoulData, showSoulDot = false }) {
  const soulSize = Math.round(size * 0.28);

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {publicUrl ? (
        // Has a public avatar image
        <>
          <img src={publicUrl} alt="Public Avatar" style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--amber)', objectFit: 'cover', display: 'block' }} />
          {showSoulDot && publicSoulData && (
            <div style={{ position: 'absolute', bottom: -2, right: -2, width: soulSize, height: soulSize, borderRadius: '50%', border: '2px solid var(--bg)', background: '#0a0800', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RoachSVG {...publicSoulData} size={soulSize} />
            </div>
          )}
        </>
      ) : (
        // Soul roach IS the avatar
        <div style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--amber)', background: '#0a0800', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RoachSVG score={score} seniority={seniority} gender={gender} industry={industry} size={size * 0.92} />
        </div>
      )}
    </div>
  );
}

// ── LEGACY AVATAR SUPPORT ─────────────────────────────────────────────────────
export function Avatar({ url, soulUrl, size = 64, name = '', score, seniority, gender, industry }) {
  // If we have roach data, use the roach system
  if (score !== undefined) {
    return <RoachAvatar score={score} seniority={seniority} gender={gender} industry={industry} size={size} publicUrl={url} showSoulDot={!!url && !!score} publicSoulData={score !== undefined ? { score, seniority, gender, industry } : null} />;
  }

  // Legacy fallback
  const initials = (name || '🐜').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const soulSize = Math.round(size * 0.28);
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {url ? (
        <img src={url} alt={name || 'Avatar'} style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--amber)', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
      ) : soulUrl ? (
        <img src={soulUrl} alt="Soul Avatar" style={{ width: size, height: size, borderRadius: '50%', border: '2px solid var(--amber)', objectFit: 'cover', display: 'block' }} />
      ) : (
        <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--aglow)', border: '2px solid var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--fd)', fontSize: size * 0.35, color: 'var(--amber)' }}>{initials}</div>
      )}
      {url && soulUrl && (
        <div style={{ position: 'absolute', bottom: -2, right: -2, width: soulSize, height: soulSize, borderRadius: '50%', border: '2px solid var(--bg)', overflow: 'hidden', background: '#0a0800' }}>
          <img src={soulUrl} alt="Soul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
}

// ── SOUL SEED + URL GENERATORS ────────────────────────────────────────────────
export function generateSoulSeed(profile, score) {
  return [
    (profile.name || 'roach').toLowerCase().replace(/\s+/g, ''),
    (profile.industry || 'unknown').toLowerCase().replace(/[^a-z]/g, ''),
    (profile.city || 'somewhere').toLowerCase().replace(/\s+/g, ''),
    (profile.seniority || 'unknown').toLowerCase().replace(/[^a-z]/g, ''),
    score ? score.toFixed(1) : '0',
    new Date().toISOString().slice(0, 10),
  ].join('_');
}

// For the soul, we store the parameters not a URL since it's SVG-generated
export function generateSoulUrl(seed) {
  // Legacy DiceBear fallback — replaced by RoachSVG in the new system
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0a0800&radius=50`;
}

export function generateAvatarUrl(seed, style = 'bottts') {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1c190f&radius=50`;
}

// ── AVATAR PICKER (public avatar) ─────────────────────────────────────────────
const STYLES = [
  { id: 'bottts', label: 'Bottts', emoji: '🤖', desc: 'Robot characters.' },
  { id: 'adventurer', label: 'Adventurer', emoji: '🧑', desc: 'Illustrated faces.' },
  { id: 'pixel-art', label: 'Pixel Art', emoji: '👾', desc: 'Retro pixel.' },
  { id: 'lorelei', label: 'Lorelei', emoji: '🎭', desc: 'Editorial portraits.' },
];

export function AvatarPicker({ initialName = '', onConfirm }) {
  const { useState } = require('react');
  const [searchTerm, setSearchTerm] = useState(initialName || '');
  const [selectedStyle, setSelectedStyle] = useState('bottts');
  const [variations, setVariations] = useState([]);
  const [selected, setSelected] = useState('');
  const [generated, setGenerated] = useState(false);

  const generateVariations = () => {
    if (!searchTerm.trim()) return;
    const seeds = [searchTerm, searchTerm + '1', searchTerm + '_roach', searchTerm + '_survivor', searchTerm + '_dark', searchTerm + '_x'];
    setVariations(seeds.map(s => ({ seed: s, url: generateAvatarUrl(s, selectedStyle) })));
    setSelected(''); setGenerated(true);
  };

  const generateMore = () => {
    const rand = Math.random().toString(36).substr(2, 4);
    const seeds = [searchTerm + '_' + rand, rand + '_roach', searchTerm + rand, 'roach_' + rand, rand + '_swarm', searchTerm + '_' + rand + 'x'];
    setVariations(seeds.map(s => ({ seed: s, url: generateAvatarUrl(s, selectedStyle) })));
    setSelected('');
  };

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 8 }}>CHOOSE YOUR STYLE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
          {STYLES.map(s => (
            <div key={s.id} onClick={() => { setSelectedStyle(s.id); setGenerated(false); setVariations([]); }} style={{ padding: '8px 6px', borderRadius: 8, textAlign: 'center', cursor: 'pointer', border: selectedStyle === s.id ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: selectedStyle === s.id ? 'var(--aglow)' : 'var(--inp)' }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: selectedStyle === s.id ? 'var(--amber)' : 'var(--tdim)', letterSpacing: .5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 8 }}>SEARCH BY VIBE</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyDown={e => e.key === 'Enter' && generateVariations()} placeholder="Type anything — your name, a word, a feeling..." style={{ flex: 1, padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 14, fontStyle: 'italic' }} />
          <button onClick={generateVariations} disabled={!searchTerm.trim()} style={{ padding: '10px 16px', background: searchTerm.trim() ? 'linear-gradient(135deg,var(--amber),var(--adim))' : 'rgba(212,130,10,0.07)', border: 'none', borderRadius: 7, color: searchTerm.trim() ? '#0c0a08' : 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, cursor: searchTerm.trim() ? 'pointer' : 'not-allowed', letterSpacing: 1 }}>Go →</button>
        </div>
      </div>
      {generated && variations.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 10 }}>TAP TO SELECT</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 10 }}>
            {variations.map((v, i) => (
              <div key={i} onClick={() => setSelected(v.seed)} style={{ padding: 8, borderRadius: 10, cursor: 'pointer', border: selected === v.seed ? '2px solid var(--amber)' : '2px solid var(--bdr)', background: selected === v.seed ? 'var(--aglow)' : 'var(--inp)', textAlign: 'center' }}>
                <img src={v.url} alt={v.seed} style={{ width: 56, height: 56, borderRadius: '50%', display: 'block', margin: '0 auto 6px' }} />
                <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: .5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.seed}</div>
              </div>
            ))}
          </div>
          <button onClick={generateMore} style={{ width: '100%', padding: '9px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1 }}>🔄 Generate more</button>
        </div>
      )}
      {selected && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 10, marginBottom: 12 }}>
            <img src={generateAvatarUrl(selected, selectedStyle)} alt="Selected" style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--adim)', letterSpacing: 2, marginBottom: 3 }}>YOUR PUBLIC ROACH</div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 14, color: 'var(--amber)', fontStyle: 'italic' }}>{selected}</div>
            </div>
          </div>
          <button onClick={() => onConfirm(generateAvatarUrl(selected, selectedStyle), selected)} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 2 }}>
            ✓ This is my Roach →
          </button>
        </div>
      )}
    </div>
  );
}

// ── SIMPLE SETUP (for edit flow) ──────────────────────────────────────────────
export function AvatarSetup({ initialName = '', initialGender = '', onConfirm }) {
  const { useState } = require('react');
  const [localName, setLocalName] = useState(initialName);
  const [localGender, setLocalGender] = useState(initialGender);
  const [preview, setPreview] = useState('');
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const url = generateAvatarUrl(localName || 'Roach', localGender === 'Female' ? 'adventurer' : 'bottts');
    setPreview(url); setGenerated(true);
  };

  const tryAnother = () => {
    const rand = Math.random().toString(36).substr(2, 6);
    const style = localGender === 'Female' ? 'adventurer' : 'bottts';
    setPreview(`https://api.dicebear.com/7.x/${style}/svg?seed=${rand}&backgroundColor=1c190f&radius=50`);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {preview ? <img src={preview} alt="Your Roach" style={{ width: 90, height: 90, borderRadius: '50%', border: '3px solid var(--amber)', margin: '0 auto 10px', display: 'block' }} /> : <div style={{ width: 90, height: 90, borderRadius: '50%', border: '2px dashed var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 36 }}>🐜</div>}
        {generated && <button onClick={tryAnother} style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: 1, textDecoration: 'underline' }}>Try another →</button>}
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 6 }}>YOUR NAME</div>
        <input value={localName} onChange={e => setLocalName(e.target.value)} placeholder="What do they call you?" style={{ width: '100%', padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 14, fontStyle: 'italic' }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 6 }}>GENDER</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => (
            <div key={g} onClick={() => setLocalGender(g)} style={{ padding: '9px 12px', borderRadius: 7, cursor: 'pointer', border: localGender === g ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: localGender === g ? 'var(--aglow)' : 'transparent', fontFamily: 'var(--fm)', fontSize: 11, color: localGender === g ? 'var(--amber)' : 'var(--tdim)', textAlign: 'center' }}>{g}</div>
          ))}
        </div>
      </div>
      {!generated ? (
        <button onClick={generate} disabled={!localName || !localGender} style={{ width: '100%', padding: '12px', background: (!localName || !localGender) ? 'rgba(212,130,10,0.07)' : 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: (!localName || !localGender) ? 'var(--tdim)' : '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: (!localName || !localGender) ? 'not-allowed' : 'pointer', letterSpacing: 2 }}>🐜 Generate My Roach</button>
      ) : (
        <button onClick={() => onConfirm(localName, localGender, preview)} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 2 }}>✓ This is my Roach →</button>
      )}
    </div>
  );
}
