import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useUserAuth } from '../context/UserAuthContext';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useUserAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Features', path: '/features' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Showcase', path: '/case-studies' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <header className={`galaxy-header ${scrolled ? 'galaxy-header--scrolled' : ''}`}>
            <div className="galaxy-header-pill">
                {/* Brand */}
                <Link to="/" className="galaxy-brand">
                    <svg className="galaxy-brand-icon" width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#galaxy-brand-grad)" />
                        <defs>
                            <linearGradient id="galaxy-brand-grad" x1="2" y1="2" x2="22" y2="22">
                                <stop stopColor="#818CF8" />
                                <stop offset="1" stopColor="#C084FC" />
                            </linearGradient>
                        </defs>
                    </svg>
                    SKYLIX
                </Link>

                {/* Desktop Nav — sits inside the pill */}
                <nav className={`galaxy-nav ${mobileOpen ? 'galaxy-nav--open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`galaxy-nav-link ${location.pathname === link.path ? 'galaxy-nav-link--active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="galaxy-header-actions">
                    <ThemeToggle />
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="galaxy-login-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: 0 }}>Log Out</button>
                    ) : (
                        <Link to="/login" className="galaxy-login-link">Log In</Link>
                    )}
                    <Link to="/signup" className="galaxy-cta-btn">Get Started</Link>

                    {/* Mobile hamburger */}
                    <button
                        className="galaxy-hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`galaxy-hamburger-line ${mobileOpen ? 'open' : ''}`} />
                        <span className={`galaxy-hamburger-line ${mobileOpen ? 'open' : ''}`} />
                        <span className={`galaxy-hamburger-line ${mobileOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>
        </header>
    );
}
