import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Code, Brain, Zap, Cloud, Shield, Database, ArrowRight, Search, Layers, Bot, Network, Globe } from '../components/Icons';

const docSections = [
    {
        category: "Getting Started",
        icon: Zap,
        color: '#34d399',
        bg: 'rgba(16,185,129,0.15)',
        items: [
            {
                title: "Quick Start Guide",
                desc: "Set up your first SKYLIX integration in under 10 minutes.",
                content: `Welcome to SKYLIX. This guide walks you through connecting your first service.\n\n**1. Create an Account** — Sign up at skylix.studio/signup and complete your organization profile.\n\n**2. Generate API Key** — Navigate to Settings > API Keys > Create New Key. Store this key securely — it won't be shown again.\n\n**3. Install the SDK** — Run \`npm install @skylix/sdk\` or \`pip install skylix\` depending on your stack.\n\n**4. Initialize** — Use your API key to initialize the client:\n\`\`\`javascript\nimport { Skylix } from '@skylix/sdk';\nconst client = new Skylix({ apiKey: 'sk_live_...' });\n\`\`\`\n\n**5. Make Your First Call** — Test connectivity with \`client.ping()\`. If successful, you'll receive a JSON response with your organization ID and status.\n\n**6. Deploy** — Push to production with confidence. All SDK calls are idempotent by default.`
            },
            {
                title: "Authentication & API Keys",
                desc: "Manage API keys, scopes, and access control.",
                content: `SKYLIX uses bearer token authentication for all API requests.\n\n**API Key Types:**\n- **Live Keys** (sk_live_...) — For production use. Full access to all endpoints.\n- **Test Keys** (sk_test_...) — For development/staging. Sandboxed environment, no real data affected.\n\n**Scopes:** Each key can be scoped to specific services: \`read\`, \`write\`, \`admin\`, \`automation\`, \`ai\`.\n\n**Rate Limits:** Default: 100 requests/minute (Starter), 1000/min (Growth), unlimited (Enterprise).\n\n**Rotation:** Keys can be rotated without downtime. Old keys remain valid for 24 hours after rotation.\n\n**Headers:**\n\`\`\`\nAuthorization: Bearer sk_live_...\nContent-Type: application/json\nX-Skylix-Version: 2025-01-15\n\`\`\``
            },
            {
                title: "Project Structure",
                desc: "Understand the recommended project architecture.",
                content: `We recommend the following structure for SKYLIX-integrated projects:\n\n\`\`\`\n/src\n  /agents        — AI agent configurations\n  /workflows     — Automation workflow definitions\n  /integrations  — Third-party service connectors\n  /config        — Environment and service configs\n  /utils         — Shared utilities and helpers\n  /tests         — Unit and integration tests\n\`\`\`\n\n**Environment Files:** Use \`.env.local\` for development, \`.env.production\` for production credentials.\n\n**Configuration:** All SKYLIX services are configured through a central \`skylix.config.js\` file that defines agent behaviors, workflow triggers, and integration endpoints.`
            }
        ]
    },
    {
        category: "API Reference",
        icon: Code,
        color: '#00C2FF',
        bg: 'rgba(0,194,255,0.15)',
        items: [
            {
                title: "REST API Overview",
                desc: "Endpoints, request/response formats, and error handling.",
                content: `The SKYLIX REST API follows RESTful conventions with JSON payloads.\n\n**Base URL:** \`https://api.skylix.studio/v1\`\n\n**Common Endpoints:**\n- \`POST /agents\` — Create a new AI agent\n- \`GET /agents/:id\` — Retrieve agent details\n- \`POST /agents/:id/execute\` — Trigger agent execution\n- \`GET /workflows\` — List all workflows\n- \`POST /workflows/:id/run\` — Execute a workflow\n\n**Error Responses:**\n\`\`\`json\n{\n  "error": {\n    "code": "RATE_LIMIT_EXCEEDED",\n    "message": "Too many requests",\n    "retryAfter": 60\n  }\n}\n\`\`\`\n\n**Pagination:** All list endpoints support cursor-based pagination via \`?cursor=\` and \`?limit=\` params (max 100).`
            },
            {
                title: "Webhooks",
                desc: "Real-time event notifications for your applications.",
                content: `Webhooks allow your application to receive real-time notifications when events occur in SKYLIX.\n\n**Setup:** Register webhook URLs in Settings > Webhooks. Each webhook can subscribe to specific event types.\n\n**Events:**\n- \`agent.completed\` — Agent finished execution\n- \`agent.failed\` — Agent execution failed\n- \`workflow.triggered\` — Workflow started\n- \`workflow.completed\` — Workflow finished\n- \`integration.connected\` — New integration linked\n\n**Payload Format:**\n\`\`\`json\n{\n  "event": "agent.completed",\n  "timestamp": "2025-01-15T10:30:00Z",\n  "data": { "agentId": "ag_...", "result": {...} }\n}\n\`\`\`\n\n**Security:** All webhook payloads are signed with HMAC-SHA256. Verify the \`X-Skylix-Signature\` header against your webhook secret.`
            },
            {
                title: "SDKs & Libraries",
                desc: "Official client libraries for JavaScript, Python, and Go.",
                content: `We maintain official SDKs for three languages:\n\n**JavaScript/TypeScript:**\n\`\`\`bash\nnpm install @skylix/sdk\n\`\`\`\nSupports Node.js 18+ and modern browsers. Full TypeScript definitions included.\n\n**Python:**\n\`\`\`bash\npip install skylix\n\`\`\`\nSupports Python 3.9+. Async/await support via \`skylix.async_client\`.\n\n**Go:**\n\`\`\`bash\ngo get github.com/skylix/go-sdk\n\`\`\`\nIdiomatic Go with context support and configurable HTTP client.\n\n**All SDKs include:**\n- Automatic retry with exponential backoff\n- Request/response logging\n- Type-safe method signatures\n- Comprehensive error handling`
            }
        ]
    },
    {
        category: "AI & Agents",
        icon: Brain,
        color: '#c4b5fd',
        bg: 'rgba(112,0,255,0.15)',
        items: [
            {
                title: "Creating AI Agents",
                desc: "Design, deploy, and manage autonomous AI agents.",
                content: `SKYLIX agents are autonomous systems that perceive, reason, plan, and act.\n\n**Agent Configuration:**\n\`\`\`javascript\nconst agent = await client.agents.create({\n  name: 'Customer Support Agent',\n  model: 'gpt-4-turbo',\n  instructions: 'Handle customer inquiries...',\n  tools: ['knowledge_base', 'ticket_system', 'email'],\n  memory: { type: 'persistent', ttl: '30d' }\n});\n\`\`\`\n\n**Capabilities:**\n- **Multi-step reasoning** — Agents break complex tasks into sub-tasks\n- **Tool usage** — Connect agents to APIs, databases, and external services\n- **Memory** — Persistent and session-based memory for context retention\n- **Guardrails** — Define boundaries, escalation rules, and safety constraints\n\n**Monitoring:** All agent actions are logged in the Activity Dashboard with full audit trails.`
            },
            {
                title: "Multi-Agent Systems",
                desc: "Orchestrate teams of specialized agents working together.",
                content: `Multi-agent architectures enable complex workflows with specialized agents.\n\n**Architecture Patterns:**\n- **Supervisor** — One orchestrator delegates to specialist agents\n- **Peer-to-peer** — Agents collaborate as equals with shared context\n- **Pipeline** — Sequential processing where each agent's output feeds the next\n\n**Example: Customer Onboarding Pipeline**\n1. **Intake Agent** — Collects and validates customer information\n2. **Compliance Agent** — Runs KYC/AML checks against regulatory databases\n3. **Setup Agent** — Provisions accounts, sends welcome materials\n4. **Success Agent** — Schedules follow-up, monitors engagement\n\n**Communication:** Agents exchange structured messages via the SKYLIX Event Bus. All inter-agent communication is logged and auditable.`
            }
        ]
    },
    {
        category: "Automation",
        icon: Layers,
        color: '#fbbf24',
        bg: 'rgba(245,158,11,0.15)',
        items: [
            {
                title: "Workflow Builder",
                desc: "Visual and code-based workflow creation.",
                content: `SKYLIX workflows automate multi-step business processes.\n\n**Triggers:**\n- **Schedule** — Cron expressions (e.g., \`0 9 * * 1\` for every Monday at 9am)\n- **Webhook** — HTTP POST to your workflow URL\n- **Event** — React to agent completions, errors, or custom events\n- **Manual** — Trigger via API or Dashboard\n\n**Step Types:**\n- **Action** — Call an API, run a script, or invoke an agent\n- **Condition** — Branch logic based on data values\n- **Loop** — Iterate over collections\n- **Delay** — Wait for a specified duration\n- **Human-in-the-Loop** — Pause for manual approval\n\n**Error Handling:** Each step can define retry policies, fallback actions, and escalation rules. Failed workflows are automatically retried with exponential backoff.`
            },
            {
                title: "Integrations & Connectors",
                desc: "500+ pre-built connectors for popular tools.",
                content: `SKYLIX connects to 500+ platforms out of the box.\n\n**Popular Connectors:**\n- **CRM:** Salesforce, HubSpot, Pipedrive\n- **Communication:** Slack, Teams, Email, SMS (Twilio)\n- **Cloud:** AWS, Azure, GCP\n- **Databases:** PostgreSQL, MongoDB, Redis\n- **Storage:** S3, Google Drive, Dropbox\n- **Analytics:** Mixpanel, Segment, Google Analytics\n\n**Custom Connectors:** Build custom integrations using our Connector SDK:\n\`\`\`javascript\nconst connector = new Connector({\n  name: 'My Custom API',\n  baseUrl: 'https://api.example.com',\n  auth: { type: 'oauth2', ... },\n  actions: [{ name: 'getUsers', method: 'GET', path: '/users' }]\n});\n\`\`\`\n\n**Data Mapping:** Visual data mapping UI for transforming payloads between services without writing code.`
            }
        ]
    },
    {
        category: "Security & Compliance",
        icon: Shield,
        color: '#38bdf8',
        bg: 'rgba(56,189,248,0.15)',
        items: [
            {
                title: "Security Overview",
                desc: "Architecture, encryption, and access control.",
                content: `SKYLIX is built on a zero-trust security architecture.\n\n**Infrastructure:**\n- All data encrypted at rest (AES-256) and in transit (TLS 1.3)\n- SOC2 Type II certified processes\n- Deployed on ISO 27001 compliant cloud infrastructure\n- DDoS protection and WAF on all endpoints\n\n**Access Control:**\n- Role-Based Access Control (RBAC) with custom roles\n- Multi-Factor Authentication (MFA) enforced for admin accounts\n- SSO via SAML 2.0 and OpenID Connect\n- IP allowlisting for Enterprise customers\n\n**Data Residency:** Choose deployment regions (US, EU, APAC) to meet data sovereignty requirements.\n\n**Audit Logs:** Every action is logged with timestamp, user, IP, and resource affected. Logs are retained for 1 year (3 years for Enterprise).`
            },
            {
                title: "Compliance Certifications",
                desc: "GDPR, HIPAA, SOC2, and industry-specific frameworks.",
                content: `SKYLIX maintains compliance with major regulatory frameworks.\n\n**Active Certifications:**\n- **SOC2 Type II** — Annual audit for security, availability, and confidentiality\n- **GDPR** — Full compliance with EU data protection regulations\n- **HIPAA** — BAA available for healthcare customers (Enterprise)\n- **ISO 27001** — Information security management system\n\n**Data Processing:**\n- Data Processing Agreement (DPA) available on request\n- Right to erasure — customer data purged within 30 days of account deletion\n- Data portability — export all data in standard formats (JSON, CSV)\n\n**Penetration Testing:** Annual third-party penetration testing with results available to Enterprise customers under NDA.`
            }
        ]
    }
];

