import { useState } from 'react';

// ── AVATAR STYLES ─────────────────────────────────────────────────────────────
const STYLES = [
  { id: 'bottts', label: 'Bottts', emoji: '🤖', desc: 'Robot characters. Very Workroach.' },
  { id: 'adventurer', label: 'Adventurer', emoji: '🧑', desc: 'Illustrated human faces.' },
  { id: 'pixel-art', label: 'Pixel Art', emoji: '👾', desc: 'Retro pixel characters.' },
  { id: 'lorelei', label: 'Lorelei', emoji: '🎭', desc: 'Editorial portraits.' },
];

// ── GENERATE URLS ─────────────────────────────────────────────────────────────
export function generateAvatarUrl(seed, style = 'bottts') {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1c190f&radius=50`;
}

export function generateSoulSeed(profile, score) {
  const parts = [
    (profile.name || 'roach').toLowerCase().replace(/\s+/g, ''),
    (profile.industry || 'unknown').toLowerCase().replace(/\s+/g, ''),
    (profile.city || 'somewhere').toLowerCase().replace(/\s+/g, ''),
    (profile.seniority || 'unknown').toLowerCase().replace(/\s+/g, ''),
    score ? score.toFixed(1) : '0',
    new Date().toISOString().slice(0, 10),
  ].join('_');
  return parts;
}

export function generateSoulUrl(seed) {
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0a0800&radius=50`;
}

// ── AVATAR DISPLAY ────────────────────────────────────────────────────────────
export function Avatar({ url, soulUrl, size = 64, name = '' }) {
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
      {/* Soul dot — only shows when public avatar is set */}
      {url && soulUrl && (
        <div style={{ position: 'absolute', bottom: -2, right: -2, width: soulSize, height: soulSize, borderRadius: '50%', border: '2px solid var(--bg)', overflow: 'hidden', background: '#0a0800' }}>
          <img src={soulUrl} alt="Soul" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
    </div>
  );
}

// ── PUBLIC AVATAR PICKER ──────────────────────────────────────────────────────
export function AvatarPicker({ initialName = '', initialGender = '', onConfirm }) {
  const [searchTerm, setSearchTerm] = useState(initialName || '');
  const [selectedStyle, setSelectedStyle] = useState('bottts');
  const [variations, setVariations] = useState([]);
  const [selected, setSelected] = useState('');
  const [generated, setGenerated] = useState(false);

  const generateVariations = () => {
    if (!searchTerm.trim()) return;
    const seeds = [
      searchTerm,
      searchTerm + '1',
      searchTerm + '_roach',
      searchTerm + '_survivor',
      searchTerm + '_dark',
      searchTerm + '_light',
    ];
    setVariations(seeds.map(s => ({
      seed: s,
      url: generateAvatarUrl(s, selectedStyle),
    })));
    setSelected('');
    setGenerated(true);
  };

  const generateMore = () => {
    const rand = Math.random().toString(36).substr(2, 4);
    const seeds = [
      searchTerm + '_' + rand,
      rand + '_roach',
      searchTerm + rand,
      'roach_' + rand,
      rand + '_swarm',
      searchTerm + '_' + rand + 'x',
    ];
    setVariations(seeds.map(s => ({
      seed: s,
      url: generateAvatarUrl(s, selectedStyle),
    })));
    setSelected('');
  };

  const selectedUrl = selected ? generateAvatarUrl(selected, selectedStyle) : '';

  return (
    <div>
      {/* Style picker */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 8 }}>CHOOSE YOUR STYLE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(100px,1fr))', gap: 8 }}>
          {STYLES.map(s => (
            <div key={s.id} onClick={() => { setSelectedStyle(s.id); setGenerated(false); setVariations([]); }} style={{ padding: '10px 8px', borderRadius: 8, textAlign: 'center', cursor: 'pointer', border: selectedStyle === s.id ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: selectedStyle === s.id ? 'var(--aglow)' : 'var(--inp)', transition: 'all .15s' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.emoji}</div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: selectedStyle === s.id ? 'var(--amber)' : 'var(--tdim)', letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 8 }}>SEARCH BY VIBE</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generateVariations()}
            placeholder="Type anything — your name, a word, a feeling..."
            style={{ flex: 1, padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 14, fontStyle: 'italic' }}
          />
          <button onClick={generateVariations} disabled={!searchTerm.trim()} style={{ padding: '10px 16px', background: searchTerm.trim() ? 'linear-gradient(135deg,var(--amber),var(--adim))' : 'rgba(212,130,10,0.07)', border: 'none', borderRadius: 7, color: searchTerm.trim() ? '#0c0a08' : 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 11, fontWeight: 700, cursor: searchTerm.trim() ? 'pointer' : 'not-allowed', letterSpacing: 1, whiteSpace: 'nowrap' }}>Generate →</button>
        </div>
      </div>

      {/* Variations grid */}
      {generated && variations.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 10 }}>TAP TO SELECT</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 10 }}>
            {variations.map((v, i) => (
              <div key={i} onClick={() => setSelected(v.seed)} style={{ padding: 8, borderRadius: 10, cursor: 'pointer', border: selected === v.seed ? '2px solid var(--amber)' : '2px solid var(--bdr)', background: selected === v.seed ? 'var(--aglow)' : 'var(--inp)', textAlign: 'center', transition: 'all .15s' }}>
                <img src={v.url} alt={v.seed} style={{ width: 64, height: 64, borderRadius: '50%', display: 'block', margin: '0 auto 6px' }} />
                <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: .5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.seed}</div>
              </div>
            ))}
          </div>
          <button onClick={generateMore} style={{ width: '100%', padding: '9px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1 }}>🔄 Generate more variations</button>
        </div>
      )}

      {/* Confirm */}
      {selected && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 10, marginBottom: 12 }}>
            <img src={selectedUrl} alt="Selected" style={{ width: 56, height: 56, borderRadius: '50%', border: '2px solid var(--amber)', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--adim)', letterSpacing: 2, marginBottom: 3 }}>YOUR PUBLIC ROACH</div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 14, color: 'var(--amber)', fontStyle: 'italic' }}>{selected}</div>
            </div>
          </div>
          <button onClick={() => onConfirm(selectedUrl, selected)} style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 2 }}>
            ✓ This is my Roach →
          </button>
        </div>
      )}
    </div>
  );
}

