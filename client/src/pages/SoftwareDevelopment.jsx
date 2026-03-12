import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { useChat } from '../context/ChatContext';
import { Monitor, Globe, Smartphone, Layers, Building, Database, Cloud, CheckCircle } from '../components/Icons';

const services = [
    { icon: <Monitor size={22} />, title: 'Custom Software', desc: 'Bespoke applications built from the ground up for your unique business requirements and workflows.', features: ['Architecture Design', 'Full-Stack Development', 'Legacy Modernization', 'Performance Optimization'] },
    { icon: <Globe size={22} />, title: 'Web Applications', desc: 'Responsive, fast, and scalable web applications built with modern JavaScript frameworks and best practices.', features: ['React / Next.js', 'Progressive Web Apps', 'Real-time Systems', 'SEO Optimization'] },
    { icon: <Smartphone size={22} />, title: 'Mobile Applications', desc: 'Native and cross-platform mobile apps for iOS and Android with seamless user experiences.', features: ['React Native', 'iOS & Android', 'Offline-First', 'Push Notifications'] },
    { icon: <Layers size={22} />, title: 'SaaS Platforms', desc: 'Multi-tenant SaaS products with subscription management, analytics dashboards, and scalable infrastructure.', features: ['Multi-Tenancy', 'Billing Integration', 'Usage Analytics', 'Auto-Scaling'] },
    { icon: <Building size={22} />, title: 'Enterprise Solutions', desc: 'Enterprise-grade systems including ERP, CRM, and internal tools with security, compliance, and audit trails.', features: ['Role-Based Access', 'Audit Logging', 'SSO Integration', 'Compliance Ready'] },
    { icon: <Database size={22} />, title: 'API & Integration', desc: 'RESTful and GraphQL APIs, third-party integrations, webhooks, and data synchronization services.', features: ['REST & GraphQL', 'Webhook Systems', 'OAuth Flows', 'Rate Limiting'] },
    { icon: <Cloud size={22} />, title: 'Cloud Architecture', desc: 'Cloud-native architecture on AWS, Azure, or GCP with infrastructure-as-code and CI/CD pipelines.', features: ['IaC (Terraform)', 'CI/CD Pipelines', 'Container Orchestration', 'Cost Optimization'] }
];

export default function SoftwareDevelopment() {
    const { openChat } = useChat();
    const accent = 'var(--accent)';
    const accentSoft = 'var(--accent-soft)';

    return (
        <>
            <Helmet>
                <title>Software Development — SKYLIX | Custom Apps, Web, Mobile, SaaS, APIs</title>
                <meta name="description" content="SKYLIX builds custom software, web & mobile apps, SaaS platforms, enterprise solutions, APIs, and cloud architecture. Scalable, secure, production-ready." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge" style={{ background: accentSoft, color: accent, border: '1px solid rgba(255,107,107,0.2)' }}>Software Development</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>Build Software That <span className="shimmer-text">Runs at Scale</span></h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            From MVPs to enterprise platforms — we architect, build, and deploy production-ready software.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                        {services.map((s, i) => (
                            <TiltCard key={i} className="bento-card reveal" style={{ padding: '36px' }}>
                                <div className="bento-icon" style={{ background: accentSoft, color: accent }}>{s.icon}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: '20px' }}>{s.title}</h3>
                                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)', marginTop: '12px', marginBottom: '20px' }}>{s.desc}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {s.features.map((f, j) => (
                                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                                            <CheckCircle size={14} style={{ color: accent, flexShrink: 0 }} /> {f}
                                        </span>
                                    ))}
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Got an app idea? Let's <span className="shimmer-text">build it</span>.</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Tell us about your project — we'll scope it, architect it, and give you a clear roadmap.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Start Your Project</button>
                        <Link className="btn btn-ghost" to="/contact">Get a Quote</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