export default function Documentation() {
    const [expandedItem, setExpandedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSections = useMemo(() => {
        if (!searchQuery.trim()) return docSections;
        const q = searchQuery.toLowerCase();
        return docSections.map(section => ({
            ...section,
            items: section.items.filter(item =>
                item.title.toLowerCase().includes(q) ||
                item.desc.toLowerCase().includes(q) ||
                item.content.toLowerCase().includes(q)
            )
        })).filter(section => section.items.length > 0);
    }, [searchQuery]);

    const toggleItem = (key) => {
        setExpandedItem(expandedItem === key ? null : key);
    };

    return (
        <>
            <Helmet>
                <title>Documentation — SKYLIX Developer Hub</title>
                <meta name="description" content="Complete technical documentation for SKYLIX APIs, AI agent configuration, workflow automation, and integration guides." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(255,107,107,0.2)' }}>Developer Hub</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>
                            <span className="shimmer-text">Documentation</span>
                        </h1>
                        <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                            Everything you need to integrate, automate, and deploy with SKYLIX.
                        </p>

                        {/* Search */}
                        <div style={{
                            maxWidth: '520px', margin: '40px auto 0', position: 'relative'
                        }}>
                            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="form-input"
                                style={{
                                    width: '100%', paddingLeft: '44px',
                                    background: 'var(--glass)', border: '1px solid var(--glass-border)',
                                    borderRadius: '12px', padding: '14px 16px 14px 44px',
                                    color: '#fff', fontSize: '15px',
                                    outline: 'none', transition: 'border-color 0.3s'
                                }}
                            />
                        </div>
                    </div>

                    {/* Doc Sections */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        {filteredSections.map((section, sIdx) => {
                            const SectionIcon = section.icon;
                            return (
                                <div key={sIdx} className="reveal">
                                    {/* Category Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                                        <div className="bento-icon" style={{ background: section.bg, color: section.color, width: '40px', height: '40px' }}>
                                            <SectionIcon size={18} />
                                        </div>
                                        <h2 style={{ fontSize: '22px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{section.category}</h2>
                                    </div>

                                    {/* Items */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {section.items.map((item, iIdx) => {
                                            const key = `${sIdx}-${iIdx}`;
                                            const isExpanded = expandedItem === key;
                                            return (
                                                <div key={iIdx} className="bento-card" style={{ padding: 0, overflow: 'hidden' }}>
                                                    <button
                                                        onClick={() => toggleItem(key)}
                                                        style={{
                                                            width: '100%', padding: '20px 24px',
                                                            background: 'none', border: 'none', cursor: 'pointer',
                                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                            color: '#fff', textAlign: 'left',
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif"
                                                        }}
                                                    >
                                                        <div>
                                                            <h3 style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{item.title}</h3>
                                                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>{item.desc}</p>
                                                        </div>
                                                        <span style={{
                                                            fontSize: '20px', fontWeight: 300, color: section.color,
                                                            transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                                                            transition: 'transform 0.3s', flexShrink: 0, marginLeft: '20px'
                                                        }}>+</span>
                                                    </button>
                                                    <div style={{
                                                        maxHeight: isExpanded ? '800px' : '0',
                                                        overflow: 'hidden',
                                                        transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    }}>
                                                        <div style={{
                                                            padding: '0 24px 24px',
                                                            borderTop: '1px solid var(--glass-border)'
                                                        }}>
                                                            <div style={{
                                                                marginTop: '20px', fontSize: '14px', lineHeight: '1.9',
                                                                color: 'var(--text-muted)', whiteSpace: 'pre-line'
                                                            }}>
                                                                {item.content.split('\n').map((line, lIdx) => {
                                                                    if (line.startsWith('```')) {
                                                                        return null; // code blocks rendered via pre below
                                                                    }
                                                                    // Bold text
                                                                    const boldParts = line.split(/\*\*(.*?)\*\*/g);
                                                                    // Inline code
                                                                    return (
                                                                        <span key={lIdx} style={{ display: 'block', margin: line.trim() === '' ? '8px 0' : '2px 0' }}>
                                                                            {boldParts.map((part, pIdx) =>
                                                                                pIdx % 2 === 1
                                                                                    ? <strong key={pIdx} style={{ color: '#fff', fontWeight: 600 }}>{part}</strong>
                                                                                    : <span key={pIdx}>{part.split(/`([^`]+)`/g).map((codePart, cIdx) =>
                                                                                        cIdx % 2 === 1
                                                                                            ? <code key={cIdx} style={{ background: 'rgba(15, 20, 55, 0.50)', padding: '2px 6px', borderRadius: '4px', fontSize: '13px', color: '#e2e8f0' }}>{codePart}</code>
                                                                                            : codePart
                                                                                    )}</span>
                                                                            )}
                                                                        </span>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredSections.length === 0 && (
                        <div className="reveal" style={{ textAlign: 'center', padding: '80px 0' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>No documentation found matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Need help with <span className="shimmer-text">integration</span>?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Our engineering team is ready to assist with custom integrations, architecture reviews, and technical onboarding.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <Link className="btn btn-accent" to="/contact">Talk to Engineering</Link>
                        <Link className="btn btn-ghost" to="/services">Explore Services</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
