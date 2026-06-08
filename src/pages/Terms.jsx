import { Nav, Footer } from '../components/Nav';

const SECTIONS = [
  { t: '1. Who We Are', c: 'Workroach is a workplace audit and accountability platform. We provide tools for employees to score, document, and share their workplace experiences. We are not a legal firm, HR consultancy, or government body. Nothing on this platform constitutes legal advice.' },
  { t: '2. User Submissions', c: 'All Roach Receipts, audit scores, and Fight It submissions are user-generated content. Workroach does not verify the accuracy of user submissions unless explicitly marked as Roach Verified. Content marked as Roach Talk represents personal experience and community opinion — not verified fact. Users submitting false, misleading, or defamatory content bear full legal responsibility for their submissions. Workroach reserves the right to remove any content at any time without notice.' },
  { t: '3. Roach Talk vs Roach Verified', c: 'Roach Talk is unverified community experience. It represents what individuals say happened to them. It is opinion, not fact. Roach Verified means Workroach has reviewed submitted evidence and determined it appears relevant and authentic. It does not mean the content is legally authenticated or that Workroach endorses the claim as true. Both are clearly labelled on the platform.' },
  { t: '4. The No-Names Rule', c: 'Submissions must not name specific individuals. Workroach will reject any receipt that identifies a person by name, role, or any combination of details that makes them identifiable. This rule protects both the accused and the platform. Violations result in immediate rejection and may result in account suspension.' },
  { t: '5. Fight It — Legal Information Disclaimer', c: "The Fight It feature provides general information about labour rights and available processes. It does not constitute legal advice. Workroach is not a lawyer and does not create a lawyer-client relationship. Always consult a qualified legal professional for advice specific to your situation. The Roach Lawyer network connects users with independent lawyers — Workroach takes no responsibility for their advice or conduct." },
  { t: '6. Privacy & Data', c: "We collect only what you give us — your email address and audit responses. We do not sell your data. Ever. Your email is used to send you your audit report and, if you subscribed, the monthly Infestation Index. Audit responses are stored anonymously. Company names are never linked to individual email addresses in our public-facing systems. You can request deletion of your data at any time by emailing workroach.admin@gmail.com." },
  { t: '7. Intermediary Liability', c: 'Workroach operates as an intermediary platform under the Information Technology Act 2000 and IT Rules 2021. We do not editorially endorse user-generated content. We maintain a grievance mechanism and respond to valid takedown requests within the timeframes specified by applicable law. Users are solely responsible for content they submit.' },
  { t: '8. Removal Requests', c: 'Any individual or organisation that believes a submission violates these terms may submit a removal request to workroach.admin@gmail.com with the subject line REMOVAL REQUEST. Include the specific content in question and the reason for the request. Workroach will review and respond within 7 working days. Our decision is final but we document every decision made.' },
  { t: '9. Grievance Officer', c: 'The designated Grievance Officer for Workroach can be reached at workroach.admin@gmail.com. All formal complaints, removal requests, and legal notices should be directed here.' },
  { t: '10. Changes to These Terms', c: 'We may update these terms as the platform evolves. Material changes will be communicated via the platform. Continued use of Workroach after changes constitutes acceptance of the updated terms.' },
];

export function TermsPage({ navProps, goto, PAGES }) {
  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,5vw,56px)' }}>
          <h1 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,5vw,52px)', letterSpacing: 4, color: 'var(--amber)', marginBottom: 10 }}>TERMS & PRIVACY POLICY</h1>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', color: 'var(--tdim)', fontStyle: 'italic' }}>Last updated: June 2026 · We don't sell data. Ever.</p>
        </div>

        {SECTIONS.map((s, i) => (
          <div key={i} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: i < SECTIONS.length - 1 ? '1px solid var(--bdr)' : 'none' }}>
            <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(16px,2.5vw,22px)', letterSpacing: 2, color: 'var(--amber)', marginBottom: 12 }}>{s.t}</h2>
            <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,16px)', lineHeight: 1.9, color: 'var(--tmid)', fontStyle: 'italic' }}>{s.c}</p>
          </div>
        ))}

        <div style={{ marginTop: 32, padding: 'clamp(16px,2.5vw,24px)', background: 'var(--aglow)', border: '1px solid var(--bhi)', borderRadius: 10, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(16px,2.5vw,22px)', letterSpacing: 2, color: 'var(--amber)', marginBottom: 8 }}>QUESTIONS OR CONCERNS?</div>
          <p style={{ fontFamily: 'var(--fs)', fontSize: 'clamp(13px,1.5vw,15px)', color: 'var(--tmid)', fontStyle: 'italic' }}>Contact us at <strong>workroach.admin@gmail.com</strong></p>
        </div>

        <Footer onTerms={() => goto(PAGES.TERMS)} onHome={() => goto(PAGES.INTRO)} />
      </div>
    </div>
  );
}