// ── SIMPLE AVATAR SETUP (for edit flow) ───────────────────────────────────────
export function AvatarSetup({ initialName = '', initialGender = '', onConfirm }) {
  const [localName, setLocalName] = useState(initialName);
  const [localGender, setLocalGender] = useState(initialGender);
  const [preview, setPreview] = useState('');
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const url = generateAvatarUrl(localName || 'Roach', localGender === 'Female' ? 'adventurer' : 'bottts');
    setPreview(url);
    setGenerated(true);
  };

  const tryAnother = () => {
    const rand = Math.random().toString(36).substr(2, 6);
    const style = localGender === 'Female' ? 'adventurer' : 'bottts';
    setPreview(`https://api.dicebear.com/7.x/${style}/svg?seed=${rand}&backgroundColor=1c190f&radius=50`);
  };

  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {preview ? (
          <img src={preview} alt="Your Roach" style={{ width: 90, height: 90, borderRadius: '50%', border: '3px solid var(--amber)', margin: '0 auto 10px', display: 'block' }} />
        ) : (
          <div style={{ width: 90, height: 90, borderRadius: '50%', border: '2px dashed var(--bdr)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 36 }}>🐜</div>
        )}
        {generated && (
          <button onClick={tryAnother} style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: 1, textDecoration: 'underline' }}>Try another →</button>
        )}
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 6 }}>YOUR NAME</div>
        <input value={localName} onChange={e => setLocalName(e.target.value)} placeholder="What do they call you?" style={{ width: '100%', padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 14, fontStyle: 'italic' }} />
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 6 }}>GENDER</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {genders.map(g => (
            <div key={g} onClick={() => setLocalGender(g)} style={{ padding: '9px 12px', borderRadius: 7, cursor: 'pointer', border: localGender === g ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: localGender === g ? 'var(--aglow)' : 'transparent', fontFamily: 'var(--fm)', fontSize: 11, color: localGender === g ? 'var(--amber)' : 'var(--tdim)', textAlign: 'center', letterSpacing: .5 }}>
              {g}
            </div>
          ))}
        </div>
      </div>

      {!generated ? (
        <button onClick={generate} disabled={!localName || !localGender} style={{ width: '100%', padding: '12px', background: (!localName || !localGender) ? 'rgba(212,130,10,0.07)' : 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: (!localName || !localGender) ? 'var(--tdim)' : '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: (!localName || !localGender) ? 'not-allowed' : 'pointer', letterSpacing: 2 }}>
          🐜 Generate My Roach
        </button>
      ) : (
        <button onClick={() => onConfirm(localName, localGender, preview)} style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 2 }}>
          ✓ This is my Roach →
        </button>
      )}
    </div>
  );
}
