import { useState, useEffect } from 'react';
import { generateSoulSeed, generateSoulUrl, RoachSVG, AvatarPicker } from '../components/RoachAvatar';

export function IdentityReveal({ profile, totalAvg, onComplete }) {
  const [step, setStep] = useState('reveal'); // reveal | pick | confirm
  const [publicUrl, setPublicUrl] = useState('');
  const [publicSeed, setPublicSeed] = useState('');
  const [nameInput, setNameInput] = useState(profile.name || '');
  const [animIn, setAnimIn] = useState(false);

  // Generate soul on mount
  const soulSeed = generateSoulSeed(
    { name: profile.name, industry: profile.industry, city: profile.city, seniority: profile.seniority },
    totalAvg
  );
  const soulUrl = generateSoulUrl(soulSeed);

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 100);
  }, []);

  const handlePickerConfirm = (url, seed) => {
    setPublicUrl(url);
    setPublicSeed(seed);
    setStep('confirm');
  };

  const handleFinalConfirm = () => {
    onComplete({
      name: nameInput,
      soulSeed,
      soulUrl,
      publicUrl,
      publicSeed,
    });
  };

  const skipPublic = () => {
    onComplete({
      name: nameInput,
      soulSeed,
      soulUrl,
      publicUrl: '',
      publicSeed: '',
    });
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg)',
      zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      overflow: 'auto',
    }}>
      <div style={{
        maxWidth: 520, width: '100%',
        opacity: animIn ? 1 : 0,
        transform: animIn ? 'translateY(0)' : 'translateY(24px)',
        transition: 'all .6s ease',
      }}>

        {/* ── REVEAL STEP ── */}
        {step === 'reveal' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1.2vw,11px)', letterSpacing: 4, color: 'var(--adim)', marginBottom: 24 }}>
              WORKROACH · IDENTITY REVEAL
            </div>

            <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,5vw,48px)', letterSpacing: 3, color: 'var(--amber)', lineHeight: 1.1, marginBottom: 8 }}>
              ONE BRAVE STEP<br />FOR ROACH.
            </h1>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,1.8vw,18px)', color: 'var(--tdim)', fontStyle: 'italic', marginBottom: 40, lineHeight: 1.7 }}>
              A giant leap for the Roach kind.
            </p>

            {/* Soul avatar reveal */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(9px,1vw,11px)', letterSpacing: 3, color: 'var(--adim)', marginBottom: 16 }}>
                YOUR SOUL HAS BEEN READ
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <div style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid var(--amber)', background: '#0a0800', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s ease-in-out infinite' }}>
                    <RoachSVG score={totalAvg} seniority={profile.seniority} gender={profile.gender} industry={profile.industry} size={112} />
                  </div>
                  <div style={{
                    position: 'absolute', inset: -8,
                    borderRadius: '50%',
                    border: '1px solid var(--amber)',
                    opacity: .3,
                    animation: 'pulse 2s ease-in-out infinite',
                  }} />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8, maxWidth: 400, margin: '0 auto', marginBottom: 8 }}>
                This avatar was generated from your name, your industry, your city, your level, and your first audit score.
              </div>
              <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--adim)', fontStyle: 'italic' }}>
                It cannot be changed. It is the only honest portrait Workroach will ever make of you.
              </div>
            </div>

            {/* Name confirm */}
            <div style={{ marginBottom: 24, textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 2, marginBottom: 8 }}>CONFIRM YOUR NAME</div>
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="What do they call you?"
                style={{ width: '100%', padding: '12px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 15, fontStyle: 'italic' }}
              />
            </div>

            <button
              onClick={() => setStep('pick')}
              style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: 2, marginBottom: 12, boxShadow: '0 4px 18px var(--aglow)' }}
            >
              NOW CHOOSE YOUR PUBLIC FACE →
            </button>
            <button onClick={skipPublic} style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 11, cursor: 'pointer', letterSpacing: 1 }}>
              Skip — use soul avatar for now
            </button>
          </div>
        )}

        {/* ── PICK STEP ── */}
        {step === 'pick' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 3, marginBottom: 8 }}>WHO DO YOU WANT THE SWARM TO SEE?</div>
              <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', color: 'var(--tdim)', fontStyle: 'italic', lineHeight: 1.7 }}>
                Search by a word, a feeling, your name, anything. Browse until one feels right.
              </p>
            </div>

            {/* Soul preview small */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid var(--amber)', background: '#0a0800', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RoachSVG score={totalAvg} seniority={profile.seniority} gender={profile.gender} industry={profile.industry} size={34} /></div>
              <div>
                <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--adim)', letterSpacing: 2, marginBottom: 2 }}>YOUR SOUL AVATAR — PERMANENT</div>
                <div style={{ fontFamily: 'var(--fs)', fontSize: 12, color: 'var(--tdim)', fontStyle: 'italic' }}>Will appear as a small dot on your public avatar</div>
              </div>
            </div>

            <AvatarPicker initialName={nameInput} onConfirm={handlePickerConfirm} />

            <button onClick={() => setStep('reveal')} style={{ marginTop: 12, width: '100%', padding: '9px', background: 'transparent', border: 'none', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1 }}>← Back</button>
          </div>
        )}

        {/* ── CONFIRM STEP ── */}
        {step === 'confirm' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--adim)', letterSpacing: 3, marginBottom: 24 }}>YOUR ROACH IDENTITY</div>

            {/* Avatar stack preview */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={publicUrl} alt="Public" style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid var(--amber)', display: 'block' }} />
                {/* Soul dot */}
                <div style={{ position: 'absolute', bottom: -2, right: -2, width: 34, height: 34, borderRadius: '50%', border: '3px solid var(--bg)', background: '#0a0800', overflow: 'hidden' }}>
                  <RoachSVG score={totalAvg} seniority={profile.seniority} gender={profile.gender} industry={profile.industry} size={32} />
                </div>
              </div>
            </div>

            <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(20px,3.5vw,28px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 6 }}>
              {nameInput || 'Anonymous Roach'}
            </div>
            <div style={{ fontFamily: 'var(--fs)', fontSize: 13, color: 'var(--tdim)', fontStyle: 'italic', marginBottom: 8 }}>
              Public: {publicSeed}
            </div>
            <div style={{ fontFamily: 'var(--fs)', fontSize: 11, color: 'var(--adim)', fontStyle: 'italic', marginBottom: 32 }}>
              Soul: immutable · permanent · yours
            </div>

            <div style={{ padding: '20px', background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 12, marginBottom: 24 }}>
              <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,1.8vw,18px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.8 }}>
                Congratulations. Your one brave step for Roach will be a giant leap for the Roach kind.
              </p>
            </div>

            <button
              onClick={handleFinalConfirm}
              style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: 2, boxShadow: '0 4px 24px var(--aglow)', marginBottom: 10 }}
            >
              🐜 ENTER THE SWARM →
            </button>
            <button onClick={() => setStep('pick')} style={{ width: '100%', padding: '9px', background: 'transparent', border: 'none', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', letterSpacing: 1 }}>← Change avatar</button>
          </div>
        )}

      </div>
    </div>
  );
}
