import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { useChat } from '../context/ChatContext';
import { TrendingUp, CheckCircle } from '../components/Icons';

const caseStudies = [
    {
        industry: 'FinTech',
        accent: 'var(--accent)',
        bg: 'var(--accent-soft)',
        title: 'SaaS Platform for Real-Time Payment Processing',
        desc: 'Built a multi-tenant SaaS platform handling 50,000+ daily transactions with sub-200ms response times, PCI-DSS compliance, and automated fraud detection.',
        results: ['99.99% uptime', '200ms avg response', '50K+ daily txns', 'PCI-DSS compliant'],
        tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe']
    },
    {
        industry: 'Logistics',
        accent: '#34d399',
        bg: 'rgba(16,185,129,0.15)',
        title: 'Fleet Management & Route Optimization System',
        desc: 'Custom logistics platform with real-time GPS tracking, AI-powered route optimization, driver management, and automated dispatch for 2,000+ vehicles.',
        results: ['32% fuel savings', '2,000+ vehicles', 'Real-time tracking', 'AI routing'],
        tags: ['React Native', 'Python', 'TensorFlow', 'GCP', 'IoT']
    },
    {
        industry: 'Healthcare',
        accent: '#c4b5fd',
        bg: 'rgba(112,0,255,0.15)',
        title: 'AI-Powered Patient Intake Automation',
        desc: 'Autonomous AI system that handles patient intake, insurance verification, scheduling, and follow-ups — reducing front desk workload by 68%.',
        results: ['68% workload reduction', '3min avg intake', 'HIPAA compliant', '24/7 automated'],
        tags: ['LangChain', 'GPT-4', 'FHIR API', 'React', 'MongoDB']
    },
    {
        industry: 'E-Commerce',
        accent: '#fbbf24',
        bg: 'rgba(245,158,11,0.15)',
        title: 'Multi-Channel Marketing Automation Engine',
        desc: 'Automated marketing workflows across email, SMS, push, and social — with AI-powered segmentation and personalized content generation.',
        results: ['142% more conversions', '500K+ contacts', '12 channels', 'AI personalization'],
        tags: ['CrewAI', 'HubSpot API', 'Twilio', 'React', 'Python']
    },
    {
        industry: 'Legal Tech',
        accent: '#38bdf8',
        bg: 'rgba(56,189,248,0.15)',
        title: 'Intelligent Document Review Platform',
        desc: 'AI-powered document analysis platform that reviews contracts, extracts key clauses, and flags compliance risks — processing 10,000+ pages per day.',
        results: ['90% time savings', '10K+ pages/day', '98% accuracy', 'Auto-flagging'],
        tags: ['GPT-4', 'LlamaIndex', 'OCR', 'Next.js', 'Azure']
    }
];

export default function CaseStudies() {
    const { openChat } = useChat();

    return (
        <>
            <Helmet>
                <title>Case Studies — SKYLIX | Software, AI & Automation Success Stories</title>
                <meta name="description" content="See how SKYLIX delivers measurable results. Case studies spanning FinTech, Healthcare, Logistics, E-Commerce, and Legal Tech." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(255,107,107,0.2)' }}>Case Studies</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>Real Results From <span className="shimmer-text">Real Projects</span></h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            See how we've helped businesses build software, deploy AI, and automate operations across industries.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                        {caseStudies.map((cs, i) => (
                            <TiltCard key={i} className="bento-card reveal" style={{ padding: '44px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '40px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 420px' }}>
                                        <span className="badge" style={{ background: cs.bg, color: cs.accent, fontSize: '12px', marginBottom: '16px', display: 'inline-block' }}>{cs.industry}</span>
                                        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', lineHeight: '1.4' }}>{cs.title}</h2>
                                        <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '20px' }}>{cs.desc}</p>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {cs.tags.map((t, j) => (
                                                <span key={j} className="badge" style={{ fontSize: '11px', padding: '4px 12px', background: 'rgba(15, 20, 55, 0.35)' }}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ minWidth: '220px', padding: '24px', background: 'rgba(15, 20, 55, 0.30)', borderRadius: '14px', border: '1px solid rgba(99, 120, 255, 0.10)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                                            <TrendingUp size={16} style={{ color: cs.accent }} />
                                            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: cs.accent }}>Key Results</span>
                                        </div>
                                        {cs.results.map((r, j) => (
                                            <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                                <CheckCircle size={14} style={{ color: cs.accent, flexShrink: 0 }} /> {r}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Your project could be <span className="shimmer-text">next</span>.</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Let's discuss how we can deliver similar results for your business.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Start Your Project</button>
                        <Link className="btn btn-ghost" to="/contact">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
