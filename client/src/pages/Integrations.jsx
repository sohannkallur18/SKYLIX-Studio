import React from 'react';
import { Helmet } from 'react-helmet-async';
import CTASection from '../components/CTASection';
import { Cloud, Database, Globe, Smartphone, Lock, Link2, ExternalLink } from '../components/Icons';

const Integrations = () => {
    const categories = [
        {
            title: "Cloud Platforms",
            description: "Seamlessly deploy and manage on major cloud providers.",
            items: [
                { name: "AWS", icon: Cloud, desc: "Lambda, EC2, S3" },
                { name: "Azure", icon: Cloud, desc: "Azure AI, Cognitive Services" },
                { name: "Google Cloud", icon: Cloud, desc: "Vertex AI, BigQuery" }
            ]
        },
        {
            title: "SaaS & CRM",
            description: "Connect your AI agents to your existing operational tools.",
            items: [
                { name: "Salesforce", icon: Database, desc: "CRM Automation" },
                { name: "HubSpot", icon: Database, desc: "Marketing Workflows" },
                { name: "Slack", icon: Smartphone, desc: "Chat & Notifications" },
                { name: "Microsoft 365", icon: Globe, desc: "Productivity Suite" }
            ]
        },
        {
            title: "Development",
            description: "Built for developers, by developers.",
            items: [
                { name: "GitHub", icon: Link2, desc: "CI/CD Pipelines" },
                { name: "Docker", icon: Lock, desc: "Containerization" },
                { name: "REST/GraphQL", icon: ExternalLink, desc: "Universal API Support" }
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Integrations - SKYLIX | Connect Your Stacks</title>
                <meta name="description" content="Seamlessly integrate SKYLIX AI solutions with your favorite tools. From Cloud platforms to CRMs, we support the ecosystems you rely on." />
            </Helmet>

            {/* Hero */}
            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h1 className="h1">
                            Connect with <span className="grad-text">Everything</span>
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            Our platform is designed to sit at the heart of your stack, orchestrating data and actions across all your business applications.
                        </p>
                    </div>

                    {/* Integration Categories */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                        {categories.map((cat, idx) => (
                            <div key={idx}>
                                <div className="reveal" style={{ marginBottom: '32px', paddingLeft: '16px', borderLeft: '4px solid var(--color-1)' }}>
                                    <h2 style={{ fontSize: '22px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', marginBottom: '8px' }}>{cat.title}</h2>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{cat.description}</p>
                                </div>

                                <div className="bento-grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                                    {cat.items.map((item, i) => (
                                        <div key={i} className="bento-card" style={{
                                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                                            padding: '32px 24px', textAlign: 'center', transition: 'all 0.3s'
                                        }}>
                                            <div style={{
                                                width: '56px', height: '56px', borderRadius: '50%',
                                                background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: '16px', border: '1px solid var(--glass-border)',
                                                transition: 'transform 0.3s'
                                            }}>
                                                <item.icon size={24} style={{ color: 'var(--color-2)' }} />
                                            </div>
                                            <h3 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>{item.name}</h3>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CTASection
                title="Don't see your tool?"
                subtitle="We build custom integrations for enterprise clients."
                primaryBtnText="Request Integration"
                primaryBtnLink="/contact"
                secondaryBtnText="View API Docs"
                secondaryBtnLink="/documentation"
            />
        </>
    );
};

export default Integrations;
