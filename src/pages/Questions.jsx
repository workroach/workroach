import { useState } from 'react';
import { Nav } from '../components/Nav';
import { Card, Pill } from '../components/ui';
import { QUESTIONS } from '../data/constants';

export function QuestionsPage({ audit, navProps, goto, PAGES, onComplete }) {
  const [qStep, setQStep] = useState(0);
  const [localAnswers, setLocalAnswers] = useState({ ...audit.answers });
  const [sel, setSel] = useState(null);

  const q = QUESTIONS[qStep];
  const prog = (qStep / QUESTIONS.length) * 100;

  const next = () => {
    if (sel === null) return;
    const na = { ...localAnswers, [q.id]: sel };
    setLocalAnswers(na);
    if (qStep < QUESTIONS.length - 1) {
      setQStep(s => s + 1);
      setSel(localAnswers[QUESTIONS[qStep + 1]?.id] || null);
    } else {
      onComplete(na);
    }
  };

  const back = () => {
    if (qStep === 0) { goto(PAGES.STRUCTURAL); return; }
    setQStep(s => s - 1);
    setSel(localAnswers[QUESTIONS[qStep - 1]?.id] || null);
  };

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />
        <div className="fu" style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: 3, color: 'var(--adim)', marginBottom: 6 }}>
            STEP 3 OF 3 · PERCEPTION — {qStep + 1}/{QUESTIONS.length}
          </div>
          <div style={{ background: 'var(--bdr)', borderRadius: 3, height: 3, overflow: 'hidden', marginBottom: 3 }}>
            <div style={{ width: prog + '%', height: '100%', background: 'linear-gradient(90deg,var(--adim),var(--amber))', transition: 'width .5s ease' }} />
          </div>
          <div style={{ textAlign: 'right', fontFamily: 'var(--fm)', fontSize: 9, color: 'var(--adim)' }}>{Math.round(prog)}%</div>
        </div>

        <div className="fu" style={{ animationDelay: '.04s' }}>
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--amber)', marginBottom: 7, letterSpacing: 2 }}>
              {q.emoji} {q.cat.toUpperCase()}
            </div>
            <h2 style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(16px,2.5vw,22px)', lineHeight: 1.5, color: 'var(--text)', marginBottom: 18, fontStyle: 'italic' }}>
              {q.q}
            </h2>
            <Pill
              options={q.opts.map(o => o.l)}
              value={(q.opts.find(o => o.s === sel) || {}).l || ''}
              onChange={label => {
                const o = q.opts.find(o => o.l === label);
                if (o) setSel(o.s);
              }}
            />
          </Card>

          <button
            onClick={next}
            disabled={sel === null}
            style={{
              width: '100%', padding: 'clamp(11px,2vw,14px)', marginBottom: 10,
              background: sel === null ? 'rgba(212,130,10,0.07)' : 'linear-gradient(135deg,var(--amber),var(--adim))',
              border: 'none', borderRadius: 8,
              color: sel === null ? 'var(--tdim)' : '#0c0a08',
              fontFamily: 'var(--fm)', fontSize: 12, fontWeight: 700,
              cursor: sel === null ? 'not-allowed' : 'pointer', letterSpacing: 2,
              boxShadow: sel === null ? 'none' : '0 4px 18px var(--aglow)',
            }}
          >
            {qStep === QUESTIONS.length - 1 ? 'CALCULATE MY SURVIVAL INDEX →' : 'NEXT →'}
          </button>

          <button onClick={back} style={{ background: 'transparent', border: 'none', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', width: '100%', letterSpacing: 1 }}>← Back</button>
        </div>
      </div>
    </div>
  );
}
