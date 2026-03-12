import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { useChat } from '../context/ChatContext';
import { Monitor, Brain, Zap, Compass } from '../components/Icons';

const serviceCategories = [
    {
        icon: <Monitor size={24} />,
        iconBg: 'var(--accent-soft)',
        iconColor: 'var(--accent)',
        title: 'Software Development',
        desc: 'Custom software, web apps, mobile apps, SaaS platforms, enterprise solutions, APIs, and cloud architecture.',
        link: '/services/software-development',
        highlights: ['Custom Software', 'Web & Mobile Apps', 'SaaS Platforms', 'API & Cloud']
    },
    {
        icon: <Brain size={24} />,
        iconBg: 'rgba(112,0,255,0.15)',
        iconColor: '#c4b5fd',
        title: 'Agentic AI Solutions',
        desc: 'Autonomous AI agents, enterprise copilots, multi-agent systems, intelligent chatbots, and decision automation.',
        link: '/services/ai-solutions',
        highlights: ['Autonomous Agents', 'AI Copilots', 'Intelligent Chatbots', 'Decision Automation']
    },
    {
        icon: <Zap size={24} />,
        iconBg: 'rgba(16,185,129,0.15)',
        iconColor: '#34d399',
        title: 'Automation Services',
        desc: 'Business process automation, CRM workflows, marketing automation, data pipelines, and platform integrations.',
        link: '/services/automation',
        highlights: ['Workflow Automation', 'CRM & Marketing', 'Data Pipelines', '500+ Integrations']
    },
    {
        icon: <Compass size={24} />,
        iconBg: 'rgba(245,158,11,0.15)',
        iconColor: '#fbbf24',
        title: 'Technology Consulting',
        desc: 'Digital transformation strategy, tech stack evaluation, AI readiness assessment, and security compliance consulting.',
        link: '/services/consulting',
        highlights: ['Digital Transformation', 'Tech Stack Audit', 'AI Readiness', 'Security & Compliance']
    }
];

export default function Services() {
    const { openChat } = useChat();

    return (
        <>
            <Helmet>
                <title>Services — SKYLIX Software Solutions, AI & Automation</title>
                <meta name="description" content="Explore SKYLIX services: custom software development, agentic AI solutions, business automation, and technology consulting. Scalable, secure, production-ready." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(255,107,107,0.2)' }}>Our Services</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>
                            Everything You Need to <span className="shimmer-text">Build & Scale</span>
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            From custom software development to AI-powered automation — we deliver end-to-end technology solutions that drive real business results.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '28px' }}>
                        {serviceCategories.map((s, i) => (
                            <TiltCard key={i} className="bento-card reveal" style={{ padding: '44px' }}>
                                <div className="bento-icon" style={{ background: s.iconBg, color: s.iconColor, marginBottom: '20px' }}>{s.icon}</div>
                                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '14px' }}>{s.title}</h2>
                                <p style={{ fontSize: '15px', lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '20px' }}>{s.desc}</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                    {s.highlights.map((h, j) => (
                                        <span key={j} className="badge" style={{ fontSize: '12px', padding: '5px 14px', background: 'rgba(15, 20, 55, 0.40)' }}>{h}</span>
                                    ))}
                                </div>
                                <Link to={s.link} style={{ color: s.iconColor, fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                                    Learn More
                                </Link>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Not sure which service <span className="glow-line">fits</span>?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Start with a free Discovery Call. We'll understand your challenges and recommend the right service mix.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Get a Free Consultation</button>
                        <Link className="btn btn-ghost" to="/case-studies">See Client Results</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
