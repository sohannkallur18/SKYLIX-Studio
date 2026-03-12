import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { useChat } from '../context/ChatContext';
import { Settings, RefreshCw, BarChart, Megaphone, Database, Link2, CheckCircle } from '../components/Icons';

const automations = [
    { icon: <Settings size={22} />, title: 'Business Process Automation', desc: 'Eliminate manual workflows across departments — from data entry to approvals to reporting.', outcomes: ['60% faster processing', 'Zero manual handoffs', 'Full audit trail'] },
    { icon: <RefreshCw size={22} />, title: 'Workflow Orchestration', desc: 'Design and deploy complex multi-step workflows with conditional logic, parallel paths, and error handling.', outcomes: ['Visual workflow builder', 'Event-driven triggers', 'Auto-retry & recovery'] },
    { icon: <BarChart size={22} />, title: 'CRM Automation', desc: 'Automate lead scoring, follow-ups, pipeline updates, and customer lifecycle management across your CRM.', outcomes: ['Lead auto-routing', 'Nurture sequences', 'Deal stage automation'] },
    { icon: <Megaphone size={22} />, title: 'Marketing Automation', desc: 'Automate campaigns, segmentation, A/B testing, and multi-channel outreach for maximum engagement.', outcomes: ['Drip campaigns', 'Audience segmentation', 'Performance tracking'] },
    { icon: <Database size={22} />, title: 'Data Pipeline Automation', desc: 'Build automated ETL/ELT pipelines that extract, transform, and load data across your entire stack.', outcomes: ['Real-time sync', 'Data validation', 'Scheduled transforms'] },
    { icon: <Link2 size={22} />, title: 'Integration & Connectors', desc: 'Connect 500+ apps and services. Sync data bidirectionally with custom mapping and transformation rules.', outcomes: ['500+ connectors', 'Bi-directional sync', 'Custom field mapping'] }
];

export default function AutomationServices() {
    const { openChat } = useChat();
    const accent = '#34d399';
    const accentSoft = 'rgba(16,185,129,0.15)';

    return (
        <>
            <Helmet>
                <title>Automation Services — SKYLIX | BPA, Workflows, CRM, Data Pipelines</title>
                <meta name="description" content="SKYLIX automates business processes, workflows, CRM, marketing, data pipelines, and platform integrations. 500+ app connectors." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge" style={{ background: accentSoft, color: accent, border: '1px solid rgba(16,185,129,0.25)' }}>Automation</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>Automate Everything <span style={{ background: 'linear-gradient(135deg, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>That Slows You Down</span></h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            From simple task automation to complex multi-system orchestration — we eliminate operational friction.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                        {automations.map((s, i) => (
                            <TiltCard key={i} className="bento-card reveal" style={{ padding: '36px' }}>
                                <div className="bento-icon" style={{ background: accentSoft, color: accent }}>{s.icon}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: '20px' }}>{s.title}</h3>
                                <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)', marginTop: '12px', marginBottom: '20px' }}>{s.desc}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {s.outcomes.map((o, j) => (
                                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                                            <CheckCircle size={14} style={{ color: accent, flexShrink: 0 }} /> {o}
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
                    <h2 className="h2 reveal">Stop doing <span style={{ color: accent }}>manually</span> what can be automated.</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Start with a free automation audit — we'll identify the workflows costing you the most time and money.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Get Automation Audit</button>
                        <Link className="btn btn-ghost" to="/contact">Talk to an Expert</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
