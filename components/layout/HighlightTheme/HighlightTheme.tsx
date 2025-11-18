'use client';

import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export const HighlightTheme: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    // Remove any existing highlight.js theme
    const existingLight = document.getElementById('hljs-theme-light');
    const existingDark = document.getElementById('hljs-theme-dark');

    if (existingLight) existingLight.remove();
    if (existingDark) existingDark.remove();

    // Create and inject the appropriate theme
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = theme === 'dark' ? 'hljs-theme-dark' : 'hljs-theme-light';

    if (theme === 'dark') {
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
    } else {
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }

    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, [theme]);

  return null;
};
