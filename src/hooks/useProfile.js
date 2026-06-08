import { useState, useEffect } from 'react';

const ls = (k, d) => { const v = localStorage.getItem('wr-' + k); return v === null ? d : v; };
const lsb = (k) => { const v = localStorage.getItem('wr-' + k); return v === null ? null : v === 'true'; };
const lsi = (k, d) => { const v = localStorage.getItem('wr-' + k); return v === null ? d : parseInt(v); };
const lsj = (k, d) => { try { const v = localStorage.getItem('wr-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };

export function useProfile() {
  const [name, setName] = useState(() => ls('name', ''));
  const [soulUrl, setSoulUrl] = useState(() => ls('soulUrl', ''));
  const [soulSeed, setSoulSeed] = useState(() => ls('soulSeed', ''));
  const [publicSeed, setPublicSeed] = useState(() => ls('publicSeed', ''));
  const [identityComplete, setIdentityComplete] = useState(() => ls('identityComplete', '') === 'true');
  const [email, setEmail] = useState(() => ls('email', ''));
  const [avatar, setAvatar] = useState(() => ls('avatar', ''));
  const [hasCompany, setHasCompany] = useState(() => lsb('hasCompany'));
  const [company, setCompany] = useState(() => ls('company', ''));
  const [industry, setIndustry] = useState(() => ls('industry', ''));
  const [jobFn, setJobFn] = useState(() => ls('jobFn', ''));
  const [seniority, setSeniority] = useState(() => ls('seniority', ''));
  const [city, setCity] = useState(() => ls('city', ''));
  const [coSize, setCoSize] = useState(() => ls('coSize', ''));
  const [totalExp, setTotalExp] = useState(() => lsi('totalExp', 1));
  const [tenure, setTenure] = useState(() => lsi('tenure', 1));
  const [gender, setGender] = useState(() => ls('gender', ''));
  const [firstGen, setFirstGen] = useState(() => lsb('firstGen'));
  const [memberSince] = useState(() => ls('memberSince', ''));
  const [auditCount, setAuditCount] = useState(() => lsi('auditCount', 0));
  const [badges, setBadges] = useState(() => lsj('badges', []));

  useEffect(() => {
    const data = { name, email, avatar, soulUrl, soulSeed, publicSeed, identityComplete: String(identityComplete), hasCompany: String(hasCompany), company, industry, jobFn, seniority, city, coSize, totalExp: String(totalExp), tenure: String(tenure), gender, firstGen: String(firstGen), auditCount: String(auditCount), badges: JSON.stringify(badges) };
    Object.entries(data).forEach(([k, v]) => localStorage.setItem('wr-' + k, v));
  }, [name, email, avatar, soulUrl, soulSeed, publicSeed, identityComplete, hasCompany, company, industry, jobFn, seniority, city, coSize, totalExp, tenure, gender, firstGen, auditCount, badges]);

  const addBadge = (badgeId) => {
    if (!badges.includes(badgeId)) setBadges(prev => [...prev, badgeId]);
  };

  // Auto-assign Founding Roach to first 500 members
  useEffect(() => {
    const memberSince = localStorage.getItem('wr-memberSince');
    const welcomed = localStorage.getItem('wr-welcomed');
    if (welcomed && memberSince && !badges.includes('founding')) {
      // Grant founding roach — first 500, we trust the user for now
      setBadges(prev => prev.includes('founding') ? prev : [...prev, 'founding']);
    }
  }, []);

  return {
    name, setName, email, setEmail, avatar, setAvatar,
    soulUrl, setSoulUrl, soulSeed, setSoulSeed, publicSeed, setPublicSeed,
    identityComplete, setIdentityComplete,
    hasCompany, setHasCompany, company, setCompany,
    industry, setIndustry, jobFn, setJobFn,
    seniority, setSeniority, city, setCity,
    coSize, setCoSize, totalExp, setTotalExp,
    tenure, setTenure, gender, setGender,
    firstGen, setFirstGen, memberSince,
    auditCount, setAuditCount, badges, setBadges, addBadge,
  };
}

export function useAudit() {
  const ls = (k, d) => { const v = localStorage.getItem('wr-' + k); return v === null ? d : v; };
  const lsb = (k) => { const v = localStorage.getItem('wr-' + k); return v === null ? null : v === 'true'; };
  const lsi = (k, d) => { const v = localStorage.getItem('wr-' + k); return v === null ? d : parseInt(v); };
  const lsj = (k, d) => { try { const v = localStorage.getItem('wr-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };

  const [salMode, setSalMode] = useState(() => ls('salMode', 'range'));
  const [salRange, setSalRange] = useState(() => ls('salRange', ''));
  const [salAmt, setSalAmt] = useState(() => ls('salAmt', ''));
  const [salPeriod, setSalPeriod] = useState(() => ls('salPeriod', 'monthly'));
  const [salCur, setSalCur] = useState(() => ls('salCur', 'INR'));
  const [workMode, setWorkMode] = useState(() => ls('workMode', ''));
  const [days, setDays] = useState(() => lsi('days', 5));
  const [worksOT, setWorksOT] = useState(() => lsb('worksOT'));
  const [paidOT, setPaidOT] = useState(() => lsi('paidOT', 0));
  const [unpaidOT, setUnpaidOT] = useState(() => lsi('unpaidOT', 0));
  const [wfhX, setWfhX] = useState(() => lsi('wfhX', 0));
  const [trainees, setTrainees] = useState(() => lsi('trainees', 0));
  const [leave, setLeave] = useState(() => lsi('leave', 15));
  const [bonus, setBonus] = useState(() => ls('bonus', ''));
  const [flex, setFlex] = useState(() => ls('flex', ''));
  const [increment, setIncrement] = useState(() => ls('increment', ''));
  const [notice, setNotice] = useState(() => ls('notice', ''));
  const [equipment, setEquipment] = useState(() => ls('equipment', ''));
  const [answers, setAnswers] = useState(() => lsj('answers', {}));

  useEffect(() => {
    const data = { salMode, salRange, salAmt, salPeriod, salCur, workMode, days: String(days), worksOT: String(worksOT), paidOT: String(paidOT), unpaidOT: String(unpaidOT), wfhX: String(wfhX), trainees: String(trainees), leave: String(leave), bonus, flex, increment, notice, equipment, answers: JSON.stringify(answers) };
    Object.entries(data).forEach(([k, v]) => localStorage.setItem('wr-' + k, v));
  }, [salMode, salRange, salAmt, salPeriod, salCur, workMode, days, worksOT, paidOT, unpaidOT, wfhX, trainees, leave, bonus, flex, increment, notice, equipment, answers]);

  return {
    salMode, setSalMode, salRange, setSalRange, salAmt, setSalAmt,
    salPeriod, setSalPeriod, salCur, setSalCur,
    workMode, setWorkMode, days, setDays,
    worksOT, setWorksOT, paidOT, setPaidOT, unpaidOT, setUnpaidOT,
    wfhX, setWfhX, trainees, setTrainees, leave, setLeave,
    bonus, setBonus, flex, setFlex, increment, setIncrement,
    notice, setNotice, equipment, setEquipment,
    answers, setAnswers,
  };
}
