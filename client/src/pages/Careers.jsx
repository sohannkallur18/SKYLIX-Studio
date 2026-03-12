import { Helmet } from 'react-helmet-async';
import { useChat } from '../context/ChatContext';
import { Globe, Brain, TrendingUp } from '../components/Icons';

const openPositions = [
    {
        title: "Senior AI Engineer",
        type: "Full-Time",
        location: "Remote",
        tags: ["Python", "LangChain", "GPT-4", "RAG"],
        description: "Design and deploy production-grade autonomous AI agents for enterprise clients."
    },
    {
        title: "Full-Stack Developer",
        type: "Full-Time",
        location: "Remote",
        tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        description: "Build high-performance web applications and internal tools for our clients."
    },
    {
        title: "Automation Architect",
        type: "Contract",
        location: "Remote",
        tags: ["n8n", "Make.com", "API Integration", "Zapier"],
        description: "Design self-healing workflow pipelines that eliminate manual processes."
    },
    {
        title: "UX/UI Designer",
        type: "Full-Time",
        location: "Remote",
        tags: ["Figma", "Design Systems", "Prototyping", "Motion"],
        description: "Craft premium, futuristic interfaces for AI-powered applications."
    }
];

export default function Careers() {
    const { openChat } = useChat();

    return (
        <>
            <Helmet>
                <title>Careers at SKYLIX — Build the Future of AI</title>
                <meta name="description" content="Join SKYLIX and work on cutting-edge agentic AI systems, software solutions, and automation pipelines. Remote-first, engineering-driven culture." />
            </Helmet>

            {/* Hero */}
            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge">Careers</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>
                            Build Systems That <span className="grad-text">Think</span>
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            We're looking for engineers, designers, and strategists who want to build the
                            autonomous infrastructure that will define the next decade of business.
                        </p>
                    </div>

                    {/* Why SKYLIX */}
                    <div className="bento-grid" style={{ marginBottom: '0' }}>
                        <div className="bento-card reveal">
                            <div className="bento-icon" style={{ color: '#7000FF' }}><Globe size={22} /></div>
                            <h3>Remote-First</h3>
                            <p>Work from anywhere. Our team spans multiple time zones. We optimize for output, not office hours.</p>
                        </div>
                        <div className="bento-card reveal">
                            <div className="bento-icon" style={{ color: '#00C2FF' }}><Brain size={22} /></div>
                            <h3>Cutting-Edge Stack</h3>
                            <p>GPT-4, LangChain, RAG pipelines, React, Next.js — you'll work with the latest technology, not legacy code.</p>
                        </div>
                        <div className="bento-card reveal">
                            <div className="bento-icon" style={{ color: '#FF0080' }}><TrendingUp size={22} /></div>
                            <h3>Real Impact</h3>
                            <p>Every project directly affects a business. No vanity metrics — measurable outcomes for real clients.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="section" style={{ background: 'rgba(15, 20, 55, 0.25)' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="h2">Open <span className="grad-text">Positions</span></h2>
                        <p className="p" style={{ marginTop: '16px', marginInline: 'auto' }}>
                            We're growing fast. If you see a role that fits, apply — or reach out with a pitch for a role we haven't listed yet.
                        </p>
                    </div>

                    <div>
                        {openPositions.map((pos, idx) => (
                            <div key={idx} className="career-card reveal">
                                <div className="career-info">
                                    <h3>{pos.title}</h3>
                                    <p style={{ margin: '0', color: 'var(--text-muted)' }}>{pos.description}</p>
                                    <div className="career-tags">
                                        {pos.tags.map((tag, i) => (
                                            <span key={i} className="badge" style={{ fontSize: '11px', padding: '4px 10px' }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexShrink: 0 }}>
                                    <span className="badge" style={{ background: 'rgba(0,194,255,0.15)', color: '#00C2FF', border: 'none' }}>{pos.location}</span>
                                    <span className="badge" style={{ background: 'rgba(112,0,255,0.15)', color: '#d0bfff', border: 'none' }}>{pos.type}</span>
                                    <button className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '14px' }}
                                        onClick={() => openChat(`Applying for: ${pos.title}`)}>
                                        Apply
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="h2 reveal">Don't see your role?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        We're always looking for exceptional people. Send us a pitch — tell us what you'd build.
                    </p>
                    <div className="reveal" style={{ marginTop: '40px' }}>
                        <a className="btn btn-primary" href="mailto:hello@skylix.studio">Send a Pitch</a>
                    </div>
                </div>
            </section>
        </>
    );
}
