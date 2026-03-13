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
                    <img src="/logo.png" alt="Skylix Logo" className="galaxy-brand-icon" />
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
                    <div className="galaxy-mobile-auth">
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="galaxy-nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit', padding: '12px 14px', textAlign: 'left', width: '100%' }}>Log Out</button>
                        ) : (
                            <Link to="/login" className="galaxy-nav-link" onClick={() => setMobileOpen(false)}>Log In</Link>
                        )}
                        <Link to="/signup" className="galaxy-cta-btn" style={{ width: '100%', textAlign: 'center', marginTop: '16px' }} onClick={() => setMobileOpen(false)}>Get Started</Link>
                    </div>
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
