import React from 'react';
import { Helmet } from 'react-helmet-async';
import FeatureBlock from '../components/FeatureBlock';
import CTASection from '../components/CTASection';
import {
    Code, Brain, Zap, Globe, Shield, Database,
    Smartphone, Cloud, Layers, Bot, Network, Sparkles
} from '../components/Icons';

const Features = () => {
    const featuresList = [
        {
            category: "Core Technology",
            items: [
                { icon: Code, title: "Custom Software Engineering", description: "Scalable, fault-tolerant applications built with modern frameworks, clean architecture, and production-grade standards." },
                { icon: Brain, title: "Agentic AI Systems", description: "Autonomous AI agents capable of planning, reasoning, tool use, and executing complex multi-step workflows end-to-end." },
                { icon: Zap, title: "Intelligent Process Automation", description: "Eliminate manual operations and optimize business-critical workflows through context-aware automation layers." }
            ]
        },
        {
            category: "Enterprise Scale",
            items: [
                { icon: Cloud, title: "Cloud-Native Architecture", description: "Resilient, auto-scaling infrastructure on AWS, Azure, and GCP engineered for maximum uptime and elasticity." },
                { icon: Shield, title: "Enterprise-Grade Security", description: "Zero-trust security architecture, compliance automation, SOC2 controls, and end-to-end data encryption." },
                { icon: Database, title: "Data Infrastructure & Analytics", description: "Transform raw data streams into real-time operational intelligence through advanced processing pipelines." }
            ]
        },
        {
            category: "Innovation & Future",
            items: [
                { icon: Bot, title: "AI Copilots", description: "Context-aware assistants embedded directly into your software to amplify user productivity and decision-making." },
                { icon: Network, title: "Neural Search", description: "Next-generation retrieval systems powered by vector embeddings, semantic understanding, and hybrid ranking." },
                { icon: Sparkles, title: "Generative AI", description: "Content synthesis, intelligent code generation, and design automation powered by fine-tuned language models." }
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Capabilities & Platform — SKYLIX | AI-Native Engineering</title>
                <meta name="description" content="Explore SKYLIX's engineering capabilities: from agentic AI systems and cloud-native architecture to enterprise security and generative AI — purpose-built for scale." />
            </Helmet>

            {/* Hero Section */}
            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 className="h1">
                            Powering the <span className="grad-text">Next Era</span> <br />
                            of Enterprise Infrastructure
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            A unified platform of engineering capabilities and AI systems designed to accelerate delivery and compound operational leverage.
                        </p>
                    </div>

                    {/* Feature Categories */}
                    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
                        {featuresList.map((category, idx) => (
                            <div key={idx}>
                                <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
                                    <div style={{ height: '1px', background: 'var(--glass-border)', flex: 1 }} />
                                    <h2 style={{ fontSize: '14px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--color-2)', textTransform: 'uppercase', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
                                        {category.category}
                                    </h2>
                                    <div style={{ height: '1px', background: 'var(--glass-border)', flex: 1 }} />
                                </div>

                                <div className="bento-grid reveal">
                                    {category.items.map((item, i) => (
                                        <FeatureBlock
                                            key={i}
                                            icon={item.icon}
                                            title={item.title}
                                            description={item.description}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title="Build What Comes Next"
                subtitle="Let's combine your domain expertise with our engineering infrastructure."
                primaryBtnText="Start a Project"
                primaryBtnLink="/contact"
            />
        </>
    );
};

export default Features;
