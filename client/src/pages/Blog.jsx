import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import TiltCard from '../components/TiltCard';

export default function Blog() {
    const { openChat } = useChat();

    return (
        <>
            <Helmet>
                <title>Insights &amp; Blog — SKYLIX Technical Knowledge Base</title>
                <meta name="description" content="Deep dives into automation strategy, agentic AI workflows, orchestration platforms, and the future of autonomous enterprise systems." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div style={{ marginBottom: '80px', textAlign: 'center' }}>
                        <div className="reveal">
                            <span className="badge">Knowledge Base</span>
                            <h1 className="h1" style={{ marginTop: '24px' }}>The <span className="grad-text">Systems Log</span></h1>
                            <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                                Deep dives into automation strategy, agentic workflows, and the future of work.
                            </p>
                        </div>
                    </div>

                    <div className="bento-grid">
                        <TiltCard className="bento-card reveal">
                            <div className="badge" style={{ marginBottom: '24px', background: 'rgba(112,0,255,0.2)', color: '#d8b4fe' }}>Strategy</div>
                            <h3 style={{ fontSize: '24px', lineHeight: '1.3' }}>The "Agent First" Mindset: Why Hiring Humans for Data Entry is Over</h3>
                            <p style={{ marginTop: '16px' }}>Discover how switching to autonomous agents for repetitive tasks increases accuracy by 99% and reduces overhead by 70%.</p>
                            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-1), var(--color-2))' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jan 12 • 5 min read</span>
                            </div>
                        </TiltCard>

                        <TiltCard className="bento-card reveal">
                            <div className="badge" style={{ marginBottom: '24px', background: 'rgba(0,194,255,0.2)', color: '#bae6fd' }}>Tech</div>
                            <h3 style={{ fontSize: '24px', lineHeight: '1.3' }}>Make.com vs n8n: A CTO's Guide to Orchestration in 2025</h3>
                            <p style={{ marginTop: '16px' }}>We stress-tested both platforms on 1M+ executions. Here is the definitive verdict on when to use which tool.</p>
                            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-2), var(--color-3))' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jan 08 • 8 min read</span>
                            </div>
                        </TiltCard>

                        <TiltCard className="bento-card reveal">
                            <div className="badge" style={{ marginBottom: '24px', background: 'rgba(255,0,128,0.2)', color: '#fbcfe8' }}>Growth</div>
                            <h3 style={{ fontSize: '24px', lineHeight: '1.3' }}>Chatbot Conversion Rates: A Case Study</h3>
                            <p style={{ marginTop: '16px' }}>How we helped a dental clinic capture 300% more leads by replacing their static form with an empathetic AI agent.</p>
                            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-3), var(--color-1))' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Dec 28 • 4 min read</span>
                            </div>
                        </TiltCard>

                        <TiltCard className="bento-card reveal bento-span-2">
                            <div className="badge" style={{ marginBottom: '24px', background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>Agentic AI</div>
                            <h3 style={{ fontSize: '24px', lineHeight: '1.3' }}>What is Agentic AI? A Technical Deep-Dive for Business Leaders</h3>
                            <p style={{ marginTop: '16px' }}>Beyond chatbots — agentic AI systems perceive, reason, plan, and act autonomously. This guide explains the architecture, use cases, and ROI of deploying AI agents in production.</p>
                            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #10B981, var(--color-2))' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Feb 05 • 12 min read</span>
                            </div>
                        </TiltCard>

                        <TiltCard className="bento-card reveal">
                            <div className="badge" style={{ marginBottom: '24px', background: 'rgba(245,158,11,0.2)', color: '#fde68a' }}>Enterprise</div>
                            <h3 style={{ fontSize: '24px', lineHeight: '1.3' }}>Building Internal Tools That Teams Actually Use</h3>
                            <p style={{ marginTop: '16px' }}>The secret to adoption is not features — it's removing friction. Our framework for designing dashboards and admin panels.</p>
                            <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, var(--color-3))' }}></div>
                                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Feb 01 • 6 min read</span>
                            </div>
                        </TiltCard>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Want to <span className="shimmer-text">Stay Ahead</span>?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Get insights on automation strategy, agentic AI, and scaling tech — direct from our engineering team.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Talk to Our Team</button>
                        <Link className="btn btn-ghost" to="/contact">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
