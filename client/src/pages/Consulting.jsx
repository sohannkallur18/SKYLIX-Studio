import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { useChat } from '../context/ChatContext';
import { Compass, Wrench, Brain, Shield, CheckCircle } from '../components/Icons';

const offerings = [
    { icon: <Compass size={22} />, title: 'Digital Transformation Strategy', desc: 'A comprehensive roadmap to modernize your technology, processes, and organizational capabilities.', deliverables: ['Technology Roadmap', 'Process Mapping', 'Change Management Plan', 'ROI Projections'] },
    { icon: <Wrench size={22} />, title: 'Tech Stack Evaluation', desc: 'Objective analysis of your current architecture with actionable recommendations for improvement.', deliverables: ['Architecture Audit', 'Performance Report', 'Vendor Comparison', 'Migration Strategy'] },
    { icon: <Brain size={22} />, title: 'AI Readiness Assessment', desc: 'Evaluate your organization\'s data, infrastructure, and team readiness for AI implementation.', deliverables: ['Data Quality Audit', 'Infrastructure Review', 'Use Case Prioritization', 'Implementation Plan'] },
    { icon: <Shield size={22} />, title: 'Security & Compliance', desc: 'Security assessment, compliance readiness, and risk mitigation strategy for regulated industries.', deliverables: ['Security Audit', 'Compliance Gap Analysis', 'Risk Assessment', 'Remediation Plan'] }
];

export default function Consulting() {
    const { openChat } = useChat();
    const accent = '#fbbf24';
    const accentSoft = 'rgba(245,158,11,0.15)';

    return (
        <>
            <Helmet>
                <title>Technology Consulting — SKYLIX | Digital Transformation, AI Readiness, Security</title>
                <meta name="description" content="SKYLIX consulting: digital transformation strategy, tech stack evaluation, AI readiness assessment, and security compliance for enterprises." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge" style={{ background: accentSoft, color: accent, border: '1px solid rgba(245,158,11,0.25)' }}>Consulting</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>Strategic Technology <span style={{ background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Consulting</span></h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            Make confident technology decisions backed by deep technical expertise and industry best practices.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '28px' }}>
                        {offerings.map((s, i) => (
                            <TiltCard key={i} className="bento-card reveal" style={{ padding: '40px' }}>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div className="bento-icon" style={{ background: accentSoft, color: accent }}>{s.icon}</div>
                                        <h3 style={{ fontSize: '22px', fontWeight: 700, marginTop: '20px' }}>{s.title}</h3>
                                        <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)', marginTop: '12px' }}>{s.desc}</p>
                                    </div>
                                    <div style={{ minWidth: '180px', padding: '20px', background: 'rgba(15, 20, 55, 0.30)', borderRadius: '14px', border: '1px solid rgba(99, 120, 255, 0.10)' }}>
                                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, display: 'block', marginBottom: '12px' }}>Deliverables</span>
                                        {s.deliverables.map((d, j) => (
                                            <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                                <CheckCircle size={12} style={{ color: accent, flexShrink: 0 }} /> {d}
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
                    <h2 className="h2 reveal">Need strategic <span style={{ color: accent }}>guidance</span>?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Book a free Discovery Call. We'll understand your challenges and propose a consulting engagement tailored to your needs.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Book Discovery Call</button>
                        <Link className="btn btn-ghost" to="/contact">Contact Us</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
