
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useChat } from '../context/ChatContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, Shield, TrendingUp, Code, Cpu, Globe, Users, MessageSquare, Star, Search, Rocket } from '../components/Icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ── Typewriter Hook ─────────────────────────────────── */
function useTypewriter(words, typingSpeed = 100, deletingSpeed = 60, pauseTime = 2000) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout;

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(() => {
                setText(currentWord.substring(0, isDeleting ? text.length - 1 : text.length + 1));
            }, isDeleting ? deletingSpeed : typingSpeed);
        }
        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}

/* ── CountUp Hook ────────────────────────────────────── */
function useCountUp(end, duration = 2000, startOnView = true) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasStarted = useRef(false);

    const animate = useCallback(() => {
        if (hasStarted.current) return;
        hasStarted.current = true;
        const start = 0;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * (end - start) + start));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration]);

    useEffect(() => {
        if (!startOnView) { animate(); return; }
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) animate(); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [animate, startOnView]);

    return [count, ref];
}

/* ── CountUp Card Component ──────────────────────────── */
function ROICard({ value, suffix = '', label }) {
    const numericValue = parseInt(value, 10);
    const isPureNumber = !isNaN(numericValue) && numericValue > 0 && String(numericValue) === String(value);
    const [count, ref] = useCountUp(isPureNumber ? numericValue : 0, 2200);

    return (
        <div className="roi-card" ref={ref}>
            <span className="roi-number-animated">
                {isPureNumber ? count : value}{suffix}
            </span>
            <span className="roi-label">{label}</span>
        </div>
    );
}

/* ── Star Rating Component ───────────────────────────── */
function StarRating({ count = 5 }) {
    return (
        <div className="star-rating">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={14} className="star-rating-star" style={{ fill: '#fbbf24', color: '#fbbf24' }} />
            ))}
        </div>
    );
}

