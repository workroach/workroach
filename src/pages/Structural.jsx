import { Nav } from '../components/Nav';
import { Card, Tag, Btn, Pill, Stepper, Toggle } from '../components/ui';
import { WORK_MODES, BONUS_MAP, FLEX_MAP, INC_MAP, NOTICE_MAP, EQ_MAP } from '../data/constants';

export function StructuralPage({ audit, navProps, goto, PAGES }) {
  const { workMode, setWorkMode, days, setDays, worksOT, setWorksOT, paidOT, setPaidOT, unpaidOT, setUnpaidOT, wfhX, setWfhX, trainees, setTrainees, leave, setLeave, bonus, setBonus, flex, setFlex, increment, setIncrement, notice, setNotice, equipment, setEquipment } = audit;

  const canContinue = workMode && bonus && flex && worksOT !== null;

  return (
    <div className="page-wrap">
      <div className="page-content">
        <Nav {...navProps} />
        <div className="fu" style={{ marginBottom: 22 }}>
          <Tag>Step 2 of 3 · Work Reality Audit</Tag>
          <h2 style={{ fontFamily: 'var(--fd)', fontSize: 'clamp(28px,4vw,40px)', letterSpacing: 2, color: 'var(--text)' }}>THE STRUCTURAL FACTS</h2>
          <p style={{ fontFamily: 'var(--fs)', color: 'var(--tdim)', marginTop: 7, fontSize: 14, fontStyle: 'italic' }}>This is where sugarcoating goes to die.</p>
        </div>

        {[
          { label: 'Work Mode', node: <Pill options={Object.keys(WORK_MODES)} value={workMode} onChange={setWorkMode} /> },
          { label: 'Working Days Per Week', node: <Stepper value={days} onChange={setDays} min={1} max={7} unit="days/week" /> },
        ].map(({ label, node }, i) => (
          <div key={label} className="fu" style={{ animationDelay: i * .05 + 's', marginBottom: 10 }}>
            <Card><Tag>{label}</Tag>{node}</Card>
          </div>
        ))}

        <div className="fu" style={{ animationDelay: '.1s', marginBottom: 10 }}>
          <Card><Tag>Do you work extra hours beyond your agreed scope?</Tag><Toggle value={worksOT} onChange={setWorksOT} yes="Yes" no="No — I stick to my hours" /></Card>
        </div>

        {worksOT === true && (
          <>
            <div className="fu" style={{ marginBottom: 10 }}>
              <Card><Tag>Paid Extra Hours</Tag><p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 13, color: 'var(--tdim)', marginBottom: 10, lineHeight: 1.6 }}>How many of those extra hours per week are actually paid?</p><Stepper value={paidOT} onChange={setPaidOT} min={0} max={40} unit="hrs/week paid" /></Card>
            </div>
            <div className="fu" style={{ marginBottom: 10 }}>
              <Card><Tag>Expected Unpaid Extra Hours</Tag><p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 13, color: 'var(--tdim)', marginBottom: 10, lineHeight: 1.6 }}>Hours per week expected beyond your scope — unpaid, unacknowledged, just part of the culture.</p><Stepper value={unpaidOT} onChange={setUnpaidOT} min={0} max={40} unit="hrs/week unpaid" /></Card>
            </div>
            <div className="fu" style={{ marginBottom: 10 }}>
              <Card><Tag>Additional Hours From Home</Tag><p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 13, color: 'var(--tdim)', marginBottom: 10, lineHeight: 1.6 }}>On top of all the above — extra hours worked from home outside office time.</p><Stepper value={wfhX} onChange={setWfhX} min={0} max={12} unit="hrs/day extra" /></Card>
            </div>
          </>
        )}

        {[
          { label: 'Trainees or Juniors You Manage', sub: 'With or without a formal title or allowance', node: <Stepper value={trainees} onChange={setTrainees} min={0} max={30} unit="people" /> },
          { label: 'Annual Leave Days', node: <Stepper value={leave} onChange={setLeave} min={0} max={60} unit="days/year" /> },
          { label: 'Bonus Structure', node: <Pill options={Object.keys(BONUS_MAP)} value={bonus} onChange={setBonus} /> },
          { label: 'Schedule Flexibility', node: <Pill options={Object.keys(FLEX_MAP)} value={flex} onChange={setFlex} /> },
          { label: 'Last Salary Increment', node: <Pill options={Object.keys(INC_MAP)} value={increment} onChange={setIncrement} /> },
          { label: 'Notice Period', node: <Pill options={Object.keys(NOTICE_MAP)} value={notice} onChange={setNotice} /> },
          { label: 'Equipment & Tools Provided', node: <Pill options={Object.keys(EQ_MAP)} value={equipment} onChange={setEquipment} /> },
        ].map(({ label, sub, node }, i) => (
          <div key={label} className="fu" style={{ animationDelay: i * .04 + 's', marginBottom: 10 }}>
            <Card>
              <Tag>{label}</Tag>
              {sub && <p style={{ fontFamily: 'var(--fs)', fontStyle: 'italic', fontSize: 13, color: 'var(--tdim)', marginBottom: 9, lineHeight: 1.6 }}>{sub}</p>}
              {node}
            </Card>
          </div>
        ))}

        <div className="fu" style={{ animationDelay: '.5s', marginTop: 6 }}>
          <Btn onClick={() => goto(PAGES.QUESTIONS)} disabled={!canContinue}>CONTINUE TO PERCEPTION AUDIT →</Btn>
          <button onClick={() => goto(PAGES.PROFILE)} style={{ background: 'transparent', border: 'none', color: 'var(--tdim)', fontFamily: 'var(--fm)', fontSize: 10, cursor: 'pointer', marginTop: 11, width: '100%', letterSpacing: 1 }}>← Back</button>
        </div>
      </div>
    </div>
  );
}
