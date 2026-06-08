import { RoachLogo } from './ui';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  return (
    <div className="theme-toggle">
      {[{ id: 'dark', icon: '🌑' }, { id: 'light', icon: '☀️' }, { id: 'neon', icon: '⚡' }].map(t => (
        <button key={t.id} className={`theme-btn${theme === t.id ? ' active' : ''}`} onClick={() => setTheme(t.id)} title={t.id}>{t.icon}</button>
      ))}
    </div>
  );
}

export function Nav({ onHome, onPhilosophy, onParliament, onWall }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 28, paddingBottom: 14, borderBottom: '1px solid var(--bdr)', flexWrap: 'wrap' }}>
      <div
        onClick={onHome}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'opacity .18s' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        <RoachLogo />
        <div>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 18, letterSpacing: 3, color: 'var(--amber)', lineHeight: 1 }}>WORKROACH</div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 7, letterSpacing: 2, color: 'var(--tdim)' }}>SURVIVE · EXPOSE · SCATTER THEM</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {onPhilosophy && <NavBtn onClick={onPhilosophy}>📜 Philosophy</NavBtn>}
        {onParliament && <NavBtn onClick={onParliament}>🏛️ Parliament</NavBtn>}
        {onWall && <NavBtn onClick={onWall}>🧾 The Wall</NavBtn>}
      </div>
    </div>
  );
}

function NavBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ padding: '6px 14px', background: 'transparent', border: '1px solid var(--bdr)', borderRadius: 20, fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.2vw,12px)', color: 'var(--amber)', cursor: 'pointer', letterSpacing: 1 }}
    >
      {children}
    </button>
  );
}

export function Footer({ onTerms, onHome }) {
  return (
    <div style={{ marginTop: 32, paddingTop: 22, borderTop: '1px solid var(--bdr)', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--fd)', fontSize: 14, letterSpacing: 3, color: 'var(--amber)', marginBottom: 12 }}>WORKROACH</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        {[
          { l: 'Instagram', u: 'https://www.instagram.com/workroach/', i: '📸' },
          { l: 'X / Twitter', u: 'https://x.com/workroach', i: '𝕏' },
          { l: 'LinkedIn', u: 'https://www.linkedin.com/company/workroach/', i: 'in' },
        ].map(s => (
          <a key={s.l} href={s.u} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 20, textDecoration: 'none', fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.2vw,12px)', color: 'var(--tdim)', letterSpacing: 1 }}>
            <span>{s.i}</span><span>{s.l}</span>
          </a>
        ))}
      </div>
      <a href="https://www.chai4.me/workroach" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '11px 18px', background: 'var(--inp)', border: '1px solid var(--bhi)', borderRadius: 8, textDecoration: 'none', marginBottom: 16 }}>
        <span style={{ fontSize: 18 }}>🍵</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 14, letterSpacing: 2, color: 'var(--amber)' }}>FUEL THE ROACH</div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 7, color: 'var(--tdim)', letterSpacing: 1 }}>Starve the exploitation. Every chai funds a new feature.</div>
        </div>
      </a>
      <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', letterSpacing: 2, lineHeight: 2.2 }}>
        <div>WORKROACH.COM · SURVIVE · EXPOSE · SCATTER THEM</div>
        <div>NOT LEGAL OR FINANCIAL ADVICE</div>
        <div style={{ marginTop: 4 }}>
          © 2026 Workroach. We don't sell data. Ever. ·{' '}
          <span onClick={onTerms} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--adim)' }}>Terms & Privacy</span>
        </div>
      </div>
    </div>
  );
}
