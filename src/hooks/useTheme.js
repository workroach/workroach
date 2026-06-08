import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('wr-theme') || 'dark');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('wr-theme', theme);
  }, [theme]);

  return [theme, setTheme];
}
