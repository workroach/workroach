import { Nav, Footer } from '../components/Nav';
import { Card, Tag, Btn, Pill, Stepper, Select, Toggle } from '../components/ui';
import { INDUSTRIES, FUNCTIONS, SENIORITY, CO_SIZES, CITIES, PROFILE_STAGES } from '../data/constants';

function ProfileProgress({ pct }) {
  const stage = PROFILE_STAGES.slice().reverse().find(s => pct >= s.pct) || PROFILE_STAGES[0];
  const next = PROFILE_STAGES.find(s => pct < s.pct);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, letterSpacing: 2, color: 'var(--amber)' }}>PROFILE STRENGTH</div>
        <div style={{ fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--tdim)' }}>{stage.emoji} {stage.label} · {Math.round(pct)}%</div>
      </div>
      <div style={{ background: 'var(--bdr)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: 'linear-gradient(90deg,var(--adim),var(--amber))', transition: 'width .6s ease', borderRadius: 4 }} />
      </div>
      {next && <div style={{ fontFamily: 'var(--fm)', fontSize: 8, color: 'var(--tdim)', marginTop: 4, letterSpacing: 1 }}>→ {next.pct}% unlocks {next.emoji} {next.label}</div>}
    </div>
  );
}

export function ProfilePage({ profile, audit, navProps, goto, PAGES }) {
  const { name, setName, hasCompany, setHasCompany, company, setCompany, industry, setIndustry, jobFn, setJobFn, seniority, setSeniority, city, setCity, coSize, setCoSize, totalExp, setTotalExp, tenure, setTenure, gender, setGender, firstGen, setFirstGen } = profile;
  const { salMode, setSalMode, salRange, setSalRange, salAmt, setSalAmt, salPeriod, setSalPeriod, salCur, setSalCur } = audit;

  const profFields = [name, hasCompany !== null, industry, jobFn, seniority, city, coSize, tenure > 0, (salMode === 'exact' ? !!salAmt : !!salRange)];
  const profPct = Math.round((profFields.filter(Boolean).length / profFields.length) * 100);
  const canContinue = name.trim() && hasCompany !== null && (hasCompany === false || company.trim());

  const getSalINRPreview = () => {
    const amt = parseFloat(salAmt) || 0;
    const inr = salCur === 'USD' ? amt * 83 : amt;
    const annual = salPeriod === 'monthly' ? inr * 12 : inr * 52;
    return '₹' + Math.round(annual / 12).toLocaleString('en-IN') + '/month';
  };

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />
        <div className="fu" style={{ marginBottom: 22 }}>
          <Tag>Step 1 of 3 · Your Profile</Tag>
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,4vw,40px)', letterSpacing: 2, color: 'var(--text)' }}>WHO ARE YOU, ROACH?</h2>
          <p style={{ fontFamily: 'var(--fs)', color: 'var(--tdim)', marginTop: 7, fontSize: 14, fontStyle: 'italic' }}>The more you fill in, the sharper your analysis.</p>
        </div>

        <div className="fu" style={{ marginBottom: 12 }}><Card><ProfileProgress pct={profPct} /></Card></div>

        {[
          { label: 'Your Name', node: <input value={name} onChange={e => setName(e.target.value)} placeholder="What do they call you?" style={{ width: '100%', padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 15, fontStyle: 'italic' }} /> },
          { label: 'Submitting for a specific company?', node: <Toggle value={hasCompany} onChange={setHasCompany} yes="Yes — name them" no="Stay anonymous" /> },
        ].map(({ label, node }, i) => (
          <div key={label} className="fu" style={{ animationDelay: i * .05 + 's', marginBottom: 10 }}>
            <Card><Tag>{label}</Tag>{node}</Card>
          </div>
        ))}

        {hasCompany === true && (
          <div className="fu" style={{ marginBottom: 10 }}>
            <Card>
              <Tag>Company Name</Tag>
              <input value={company} onChange={e => setCompany(e.target.value.slice(0, 60))} placeholder="Company or organisation" style={{ width: '100%', padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fs)', fontSize: 15, fontStyle: 'italic' }} />
            </Card>
          </div>
        )}

        {[
          { label: 'Industry / Sector', node: <Select options={INDUSTRIES} value={industry} onChange={setIndustry} placeholder="Select industry..." /> },
          { label: 'Job Function', node: <Select options={FUNCTIONS} value={jobFn} onChange={setJobFn} placeholder="Select function..." /> },
          { label: 'Seniority Level', node: <Select options={SENIORITY} value={seniority} onChange={setSeniority} placeholder="Select level..." /> },
          { label: 'City / Region', node: <Select options={CITIES} value={city} onChange={setCity} placeholder="Select city..." /> },
          { label: 'Company Size', node: <Select options={CO_SIZES} value={coSize} onChange={setCoSize} placeholder="Number of employees..." /> },
          { label: 'Total Work Experience', node: <Stepper value={totalExp} onChange={setTotalExp} min={0} max={45} unit="years total" /> },
          { label: 'Years at Current Company', node: <Stepper value={tenure} onChange={setTenure} min={0} max={40} unit="years here" /> },
          { label: 'Gender (optional)', node: <Select options={['Male', 'Female', 'Non-binary', 'Prefer not to say']} value={gender} onChange={setGender} placeholder="Optional..." /> },
          { label: 'First-generation professional?', sub: 'First in your family in a professional environment', node: <Toggle value={firstGen} onChange={setFirstGen} yes="Yes" no="No" /> },
        ].map(({ label, sub, node }, i) => (
          <div key={label} className="fu" style={{ animationDelay: i * .04 + 's', marginBottom: 10 }}>
            <Card>
              <Tag>{label}</Tag>
              {sub && <p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 13, color: 'var(--tdim)', marginBottom: 9, lineHeight: 1.6 }}>{sub}</p>}
              {node}
            </Card>
          </div>
        ))}

        <div className="fu" style={{ marginBottom: 10 }}>
          <Card>
            <Tag>Your Salary</Tag>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              {[{ v: 'range', l: 'Select Range' }, { v: 'exact', l: 'Enter Exact' }].map(o => (
                <div key={o.v} onClick={() => setSalMode(o.v)} style={{ flex: 1, padding: '9px', borderRadius: 7, textAlign: 'center', cursor: 'pointer', border: salMode === o.v ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: salMode === o.v ? 'var(--aglow)' : 'transparent', fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: 1, color: salMode === o.v ? 'var(--amber)' : 'var(--tdim)' }}>{o.l}</div>
              ))}
            </div>
            {salMode === 'range' && (
              <Select options={['Under ₹3L / $5k', '₹3–6L / $5–10k', '₹6–12L / $10–20k', '₹12–25L / $20–40k', '₹25–50L / $40–80k', 'Above ₹50L / $80k+', 'Prefer not to say']} value={salRange} onChange={setSalRange} placeholder="Select range..." />
            )}
            {salMode === 'exact' && (
              <div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  {[{ v: 'INR', l: '₹ INR' }, { v: 'USD', l: '$ USD' }].map(o => (
                    <div key={o.v} onClick={() => setSalCur(o.v)} style={{ flex: 1, padding: '8px', borderRadius: 7, textAlign: 'center', cursor: 'pointer', border: salCur === o.v ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: salCur === o.v ? 'var(--aglow)' : 'transparent', fontFamily: 'var(--fm)', fontSize: 11, color: salCur === o.v ? 'var(--amber)' : 'var(--tdim)' }}>{o.l}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  {[{ v: 'monthly', l: 'Per Month' }, { v: 'hourly', l: 'Per Hour' }].map(o => (
                    <div key={o.v} onClick={() => setSalPeriod(o.v)} style={{ flex: 1, padding: '8px', borderRadius: 7, textAlign: 'center', cursor: 'pointer', border: salPeriod === o.v ? '1.5px solid var(--amber)' : '1.5px solid var(--bdr)', background: salPeriod === o.v ? 'var(--aglow)' : 'transparent', fontFamily: 'var(--fm)', fontSize: 11, color: salPeriod === o.v ? 'var(--amber)' : 'var(--tdim)' }}>{o.l}</div>
                  ))}
                </div>
                <input value={salAmt} onChange={e => setSalAmt(e.target.value.replace(/[^0-9.]/g, ''))} placeholder={`Enter ${salCur === 'INR' ? '₹' : '$'} amount ${salPeriod === 'monthly' ? 'per month' : 'per hour'}`} type="number" style={{ width: '100%', padding: '10px 13px', background: 'var(--inp)', border: '1px solid var(--bdr)', borderRadius: 7, color: 'var(--text)', fontFamily: 'var(--fm)', fontSize: 14 }} />
                {salAmt && <div style={{ marginTop: 7, fontFamily: 'var(--fm)', fontSize: 10, color: 'var(--amber)', letterSpacing: 1 }}>≈ {getSalINRPreview()} annual equivalent</div>}
              </div>
            )}
          </Card>
        </div>

        <div className="fu" style={{ marginTop: 6 }}>
          <Btn onClick={() => goto(PAGES.STRUCTURAL)} disabled={!canContinue}>CONTINUE TO WORK AUDIT →</Btn>
          <button onClick={() => goto(PAGES.INTRO)} style={{ background: 'transparent', border: 'none', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', marginTop: 11, width: '100%', letterSpacing: 1 }}>← Back</button>
        </div>
      </div>
    </div>
  );
}
