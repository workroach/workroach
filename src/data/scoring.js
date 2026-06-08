import { WORK_MODES, BONUS_MAP, FLEX_MAP, INC_MAP, NOTICE_MAP, EQ_MAP, LEAVE_SC, MEDIANS, getQuadrant, getMedian } from './constants';

export function calcStructScore(audit) {
  const { workMode, days, worksOT, paidOT, unpaidOT, wfhX, trainees, leave, bonus, flex, increment, notice, equipment } = audit;
  const s = [
    WORK_MODES[workMode] || 3,
    days <= 5 ? 5 : days === 6 ? 2 : 1,
    worksOT === false ? 5 : paidOT >= 10 ? 4 : paidOT >= 5 ? 3 : 2,
    worksOT === false ? 5 : unpaidOT === 0 ? 5 : unpaidOT <= 2 ? 4 : unpaidOT <= 5 ? 3 : unpaidOT <= 10 ? 2 : 1,
    worksOT === true ? (wfhX === 0 ? 5 : wfhX <= 1 ? 4 : wfhX <= 3 ? 3 : wfhX <= 5 ? 2 : 1) : 5,
    trainees === 0 ? 5 : trainees <= 1 ? 4 : trainees <= 3 ? 3 : trainees <= 5 ? 2 : 1,
    LEAVE_SC(leave),
    BONUS_MAP[bonus] || 3,
    FLEX_MAP[flex] || 3,
    INC_MAP[increment] || 3,
    NOTICE_MAP[notice] || 3,
    EQ_MAP[equipment] || 3,
  ];
  return s.reduce((a, b) => a + b, 0) / s.length;
}

export function calcPercAvg(answers) {
  const vals = Object.values(answers);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}

export function calcTotalAvg(percAvg, structAvg) {
  return percAvg * 0.6 + structAvg * 0.4;
}

export function calcSalaryINR(salMode, salRange, salAmt, salPeriod, salCur) {
  if (salMode === 'range') {
    const m = {
      'Under ₹3L / $5k': 200000, '₹3–6L / $5–10k': 450000,
      '₹6–12L / $10–20k': 900000, '₹12–25L / $20–40k': 1850000,
      '₹25–50L / $40–80k': 3750000, 'Above ₹50L / $80k+': 6000000,
    };
    return m[salRange] || 0;
  }
  const amt = parseFloat(salAmt) || 0;
  const inr = salCur === 'USD' ? amt * 83 : amt;
  return salPeriod === 'monthly' ? inr * 12 : inr * 52;
}

export function calcSalDisplay(salMode, salRange, salAmt, salPeriod, salCur) {
  if (salMode === 'range') return salRange || '';
  if (!salAmt) return '';
  return (salCur === 'INR' ? '₹' : '$') + parseFloat(salAmt).toLocaleString() + '/' + (salPeriod === 'monthly' ? 'mo' : 'hr');
}

export function calcDerived(audit, salINR, answers) {
  const { days, worksOT, paidOT, unpaidOT, wfhX, trainees } = audit;
  const totalWeeklyHrs = days * 8 + (worksOT ? paidOT + unpaidOT : 0) + (worksOT ? wfhX * days : 0);
  const annualHrs = totalWeeklyHrs * 48;
  const realHourly = salINR && annualHrs ? '₹' + Math.round(salINR / annualHrs).toLocaleString('en-IN') + '/hr' : 'N/A';
  const unpaidAnnualHrs = (worksOT ? unpaidOT : 0) * 48;
  const effectiveHrly = salINR && annualHrs ? salINR / annualHrs : 0;
  const unpaidValue = effectiveHrly && unpaidAnnualHrs ? '₹' + Math.round(effectiveHrly * unpaidAnnualHrs).toLocaleString('en-IN') + '/yr' : 'N/A';
  const percAvg = calcPercAvg(answers);
  const burnoutPct = Math.min(99, Math.round(
    (5 - (answers.psychological || 3)) / 4 * 22 +
    (5 - (answers.boundaries || 3)) / 4 * 22 +
    (worksOT && unpaidOT > 5 ? 28 : worksOT && unpaidOT > 2 ? 14 : 0) +
    (worksOT && wfhX > 3 ? 18 : worksOT && wfhX > 1 ? 9 : 0) +
    (trainees > 3 ? 10 : 0)
  ));
  const structAvg = calcStructScore(audit);
  const totalAvg = percAvg ? calcTotalAvg(percAvg, structAvg) : 0;
  const drainPct = Math.round((1 - (totalAvg - 1) / 4) * 100);
  return { realHourly, unpaidValue, burnoutPct, drainPct, structAvg, percAvg, totalAvg };
}
