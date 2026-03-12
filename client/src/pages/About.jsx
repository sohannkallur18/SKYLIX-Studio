import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import TiltCard from '../components/TiltCard';
import { Code, Target, Shield, Users, Zap, Monitor, Brain, Globe, Award, Briefcase } from '../components/Icons';

const values = [
    { icon: <Code size={20} />, title: 'Engineering First', desc: 'We solve problems with clean architecture, rigorous testing, and production-grade code — not shortcuts.' },
    { icon: <Target size={20} />, title: 'Outcome-Driven', desc: 'Every decision maps to a quantifiable business outcome — speed, cost reduction, revenue, or system reliability.' },
    { icon: <Shield size={20} />, title: 'Security by Design', desc: 'Security, compliance, and data governance are embedded into every layer of every system we build.' },
    { icon: <Zap size={20} />, title: 'Move Fast, Ship Smart', desc: 'We deliver in focused 2-week sprints with continuous deployment — you see production progress every cycle.' }
];

const team = [
    { initials: 'AK', name: 'Full-Stack Engineers', desc: 'React, Node, Python, Go — cloud-native architecture at scale' },
    { initials: 'ML', name: 'AI/ML Engineers', desc: 'LLMs, RAG pipelines, autonomous agents, computer vision' },
    { initials: 'DS', name: 'Solution Architects', desc: 'System design, infrastructure orchestration, scalability' },
    { initials: 'PM', name: 'Delivery Leads', desc: 'Agile execution, stakeholder alignment, quality assurance' }
];

export default function About() {
    const { openChat } = useChat();

    return (
        <>
            <Helmet>
                <title>About SKYLIX — AI-Native Software Engineering Company</title>
                <meta name="description" content="SKYLIX is an engineering-first company building autonomous software systems, intelligent automation infrastructure, and scalable technology for high-growth organizations." />
            </Helmet>

            {/* Hero */}
            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge badge-light" style={{ marginBottom: '24px', display: 'inline-flex' }}>ABOUT US</span>
                        <h1 className="h1" style={{ marginTop: '4px' }}>
                            <span style={{ color: 'var(--text-bright)' }}>The Future of Business </span>
                            <span className="gradient-heading-animated">is</span>
                            <br />
                            <span className="gradient-heading-animated">Autonomous</span>
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            SKYLIX is an engineering-first company on a mission to eliminate operational friction from every organization we touch. We build the autonomous systems that let you scale without constraints.
                        </p>
                    </div>

                    {/* Vision / Mission Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '80px' }}>
                        <TiltCard className="bento-card reveal" style={{ padding: '44px' }}>
                            <Award size={24} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
                            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Our Vision</h2>
                            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                                To become the engineering partner that organizations trust to build their most critical systems — the infrastructure that runs operations, serves customers, and compounds growth.
                            </p>
                        </TiltCard>
                        <TiltCard className="bento-card reveal" style={{ padding: '44px' }}>
                            <Briefcase size={24} style={{ color: '#c4b5fd', marginBottom: '16px' }} />
                            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Our Mission</h2>
                            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text-muted)' }}>
                                Ship production-ready software, autonomous AI systems, and intelligent workflows that measurably improve how organizations operate — on time, on budget, built for longevity.
                            </p>
                        </TiltCard>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="h2">How We <span className="glow-line">Think</span></h2>
                    </div>
                    <div className="bento-grid reveal">
                        {values.map((v, i) => (
                            <div key={i} className="bento-card" style={{ padding: '36px' }}>
                                <div className="bento-icon" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>{v.icon}</div>
                                <h3 style={{ marginTop: '20px', fontSize: '18px', fontWeight: 700 }}>{v.title}</h3>
                                <p style={{ marginTop: '10px', fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* Team */}
            <section className="section" style={{ background: 'rgba(15, 20, 55, 0.25)' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="h2">Our <span className="glow-line">Team</span></h2>
                        <p className="p" style={{ margin: '16px auto' }}>Engineers, architects, and operators building the next generation of production software.</p>
                    </div>
                    <div className="bento-grid reveal stagger-grid">
                        {team.map((t, i) => (
                            <div key={i} className="bento-card" style={{
                                textAlign: 'center', padding: '40px 32px',
                                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; }}
                            >
                                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif", boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)', transition: 'box-shadow 0.4s, transform 0.4s' }}>
                                    {t.initials}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', fontFamily: "'Space Grotesk', sans-serif" }}>{t.name}</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* CTA */}
            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Let's engineer something <span className="gradient-heading-animated">extraordinary</span>.</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Whether you need a dedicated product team or a focused technical engagement, we're ready to deploy.
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
