import { useState, useEffect } from 'react';
import { ThemeToggle } from './components/Nav';
import { WelcomeModal } from './components/WelcomeModal';
import { generateAvatarUrl } from './components/RoachAvatar';
import { useProfile, useAudit } from './hooks/useProfile';
import { calcStructScore, calcPercAvg, calcTotalAvg, calcSalaryINR, calcSalDisplay, calcDerived } from './data/scoring';
import { getQuadrant, getMedian } from './data/constants';

// Pages
import { IdentityReveal } from './pages/IdentityReveal';
import { IntroPage } from './pages/Intro';
import { ProfilePage } from './pages/Profile';
import { StructuralPage } from './pages/Structural';
import { QuestionsPage } from './pages/Questions';
import { ResultsPage } from './pages/Results';
import { RoachProfilePage } from './pages/RoachProfile';
import { PhilosophyPage } from './pages/Philosophy';
import { ParliamentPage } from './pages/Parliament';
import { WallPage } from './pages/Wall';
import { TermsPage } from './pages/Terms';

import './styles/themes.css';

// EmailJS
import emailjs from '@emailjs/browser';
import { EMAILJS_KEY } from './data/constants';
emailjs.init(EMAILJS_KEY);

const PAGES = {
  INTRO: 'intro',
  PROFILE: 'profile',
  STRUCTURAL: 'structural',
  QUESTIONS: 'questions',
  RESULTS: 'results',
  ROACH_PROFILE: 'roach_profile',
  PHILOSOPHY: 'philosophy',
  PARLIAMENT: 'parliament',
  WALL: 'wall',
  TERMS: 'terms',
};

export default function App() {
  const [page, setPage] = useState(() => localStorage.getItem('wr-page') || PAGES.INTRO);
  const [showWelcome, setShowWelcome] = useState(() => {
    // Email is mandatory — no email means show welcome every time
    const email = localStorage.getItem('wr-email');
    return !email;
  });
  const [roachName, setRoachName] = useState(() => localStorage.getItem('wr-roachName') || '');
  const [showIdentityReveal, setShowIdentityReveal] = useState(false);
  const [roachLoading, setRoachLoading] = useState(false);

  const profile = useProfile();
  const audit = useAudit();

  useEffect(() => {
    localStorage.setItem('wr-page', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const goto = (p) => setPage(p);

  // Computed values
  const salINR = calcSalaryINR(audit.salMode, audit.salRange, audit.salAmt, audit.salPeriod, audit.salCur);
  const salDisplay = calcSalDisplay(audit.salMode, audit.salRange, audit.salAmt, audit.salPeriod, audit.salCur);
  const structAvg = calcStructScore(audit);
  const percAvg = calcPercAvg(audit.answers);
  const totalAvg = percAvg ? calcTotalAvg(percAvg, structAvg) : 0;
  const quadrant = getQuadrant(totalAvg);
  const median = profile.industry && profile.seniority ? getMedian(profile.industry, profile.seniority) : getMedian('default', 'Mid-level (2–5 yrs)');
  const derived = calcDerived(audit, salINR, audit.answers);

  const handleSignup = ({ email, name, gender, avatarUrl }) => {
    profile.setEmail(email);
    if (name) profile.setName(name);
    if (gender) profile.setGender(gender);
    if (avatarUrl) profile.setAvatar(avatarUrl);
    if (!profile.avatar && name) {
      profile.setAvatar(generateAvatarUrl(name, gender));
    }
    localStorage.setItem('wr-welcomed', '1');
    localStorage.setItem('wr-memberSince', new Date().toISOString());
    setShowWelcome(false);
  };

  const handleSkip = () => {
    // No anonymous access — do nothing
    // Keep modal open
  };

  const handleAuditComplete = async (finalAnswers) => {
    audit.setAnswers(finalAnswers);
    profile.setAuditCount(prev => prev + 1);
    goto(PAGES.RESULTS);
    // Show identity reveal if first audit and not yet done
    if (!profile.identityComplete) {
      setTimeout(() => setShowIdentityReveal(true), 1500);
    }

    // Generate roach name
    setRoachLoading(true);
    const { generateRoachName } = await import('./components/RoachName');
    const pAvg = calcPercAvg(finalAnswers);
    const sAvg = calcStructScore(audit);
    const tAvg = calcTotalAvg(pAvg, sAvg);
    const q = getQuadrant(tAvg);
    const name = await generateRoachName(
      { industry: profile.industry, seniority: profile.seniority, city: profile.city },
      q,
      finalAnswers
    );
    setRoachName(name);
    localStorage.setItem('wr-roachName', name);
    setRoachLoading(false);
  };

  const handleIdentityComplete = ({ name, soulSeed, soulUrl, publicUrl, publicSeed }) => {
    if (name) profile.setName(name);
    if (soulUrl) profile.setSoulUrl(soulUrl);
    if (soulSeed) profile.setSoulSeed(soulSeed);
    if (publicUrl) profile.setAvatar(publicUrl);
    if (publicSeed) profile.setPublicSeed(publicSeed);
    profile.setIdentityComplete(true);
    setShowIdentityReveal(false);
  };

  const resetAll = () => {
    Object.keys(localStorage).filter(k => k.startsWith('wr-')).forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  const navProps = {
    onHome: () => goto(PAGES.INTRO),
    onPhilosophy: () => goto(PAGES.PHILOSOPHY),
    onParliament: () => goto(PAGES.PARLIAMENT),
    onWall: () => goto(PAGES.WALL),
  };

  const commonProps = {
    profile, audit, salINR, salDisplay,
    structAvg, percAvg, totalAvg, quadrant, median, derived,
    roachName, roachLoading, navProps,
    goto, PAGES, resetAll,
  };

  return (
    <>
      <div className="noise" />
      <div className="scanline" />
      <ThemeToggle />
      {showWelcome && <WelcomeModal onSignup={handleSignup} onSkip={handleSkip} />}
      {showIdentityReveal && <IdentityReveal profile={{ name: profile.name, industry: profile.industry, city: profile.city, seniority: profile.seniority, gender: profile.gender }} totalAvg={totalAvg} onComplete={handleIdentityComplete} />}

      {page === PAGES.INTRO && <IntroPage {...commonProps} onShowWelcome={() => setShowWelcome(true)} />}
      {page === PAGES.PROFILE && <ProfilePage {...commonProps} />}
      {page === PAGES.STRUCTURAL && <StructuralPage {...commonProps} />}
      {page === PAGES.QUESTIONS && <QuestionsPage {...commonProps} onComplete={handleAuditComplete} />}
      {page === PAGES.RESULTS && <ResultsPage {...commonProps} />}
      {page === PAGES.ROACH_PROFILE && <RoachProfilePage {...commonProps} />}
      {page === PAGES.PHILOSOPHY && <PhilosophyPage {...commonProps} />}
      {page === PAGES.PARLIAMENT && <ParliamentPage {...commonProps} />}
      {page === PAGES.WALL && <WallPage {...commonProps} />}
      {page === PAGES.TERMS && <TermsPage {...commonProps} />}
    </>
  );
}