export default function Home() {
    const { openChat } = useChat();
    useScrollReveal();

    const heroWord = useTypewriter(['Engineered.', 'Automated.', 'Deployed.', 'Scaled.'], 90, 50, 2200);

    return (
        <>
            <Helmet>
                <title>SKYLIX | AI-Native Software Engineering & Automation Infrastructure</title>
                <meta name="description" content="SKYLIX — Engineering studio building high-performance software, autonomous AI agents, and scalable automation infrastructure for companies that refuse to plateau." />
            </Helmet>

            {/* ── Hero Section ────────────────────────────────────────────── */}
            <section className="hero galaxy-hero">
                {/* Floating decorative shapes */}
                <div className="hero-float-shapes">
                    <div className="hero-shape" />
                    <div className="hero-shape" />
                    <div className="hero-shape" />
                    <div className="hero-shape" />
                </div>

                <div className="container hero-content text-center">
                    <div className="reveal">
                        <span className="badge galaxy-announce-badge" style={{ marginBottom: '24px', display: 'inline-flex' }}>
                            <span className="galaxy-badge-dot" />
                            Now Onboarding Select Partners
                        </span>
                        <h1 className="h1 galaxy-hero-title" style={{ marginBottom: '24px' }}>
                            <span>Your Vision, </span>
                            <span className="typewriter-wrapper">
                                <span className="typewriter-text">{heroWord}</span>
                                <span className="typewriter-cursor" />
                            </span>
                            <br />
                            <span>Your Growth, </span>
                            <span className="galaxy-gradient-word">Automated.</span>
                        </h1>
                        <p className="p" style={{ margin: '0 auto 40px', maxWidth: '640px' }}>
                            We architect production-grade software and deploy autonomous AI systems that operate around the clock — so your growth never stalls.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/contact" className="btn btn-accent galaxy-btn-glow">
                                Start Building
                            </Link>
                            <button onClick={() => openChat('sales')} className="btn btn-ghost galaxy-btn-outline">
                                Book a Demo
                            </button>
                        </div>
                    </div>

                    {/* Trust Bar — inside hero-content so it stacks below */}
                    <div className="trust-bar reveal" style={{ marginTop: '48px' }}>
                        <p className="trust-bar-label">Trusted by High-Growth Teams</p>
                        <div className="trust-bar-marquee">
                            {['TechFlow', 'NovaPay', 'CloudBase', 'DataSync', 'AIVertex', 'BuildStack'].map((name) => (
                                <span key={name} className="trust-logo">{name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Smarter Portfolios — Split Section ──────────────────────── */}
            <section className="section galaxy-split-section">
                <div className="container">
                    <div className="galaxy-split-grid reveal">
                        {/* Left Content */}
                        <div className="galaxy-split-content">
                            <span className="label">Engineering</span>
                            <h2 className="h2" style={{ marginTop: '16px' }}>
                                Production-Grade Software,{' '}
                                <span className="galaxy-gradient-word">Built to Scale</span>
                            </h2>
                            <p className="p">
                                We engineer scalable web platforms and SaaS applications optimized for performance, conversion, and long-term maintainability. Our AI-augmented development pipeline delivers production-ready code at startup speed.
                            </p>
                            <ul className="galaxy-check-list">
                                {["Custom SaaS Platforms & Web Applications", "AI-Augmented UX Architecture", "Performance-First Frontend Engineering", "Technical SEO & Conversion Infrastructure"].map((item, i) => (
                                    <li key={i}>
                                        <Check size={16} style={{ color: 'var(--accent)' }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/features" className="btn btn-ghost" style={{ marginTop: '8px' }}>
                                Explore Features <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Right Visual — Dashboard Mockup */}
                        <div className="galaxy-dashboard-wrap">
                            <div className="galaxy-dashboard-mockup">
                                <div className="galaxy-dashboard-header">
                                    <div className="galaxy-dashboard-dots">
                                        <span /><span /><span />
                                    </div>
                                    <span className="galaxy-dashboard-title">Project Analytics</span>
                                </div>
                                <div className="galaxy-dashboard-body">
                                    {/* Chart Bars */}
                                    <div className="galaxy-chart-row">
                                        {[68, 85, 45, 92, 73, 58, 81, 40, 95, 67, 88, 52].map((h, i) => (
                                            <div
                                                key={i}
                                                className="galaxy-chart-bar"
                                                style={{ height: `${h}%`, animationDelay: `${i * 0.08}s` }}
                                            />
                                        ))}
                                    </div>
                                    {/* Stats Row */}
                                    <div className="galaxy-dashboard-stats">
                                        <div className="galaxy-stat-item">
                                            <span className="galaxy-stat-value">99.9%</span>
                                            <span className="galaxy-stat-label">Uptime</span>
                                        </div>
                                        <div className="galaxy-stat-item">
                                            <span className="galaxy-stat-value">0.8s</span>
                                            <span className="galaxy-stat-label">Avg Load</span>
                                        </div>
                                        <div className="galaxy-stat-item">
                                            <span className="galaxy-stat-value">50+</span>
                                            <span className="galaxy-stat-label">Projects</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── AI Automation Services Section ────────────────────────────── */}
            <section className="section galaxy-designs-section">
                <div className="container">
                    <div className="section-header text-center reveal" style={{ marginBottom: '64px' }}>
                        <span className="label">Intelligent Operations</span>
                        <h2 className="h2" style={{ marginTop: '16px' }}>
                            Autonomous Systems{' '}
                            <span className="galaxy-gradient-word">That Never Sleep</span>
                        </h2>
                        <p className="p" style={{ margin: '16px auto 0' }}>
                            Eliminate operational bottlenecks with AI agents and intelligent workflow orchestration that execute, adapt, and scale — continuously.
                        </p>
                    </div>

                    <div className="galaxy-designs-grid reveal stagger-grid">
                        {[
                            {
                                title: "Conversational AI Agents",
                                desc: "Deploy autonomous agents that resolve customer inquiries, process bookings, and manage support queues without human intervention.",
                                icon: <Code size={24} />,
                                accent: "#818CF8"
                            },
                            {
                                title: "Intelligent Workflow Pipelines",
                                desc: "Orchestrate data processing, invoicing, outbound sequences, and internal operations through custom AI-driven automation layers.",
                                icon: <Shield size={24} />,
                                accent: "#C084FC"
                            },
                            {
                                title: "System-Level Integrations",
                                desc: "Unify your CRM, ERP, and payment infrastructure through zero-friction, API-first integration architecture.",
                                icon: <Zap size={24} />,
                                accent: "#06B6D4"
                            },
                            {
                                title: "AI Content Generation Engine",
                                desc: "Produce high-ranking editorial content, social assets, and SEO-optimized pages through fine-tuned generative pipelines.",
                                icon: <Cpu size={24} />,
                                accent: "#EC4899"
                            }
                        ].map((card, idx) => (
                            <div key={idx} className="galaxy-design-card">
                                <div className="galaxy-design-card-glow" style={{ background: `radial-gradient(circle at 50% 0%, ${card.accent}15 0%, transparent 70%)` }} />
                                <div className="galaxy-design-icon" style={{ color: card.accent, background: `${card.accent}14` }}>
                                    {card.icon}
                                </div>
                                <h3 className="h4" style={{ marginBottom: '12px' }}>{card.title}</h3>
                                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works — 3-step process ──────────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center reveal" style={{ marginBottom: '64px' }}>
                        <span className="label">Process</span>
                        <h2 className="h2" style={{ marginTop: '16px' }}>
                            How It <span className="galaxy-gradient-word">Works</span>
                        </h2>
                        <p className="p" style={{ margin: '16px auto 0' }}>
                            From discovery to production in three focused phases. We absorb the complexity so you can focus on outcomes.
                        </p>
                    </div>

                    <div className="how-it-works-grid reveal">
                        {[
                            { num: '1', title: 'Discover', desc: 'We audit your systems, map your workflows, and define a precision-scoped technical strategy.', bg: 'linear-gradient(135deg, #7C3AED, #6366F1)' },
                            { num: '2', title: 'Build', desc: 'Our engineers architect, develop, and iterate in rapid sprints with full observability.', bg: 'linear-gradient(135deg, #818CF8, #06B6D4)' },
                            { num: '3', title: 'Launch', desc: 'We deploy to production, instrument monitoring, and optimize — delivering measurable impact from day one.', bg: 'linear-gradient(135deg, #22D3EE, #34d399)' }
                        ].map((step) => (
                            <div key={step.num} className="how-step">
                                <div className="how-step-number" style={{ background: step.bg, boxShadow: `0 4px 24px ${step.bg.includes('#7C3AED') ? 'rgba(124,58,237,0.35)' : step.bg.includes('#818CF8') ? 'rgba(129,140,248,0.35)' : 'rgba(34,211,238,0.35)'}` }}>
                                    {step.num}
                                </div>
                                <h3 className="how-step-title">{step.title}</h3>
                                <p className="how-step-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Quality Content Section ─────────────────────────────────── */}
            <section className="section galaxy-content-section">
                <div className="container">
                    <div className="galaxy-content-grid reveal">
                        {/* Left — Feature Cards */}
                        <div className="galaxy-content-features">
                            {[
                                {
                                    title: "Full-Stack Platform Engineering",
                                    desc: "From React frontends to Node.js microservices — we build modular, production-ready systems designed for your scale.",
                                    icon: <MessageSquare size={22} />
                                },
                                {
                                    title: "Commerce & Subscription Infrastructure",
                                    desc: "Launch revenue-generating storefronts and subscription platforms with integrated payments, analytics, and lifecycle automation.",
                                    icon: <TrendingUp size={22} />
                                },
                                {
                                    title: "Adaptive & Cross-Platform",
                                    desc: "Every interface is engineered for pixel-perfect rendering and sub-second performance across all viewports and devices.",
                                    icon: <Globe size={22} />
                                }
                            ].map((feat, i) => (
                                <div key={i} className="galaxy-content-card">
                                    <div className="galaxy-content-card-icon">
                                        {feat.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '18px', fontWeight: 600, color: 'var(--text-bright)', margin: '0 0 8px' }}>{feat.title}</h4>
                                        <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right — Heading + CTA */}
                        <div className="galaxy-content-info">
                            <span className="label">Capabilities</span>
                            <h2 className="h2" style={{ marginTop: '16px' }}>
                                End-to-End{' '}
                                <span className="galaxy-gradient-word">Delivery</span>
                            </h2>
                            <p className="p">
                                From architecture to deployment, we own the full lifecycle — design, engineering, infrastructure, and continuous optimization. You focus on strategy; we ship the product.
                            </p>
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                                <Link to="/contact" className="btn btn-accent galaxy-btn-glow">
                                    Start a Project <ArrowRight size={16} />
                                </Link>
                                <button onClick={() => openChat('sales')} className="btn btn-ghost galaxy-btn-outline">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ROI / Metrics Section — With Animated Counters ──────────── */}
            <section className="section section-glow" style={{ paddingBottom: '120px' }}>
                <div className="container">
                    <div className="section-header text-center reveal" style={{ marginBottom: '60px' }}>
                        <h2 className="h2">Measurable Impact, Not Promises</h2>
                        <p className="p" style={{ margin: '0 auto' }}>
                            We don't ship features — we deliver quantifiable business outcomes through precision engineering.
                        </p>
                    </div>
                    <div className="roi-grid reveal stagger-grid">
                        <ROICard value="50" suffix="+" label="Systems in Production" />
                        <ROICard value="24/7" label="Autonomous Operations" />
                        <ROICard value="3" suffix="x" label="Faster Go-to-Market" />
                        <ROICard value="100" suffix="%" label="Client Retention Rate" />
                    </div>
                </div>
            </section>

            {/* ── Testimonials — Enhanced with Ratings ──────────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="section-header text-center reveal" style={{ marginBottom: '60px' }}>
                        <h2 className="h2">Client Engineering Reviews</h2>
                    </div>
                    <div className="testimonials-grid reveal stagger-grid">
                        {[
                            { quote: "SKYLIX architected our entire SaaS platform from the ground up. We shipped to production two months ahead of schedule with zero critical bugs.", author: "Sarah J.", role: "CTO, FinTech Co.", rating: 5 },
                            { quote: "Their AI agents now resolve 90% of our support volume autonomously. Average response time dropped from hours to under three seconds.", author: "James R.", role: "Founder, SaaS Startup", rating: 5 },
                            { quote: "From our commerce platform to automated fulfillment pipelines — SKYLIX delivered a fully integrated system, not just a website.", author: "Elena M.", role: "Ops Director, Retail", rating: 5 }
                        ].map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <StarRating count={t.rating} />
                                <p className="testimonial-quote">"{t.quote}"</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.author[0]}</div>
                                    <div>
                                        <span className="testimonial-name">{t.author}</span>
                                        <span className="testimonial-role">{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
