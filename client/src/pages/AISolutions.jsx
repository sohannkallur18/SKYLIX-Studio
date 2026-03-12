import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import TiltCard from '../components/TiltCard';
import { useChat } from '../context/ChatContext';
import { Bot, Users, Network, MessageCircle, Scale, Search, CheckCircle } from '../components/Icons';

const capabilities = [
    { icon: <Bot size={22} />, title: 'Autonomous AI Agents', desc: 'Self-directed agents that complete multi-step business processes end-to-end without human intervention.', features: ['Task Decomposition', 'Tool Integration', 'Self-Correction', 'Goal-Oriented'] },
    { icon: <Users size={22} />, title: 'Enterprise Copilots', desc: 'AI assistants embedded into your workflows — trained on your data, policies, and domain knowledge.', features: ['Custom Training', 'RAG Pipelines', 'Context-Aware', 'Role-Based Access'] },
    { icon: <Network size={22} />, title: 'Multi-Agent Systems', desc: 'Orchestrated teams of specialized AI agents that collaborate to solve complex business problems.', features: ['Agent Coordination', 'Shared Memory', 'Parallel Execution', 'Conflict Resolution'] },
    { icon: <MessageCircle size={22} />, title: 'Intelligent Chatbots', desc: 'Context-aware conversational agents for customer support, sales, and internal knowledge management.', features: ['Natural Language', 'Sentiment Analysis', 'Multi-Channel', 'Escalation Logic'] },
    { icon: <Scale size={22} />, title: 'Decision Automation', desc: 'AI-powered decision engines that analyze data, evaluate options, and execute optimal business actions.', features: ['Rules + ML Hybrid', 'Explainable Output', 'Audit Trail', 'Real-Time Processing'] },
    { icon: <Search size={22} />, title: 'Knowledge Systems', desc: 'Enterprise knowledge bases powered by semantic search, RAG, and intelligent document processing.', features: ['Semantic Search', 'Document OCR', 'Auto-Indexing', 'Access Control'] }
];

const techStack = ['LangChain', 'CrewAI', 'AutoGen', 'OpenAI', 'Anthropic', 'LlamaIndex', 'Pinecone', 'Weaviate', 'gpt-4o', 'Claude'];

export default function AISolutions() {
    const { openChat } = useChat();
    const accent = '#c4b5fd';
    const accentSoft = 'rgba(112,0,255,0.15)';

    return (
        <>
            <Helmet>
                <title>Agentic AI Solutions — SKYLIX | AI Agents, Copilots, Multi-Agent Systems</title>
                <meta name="description" content="SKYLIX builds autonomous AI agents, enterprise copilots, multi-agent systems, intelligent chatbots, and decision automation workflows." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <span className="badge" style={{ background: accentSoft, color: accent, border: '1px solid rgba(112,0,255,0.25)' }}>Agentic AI</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>AI That <span style={{ background: 'linear-gradient(135deg, #c4b5fd, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Works For You</span></h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            We build intelligent agents and AI systems that operate autonomously — understanding context, making decisions, and executing actions.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                        {capabilities.map((s, i) => (
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

                    {/* Tech Stack */}
                    <div className="reveal" style={{ marginTop: '60px', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Built With</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                            {techStack.map((t, i) => (
                                <span key={i} className="badge" style={{ fontSize: '12px', padding: '6px 14px', background: 'rgba(15, 20, 55, 0.35)' }}>{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Ready to deploy <span style={{ color: accent }}>AI agents</span>?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Start with an AI Readiness Assessment. We'll identify the highest-impact automation opportunities.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Book AI Assessment</button>
                        <Link className="btn btn-ghost" to="/case-studies">See AI Case Studies</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
