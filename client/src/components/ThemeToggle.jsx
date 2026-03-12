import React, { useState, useEffect } from 'react';

/**
 * ThemeToggle — Animated sun/moon toggle for dark/light theme switching.
 * Persists preference to localStorage and respects OS color scheme on first visit.
 */
export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        const stored = localStorage.getItem('skylix-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('skylix-theme', theme);
    }, [theme]);

    const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    const isLight = theme === 'light';

    return (
        <button
            onClick={toggle}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            className="theme-toggle"
            style={{
                position: 'relative',
                width: '48px',
                height: '26px',
                borderRadius: '99px',
                border: 'none',
                cursor: 'pointer',
                background: isLight
                    ? 'linear-gradient(135deg, #60a5fa, #3b82f6)'
                    : 'linear-gradient(135deg, #1e1b4b, #312e81)',
                transition: 'background 0.4s ease',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                boxShadow: isLight
                    ? '0 2px 8px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                    : '0 2px 8px rgba(30,27,75,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
                outline: 'none'
            }}
        >
            {/* Track indicator knob */}
            <span
                style={{
                    position: 'absolute',
                    top: '3px',
                    left: isLight ? '24px' : '3px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: isLight ? '#fbbf24' : '#e2e8f0',
                    transition: 'all 0.35s cubic-bezier(0.68, -0.2, 0.27, 1.15)',
                    boxShadow: isLight
                        ? '0 0 8px rgba(251,191,36,0.6), 0 0 16px rgba(251,191,36,0.3)'
                        : '0 0 6px rgba(226,232,240,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {/* Sun / Moon icon */}
                {isLight ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                        <line x1="1" y1="12" x2="3" y2="12" />
                        <line x1="21" y1="12" x2="23" y2="12" />
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#475569" stroke="none">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </span>
        </button>
    );
}
