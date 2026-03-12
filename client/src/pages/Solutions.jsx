import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useChat } from '../context/ChatContext';
import {
    Landmark, HeartPulse, ShoppingBag, Building, Scale, Truck,
    GraduationCap, Rocket, Handshake, Factory, Lock, Hotel, Car,
    Heart, Sparkles
} from '../components/Icons';

const sectors = [
    { title: "FinTech", icon: <Landmark size={28} />, color: "#00C2FF" },
    { title: "HealthTech", icon: <HeartPulse size={28} />, color: "#FF0080" },
    { title: "E-Commerce", icon: <ShoppingBag size={28} />, color: "#7000FF" },
    { title: "Real Estate", icon: <Building size={28} />, color: "#F59E0B" },
    { title: "Legal", icon: <Scale size={28} />, color: "#E11D48" },
    { title: "Logistics", icon: <Truck size={28} />, color: "#10B981" },
    { title: "EdTech", icon: <GraduationCap size={28} />, color: "#8B5CF6" },
    { title: "Marketing", icon: <Rocket size={28} />, color: "#F97316" },
    { title: "Recruitment", icon: <Handshake size={28} />, color: "#EC4899" },
    { title: "Manufacturing", icon: <Factory size={28} />, color: "#6366F1" },
    { title: "Cybersecurity", icon: <Lock size={28} />, color: "#14B8A6" },
    { title: "Hospitality", icon: <Hotel size={28} />, color: "#F43F5E" },
    { title: "Automotive", icon: <Car size={28} />, color: "#EF4444" },
    { title: "Non-Profit", icon: <Heart size={28} />, color: "#84CC16" },
    { title: "Other", icon: <Sparkles size={28} />, color: "#A855F7" }
];

export default function Solutions() {
    const { openChat } = useChat();
    const [showSectors, setShowSectors] = useState(false);

    return (
        <>
            <Helmet>
                <title>Industry Solutions — SKYLIX | Vertical AI & Automation Infrastructure</title>
                <meta name="description" content="SKYLIX deploys pre-engineered AI automation architectures across 15+ verticals including FinTech, HealthTech, Legal, and E-Commerce. 60% faster time-to-production." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div style={{ marginBottom: '80px', textAlign: 'center' }}>
                        <div className="reveal">
                            <span className="badge" style={{ marginBottom: '16px' }}>Industries</span>
                            <h1 className="h1">Domain-Specific <span className="grad-text">Infrastructure</span></h1>
                            <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                                Pre-engineered automation architectures built for your industry's data structures, compliance requirements, and operational workflows. Select your vertical.
                            </p>
                        </div>
                    </div>

                    {!showSectors ? (
                        <div className="reveal" style={{
                            textAlign: 'center',
                            padding: '80px',
                            background: 'var(--glass)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <h3 style={{ marginBottom: '24px', fontSize: '28px' }}>Explore your vertical</h3>
                            <button className="btn btn-primary" onClick={() => setShowSectors(true)}>View All Verticals</button>
                        </div>
                    ) : (
                        <div className="reveal">
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: '24px',
                                marginBottom: '60px'
                            }}>
                                {sectors.map((sector, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => openChat(`INDUSTRY:${sector.title}`)}
                                        style={{
                                            background: 'rgba(15, 20, 55, 0.30)',
                                            border: '1px solid var(--glass-border)',
                                            color: '#fff',
                                            padding: '32px 24px',
                                            borderRadius: '24px',
                                            cursor: 'pointer',
                                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                            textAlign: 'center',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                            e.currentTarget.style.borderColor = sector.color;
                                            e.currentTarget.style.background = `rgba(${parseInt(sector.color.slice(1, 3), 16)}, ${parseInt(sector.color.slice(3, 5), 16)}, ${parseInt(sector.color.slice(5, 7), 16)}, 0.1)`;
                                            e.currentTarget.style.boxShadow = `0 20px 40px -10px ${sector.color}40`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <span style={{ color: sector.color, filter: 'drop-shadow(0 0 12px currentColor)' }}>{sector.icon}</span>
                                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '18px' }}>{sector.title}</span>
                                    </button>
                                ))}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <button className="btn btn-ghost" onClick={() => setShowSectors(false)}>Collapse Verticals</button>
                            </div>
                        </div>
                    )}

                    <div className="bento-grid" style={{ marginTop: '120px' }}>
                        <div className="bento-card bento-span-2 reveal">
                            <h3>Why Domain-Specific Architecture?</h3>
                            <p>Generic tools fail because they lack your domain's data model. A clinic requires HIPAA-compliant pipelines; an e-commerce brand needs real-time inventory reconciliation. We engineer with the end-domain constraints embedded from day one.</p>
                        </div>
                        <div className="bento-card reveal">
                            <h3>The Acceleration Advantage</h3>
                            <p>Pre-engineered vertical modules eliminate 60% of development time, shipping production-ready systems weeks ahead of custom-built alternatives.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
