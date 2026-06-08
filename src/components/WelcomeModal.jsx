import { useState, useEffect, useRef } from 'react';
import { AvatarSetup } from './RoachAvatar';

const GOOGLE_CLIENT_ID = '9152612611-jjcgd3ouk1khvp1ekohmrmgki7ui4kd6.apps.googleusercontent.com';

export function WelcomeModal({ onSignup, onSkip }) {
  const [step, setStep] = useState('choice');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [prefillName, setPrefillName] = useState('');
  const [prefillAvatar, setPrefillAvatar] = useState('');
  const googleBtnRef = useRef(null);

  useEffect(() => {
    // Init Google One Tap
    const initGoogle = () => {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: false,
      });
      // Render the button
      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          width: googleBtnRef.current.offsetWidth || 360,
          text: 'continue_with',
        });
      }
    };

    if (window.google) {
      initGoogle();
    } else {
      // Wait for script to load
      const interval = setInterval(() => {
        if (window.google) { initGoogle(); clearInterval(interval); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  const handleGoogleResponse = (response) => {
    try {
      // Decode JWT token from Google
      const base64 = response.credential.split('.')[1];
      const decoded = JSON.parse(atob(base64));
      const userEmail = decoded.email || '';
      const userName = decoded.name || userEmail.split('@')[0];
      const userAvatar = decoded.picture || '';
      if (userEmail) {
        setPrefillName(userName);
        setPrefillAvatar(userAvatar);
        setEmail(userEmail);
        // Background submissions
        submitToServices(userEmail);
        setStep('avatar');
      }
    } catch (e) {
      setErr('Google login failed. Please use email below.');
    }
  };

  const submitToServices = (em) => {
    try {
      const f = new FormData();
      f.append('form-name', 'workroach-members');
      f.append('email', em);
      f.append('joined', new Date().toISOString());
      fetch('/', { method: 'POST', body: f });
    } catch (e) {}
    try {
      const m = new FormData();
      m.append('EMAIL', em);
      m.append('b_db3a36b5542c64869f590454b_2a3eb2ce9b', '');
      fetch('https://workroach.us16.list-manage.com/subscribe/post?u=db3a36b5542c64869f590454b&id=2a3eb2ce9b&f_id=0099c2e1f0', { method: 'POST', body: m, mode: 'no-cors' });
    } catch (e) {}
  };

  const handleEmail = () => {
    if (!email.trim() || !email.includes('@')) { setErr('Please enter a valid email.'); return; }
    setErr('');
    submitToServices(email);
    setStep('avatar');
  };

  const handleAvatarConfirm = (name, gender, avatarUrl) => {
    onSignup({ email, name, gender, avatarUrl: avatarUrl || prefillAvatar });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ background: 'var(--card)', border: '1px solid var(--bhi)', borderRadius: 14, padding: 'clamp(24px,4vw,36px)', maxWidth: 440, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>

        {step === 'choice' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🐜</div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,4vw,30px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 6 }}>WELCOME, ROACH</div>
              <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', color: 'var(--tmid)', fontStyle: 'italic', lineHeight: 1.7 }}>Sign up to get your Survival Report and join the monthly Infestation Index.</p>
            </div>

            {/* Google One Tap button */}
            <div ref={googleBtnRef} style={{ width: '100%', marginBottom: 12, minHeight: 44, display: 'flex', justifyContent: 'center' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--bdr)' }} />
              <span style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--tdim)', letterSpacing: 1 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: 'var(--bdr)' }} />
            </div>

            <input
              value={email}
              onChange={e => { setEmail(e.target.value); setErr(''); }}
              onKeyDown={e => { if (e.key === 'Enter') handleEmail(); }}
              placeholder="your@email.com"
              type="email"
              style={{ width: '100%', padding: '12px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 8, color: 'var(--text)', fontFamily: 'var(--fm)', fontSize: 13, marginBottom: 8 }}
            />
            {err && <div style={{ fontFamily: 'var(--fm)', fontSize: 11, color: '#c0392b', marginBottom: 8 }}>{err}</div>}

            <button
              onClick={handleEmail}
              style={{ width: '100%', padding: '13px', background: 'linear-gradient(135deg,var(--amber),var(--adim))', border: 'none', borderRadius: 8, color: '#0c0a08', fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: 2, marginBottom: 12 }}
            >
              📧 Continue with Email →
            </button>

            <div style={{ fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--tdim)', letterSpacing: .5, textAlign: 'center', lineHeight: 1.6 }}>Email required. We don't sell data. Ever.</div>
          </div>
        )}

        {step === 'avatar' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(18px,3vw,24px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 6 }}>CREATE YOUR ROACH</div>
              <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(12px,1.4vw,14px)', color: 'var(--tdim)', fontStyle: 'italic' }}>Your avatar lives on your profile and your score card.</p>
            </div>
            <AvatarSetup initialName={prefillName} initialGender="" onConfirm={handleAvatarConfirm} />
          </div>
        )}

      </div>
    </div>
  );
}
