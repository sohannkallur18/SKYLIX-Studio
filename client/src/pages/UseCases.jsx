import React from 'react';
import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import { Heart, TrendingUp, ShoppingBag, Briefcase, Factory, GraduationCap, CheckCircle } from '../components/Icons';

const UseCases = () => {
    const industries = [
        {
            title: "Healthcare",
            icon: Heart,
            color: '#FF0080',
            bg: 'rgba(255,0,128,0.15)',
            description: "AI-driven diagnostics, patient management systems, and automated scheduling.",
            results: ["30% Reduction in Admin Costs", "24/7 Patient Support"]
        },
        {
            title: "Finance & Fintech",
            icon: TrendingUp,
            color: '#00C2FF',
            bg: 'rgba(0,194,255,0.15)',
            description: "Fraud detection, algorithmic trading bots, and personalized banking experiences.",
            results: ["Real-time Fraud Alerts", "Automated Compliance Reporting"]
        },
        {
            title: "E-Commerce",
            icon: ShoppingBag,
            color: '#7000FF',
            bg: 'rgba(112,0,255,0.15)',
            description: "Recommendation engines, inventory forecasting, and customer service chatbots.",
            results: ["15% Increase in Conversion", "Zero Downtime During Sales"]
        },
        {
            title: "Enterprise",
            icon: Briefcase,
            color: '#fbbf24',
            bg: 'rgba(245,158,11,0.15)',
            description: "Workflow automation, HR management tools, and internal knowledge bases.",
            results: ["Streamlined Onboarding", "Unified Data Silos"]
        },
        {
            title: "Manufacturing",
            icon: Factory,
            color: '#34d399',
            bg: 'rgba(16,185,129,0.15)',
            description: "Predictive maintenance, supply chain optimization, and quality control vision systems.",
            results: ["Reduced Equipment Failure", "Just-in-Time Inventory"]
        },
        {
            title: "Education",
            icon: GraduationCap,
            color: '#c4b5fd',
            bg: 'rgba(196,181,253,0.15)',
            description: "Personalized learning paths, automated grading, and student engagement analytics.",
            results: ["Adaptive Curriculums", "Insightful Student Tracking"]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Use Cases - SKYLIX | Industries We Serve</title>
                <meta name="description" content="See how SKYLIX transforms industries with AI. From Healthcare to Finance, our solutions deliver measurable impact." />
            </Helmet>

            {/* Hero */}
            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h1 className="h1">
                            Solutions for Every <span className="grad-text">Industry</span>
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            We tailor our advanced technology to meet the unique challenges of your sector.
                        </p>
                    </div>

                    {/* Industries Grid */}
                    <div className="bento-grid reveal">
                        {industries.map((ind, idx) => (
                            <div key={idx} className="bento-card" style={{ padding: '36px', transition: 'all 0.3s' }}>
                                <div className="bento-icon" style={{ background: ind.bg, color: ind.color, marginBottom: '20px' }}>
                                    <ind.icon size={22} />
                                </div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '12px' }}>{ind.title}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px', lineHeight: '1.7' }}>{ind.description}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {ind.results.map((res, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 600, color: ind.color }}>
                                            <CheckCircle size={14} style={{ flexShrink: 0 }} />
                                            {res}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection title="Transform Your Industry" subtitle="Partner with us to lead the market." />
        </>
    );
};

export default UseCases;
