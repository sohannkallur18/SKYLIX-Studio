import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

export default function Footer() {
    const { openChat } = useChat();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 4000);
        }
    };

    return (
        <footer className="galaxy-footer">
            {/* ── Top CTA Banner ── */}
            <div className="galaxy-footer-cta">
                <div className="container">
                    <div className="galaxy-footer-cta-inner">
                        <div className="galaxy-footer-cta-text">
                            <h3 className="galaxy-footer-cta-title">Ready to ship production-grade systems?</h3>
                            <p className="galaxy-footer-cta-desc">
                                Launch your project today and see production results in weeks, not quarters.
                            </p>
                        </div>
                        <div className="galaxy-footer-cta-actions">
                            <Link to="/contact" className="galaxy-footer-cta-btn galaxy-footer-cta-btn--primary">
                                Start Your Project
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                            <button onClick={() => openChat('sales')} className="galaxy-footer-cta-btn galaxy-footer-cta-btn--ghost">
                                Book a Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Footer Grid ── */}
            <div className="container">
                <div className="galaxy-footer-grid">
                    {/* Brand Column */}
                    <div className="galaxy-footer-brand">
                        <Link to="/" className="galaxy-brand" style={{ marginBottom: '16px' }}>
                            <img src="/logo.png" alt="Skylix Logo" className="galaxy-brand-icon" style={{ width: '28px', height: '28px' }} />
                            SKYLIX
                        </Link>
                        <p className="galaxy-footer-tagline">
                            AI-native software engineering. Custom platforms, autonomous systems, and intelligent automation infrastructure for high-growth organizations.
                        </p>

                        {/* Newsletter */}
                        <form className="galaxy-footer-newsletter" onSubmit={handleNewsletter}>
                            <div className="galaxy-footer-newsletter-input-wrap">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="galaxy-footer-newsletter-input"
                                    required
                                />
                                <button type="submit" className="galaxy-footer-newsletter-btn" disabled={subscribed}>
                                    {subscribed ? '✓' : '→'}
                                </button>
                            </div>
                            {subscribed && (
                                <span className="galaxy-footer-newsletter-success">Thanks! You're subscribed.</span>
                            )}
                        </form>

                        {/* Social Links */}
                        <div className="galaxy-footer-socials">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="galaxy-footer-social" aria-label="LinkedIn">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="galaxy-footer-social" aria-label="GitHub">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="galaxy-footer-social" aria-label="X / Twitter">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Services Column */}
                    <div className="galaxy-footer-col">
                        <h4 className="galaxy-footer-col-title">Services</h4>
                        <Link to="/services/software-development" className="galaxy-footer-link">Software Development</Link>
                        <Link to="/services/ai-solutions" className="galaxy-footer-link">AI Solutions</Link>
                        <Link to="/services/automation" className="galaxy-footer-link">Automation</Link>
                        <Link to="/services/consulting" className="galaxy-footer-link">Consulting</Link>
                    </div>

                    {/* Company Column */}
                    <div className="galaxy-footer-col">
                        <h4 className="galaxy-footer-col-title">Company</h4>
                        <Link to="/about" className="galaxy-footer-link">About</Link>
                        <Link to="/case-studies" className="galaxy-footer-link">Case Studies</Link>
                        <Link to="/careers" className="galaxy-footer-link">Careers</Link>
                        <Link to="/blog" className="galaxy-footer-link">Blog</Link>
                    </div>

                    {/* Resources Column */}
                    <div className="galaxy-footer-col">
                        <h4 className="galaxy-footer-col-title">Resources</h4>
                        <Link to="/documentation" className="galaxy-footer-link">Docs</Link>
                        <Link to="/pricing" className="galaxy-footer-link">Pricing</Link>
                        <a href="mailto:hello@skylix.studio" className="galaxy-footer-link">hello@skylix.studio</a>
                        <Link to="/contact" className="galaxy-footer-link">Contact</Link>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div className="galaxy-footer-bottom">
                    <span className="galaxy-footer-copy">
                        © {new Date().getFullYear()} SKYLIX. All rights reserved.
                    </span>
                    <div className="galaxy-footer-legal">
                        <Link to="/privacy" className="galaxy-footer-legal-link">Privacy Policy</Link>
                        <span className="galaxy-footer-legal-sep">·</span>
                        <Link to="/terms" className="galaxy-footer-legal-link">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
