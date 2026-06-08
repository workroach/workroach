import { Nav, Footer } from '../components/Nav';
import { RoachLogo } from '../components/ui';

const SECTIONS = [
  { id: 'roach', title: 'Why Roach?', content: ["Because the cockroach is the most honest creature in the building.", "It doesn't pretend. It doesn't perform. It doesn't send a follow-up email saying how grateful it is for the opportunity to be exterminated.", "It survives. Quietly. Completely. In conditions that would destroy most things.", "The cockroach has outlasted dinosaurs, empires, and every HR policy ever written. It will outlast your current employer too.", "That's not weakness. That's the most radical form of resilience there is.", "We chose the roach because we are the roach. And so are you."] },
  { id: 'scatter', title: 'Who Are We Scattering?', content: ["The manager who calls it a family but doesn't pay overtime.", "The HR department that exists to protect the company from the employee — not the other way around.", "The founder who posts about culture on LinkedIn on Friday and sends emails at 11pm on Sunday.", "The CFO who approved a 34% profit growth and a 5% increment in the same quarter.", "The recruiter who described the role as one thing and delivered another.", "The company that puts People First on the wall and last on the budget.", "The system that taught you to be grateful for being underpaid.", "The silence that made all of it possible.", "Not the companies themselves. Not even the people in them necessarily. The behaviour. The pattern. The normalisation of extraction.", "That's what scatters when the light comes on. Because that's what cockroaches actually do — they don't fight. They expose. The moment you shine a light on them they scatter. They cannot survive scrutiny.", "Neither can exploitation."] },
  { id: 'victim', title: 'You Are Not A Victim', content: ["Workroach is not a platform for the broken.", "It's a platform for the clear-eyed.", "There's a difference between someone who is being exploited and someone who knows they're being exploited. The knowing is the power. The naming is the weapon.", "You don't come to Workroach to be saved. You come to Workroach to see — clearly, finally, without the corporate sugarcoating — exactly what is happening to you, what it's worth, and what you're going to do about it.", "We are not victims. We are witnesses. And witnesses change things."] },
  { id: '4point5', title: 'The 4.5 Roach', content: ["Here's a question we get asked.", '"Am I a Workroach if I scored 4.5 out of 5?"', "Yes. Absolutely yes. Just a different kind.", "You are not a Workroach because you are exploited. You are a Workroach because you survived long enough to see it clearly.", "A 4.5 doesn't mean you escaped exploitation. It means you either found somewhere decent — or you built something so indestructible inside yourself that the exploitation couldn't touch you. Both are valid forms of survival.", "The 4.5 Roach is actually the most dangerous one.", "Because they know what good looks like. They've felt what it's like to be treated like a human being at work. And they are no longer willing to pretend that the 1.8 is normal, inevitable, or acceptable.", "The person at 4.5 who watches their colleague at 1.8 — their testimony matters. Their benchmark matters. Their existence as a Revenger proves the Clean House is possible.", "You don't have to be in the Extermination Zone to have something worth saying."] },
  { id: 'believe', title: 'What We Believe', list: ["Work should not cost you your health.", "Silence is not loyalty. It's subsidy.", "Good employers exist. They deserve to be found.", "Exploitation is most dangerous when it's invisible.", "Data doesn't lie. Employers do.", "The gap between your offer letter and your reality is not a misunderstanding. It's a business model.", "You are not a resource. You are not a headcount. You are not an FTE.", "You are a person. Act like it.", "The roach survives everything. So will you."] },
  { id: 'never', title: 'What We Will Never Do', list: ["Take money from an employer to improve their standing on this platform.", "Sell your data.", "Soften a score because someone complained.", "Pretend a 1.8 is a 3.4.", "Forget why we built this."] },
];

export function PhilosophyPage({ navProps, goto, PAGES }) {
  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,80px)' }}>
          <div style={{ fontSize: 'clamp(40px,7vw,64px)', marginBottom: 16, animation: 'crawl 3s ease-in-out infinite', display: 'inline-block' }}><RoachLogo size={72} /></div>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(32px,6vw,64px)', letterSpacing: 4, color: 'var(--amber)', marginBottom: 12 }}>THE WORKROACH PHILOSOPHY</h1>
          <div style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(14px,2vw,18px)', color: 'var(--tdim)', fontStyle: 'italic' }}>Why we exist. What we believe. Who we are scattering.</div>
        </div>

        {SECTIONS.map((s, si) => (
          <div key={s.id} className="fu" style={{ animationDelay: si * .08 + 's', marginBottom: 'clamp(40px,5vw,64px)', paddingBottom: 'clamp(40px,5vw,64px)', borderBottom: si < SECTIONS.length - 1 ? '1px solid var(--bdr)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(22px,3.5vw,36px)', letterSpacing: 3, color: 'var(--amber)', marginBottom: 24 }}>
              {String(si + 1).padStart(2, '0')}. {s.title.toUpperCase()}
            </h2>
            {s.content && s.content.map((p, pi) => (
              <p key={pi} style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(15px,1.8vw,19px)', lineHeight: 1.9, color: p.startsWith('"') ? 'var(--amber)' : 'var(--tmid)', fontStyle: 'italic', marginBottom: 16 }}>{p}</p>
            ))}
            {s.list && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 8 }}>
                {s.list.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0, marginTop: 10 }} />
                    <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(15px,1.8vw,19px)', lineHeight: 1.9, color: 'var(--tmid)', fontStyle: 'italic', margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ textAlign: 'center', paddingTop: 'clamp(40px,5vw,60px)' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(20px,3.5vw,36px)', letterSpacing: 4, color: 'var(--amber)', marginBottom: 8 }}>SURVIVE. EXPOSE. SCATTER THEM.</div>
          <div style={{ fontFamily: 'var(--fm)', fontSize: 'clamp(10px,1.3vw,13px)', color: 'var(--tdim)', letterSpacing: 3 }}>WORKROACH.COM</div>
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
