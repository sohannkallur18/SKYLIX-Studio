import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { Check, X, Shield, Lock, Clock, ArrowRight, Zap, Award, HeartPulse, Users, MessageCircle, Layers, Rocket, Building, Brain, Globe, FileText } from '../components/Icons';

const IconMap = {
    Check, X, Shield, Lock, Clock, ArrowRight, Zap, Award, HeartPulse,
    Users, MessageCircle, Layers, Rocket, Building, Brain, Globe, FileText
};

const pricingData = {
    software: {
        tiers: [
            {
                title: "Starter Website",
                priceRange: "$249 – $449", // Use a specific string for the dynamic price display instead of just monthly/annual
                description: "Best for small businesses that need a clean, professional online presence.",
                featureGroups: [
                    {
                        title: "Included Pages",
                        items: ["Home (Landing Page)", "About / Our Story", "Contact Page", "Gallery / Photos"]
                    },
                    {
                        title: "Design & UX",
                        items: ["Clean modern layout", "Fully mobile responsive", "Simple navigation structure", "Light animations (hover / fade)", "Optimized for fast loading"]
                    },
                    {
                        title: "Core Features",
                        items: ["Google Maps integration", "Social media links", "Basic SEO structure", "Image gallery support", "Contact form"]
                    },
                    {
                        title: "Revisions",
                        items: ["3 revisions included", "Additional revisions: $25 each"]
                    }
                ],
                addons: "Extra page: $89 per page",
                cta: "Get Started"
            },
            {
                title: "Business Website",
                priceRange: "$799 – $1,299",
                description: "Ideal for restaurants, cafes, salons, and service businesses that need both a professional website and a simple internal system to manage customer requests.",
                isPopular: true,
                featureGroups: [
                    {
                        title: "Included Pages",
                        items: ["Home", "About", "Services or Menu", "Events / Promotions", "Reservations or Booking", "Contact / Enquiry"]
                    },
                    {
                        title: "Design & Experience",
                        items: ["Custom modern design", "Premium UX layout", "Conversion-focused page structure", "Advanced animations and visual effects", "Mobile optimized interface"]
                    },
                    {
                        title: "Customer Interaction Features",
                        items: ["Reservation or booking form", "Contact / enquiry form", "Menu or services showcase", "Event listing section", "Google Maps integration", "Social media integration"]
                    },
                    {
                        title: "Revisions",
                        items: ["5 revisions included", "Additional revisions: $25 each"]
                    }
                ],
                adminDashboard: {
                    title: "Integrated Admin Dashboard",
                    description: "A built-in management dashboard that allows business owners and staff to manage customer enquiries and reservations without technical knowledge.",
                    groups: [
                        {
                            title: "Reservation Management",
                            items: ["View reservation requests", "Reservation details (name, contact, date, time, guests)", "Status tracking: Pending, Confirmed, Completed, Cancelled"]
                        },
                        {
                            title: "Enquiry Management",
                            items: ["View all contact submissions", "Customer information tracking", "Enquiry status monitoring"]
                        },
                        {
                            title: "Customer Data Storage",
                            items: ["Organized customer records", "Search and filtering tools", "Secure data storage"]
                        },
                        {
                            title: "Business Insights",
                            items: ["Total enquiries", "Total reservations", "Recent activity overview"]
                        },
                        {
                            title: "Access & Security",
                            items: ["Secure admin login", "Protected dashboard access", "Optional role-based access"]
                        }
                    ]
                },
                premiumUpgrade: {
                    title: "PREMIUM ADMIN DASHBOARD UPGRADE",
                    price: "$300 – $500",
                    description: "This upgrade enhances the included dashboard with advanced business management capabilities.",
                    groups: [
                        {
                            title: "Premium Dashboard Experience",
                            items: ["High-end modern UI", "Smooth dashboard transitions", "Enhanced visual data presentation", "Mobile-friendly interface", "Improved navigation workflow"]
                        },
                        {
                            title: "Advanced Features",
                            items: ["Reservation calendar view", "Customer database management", "Customer history tracking", "Advanced reservation tracking", "Export enquiries and reservations (CSV)"]
                        },
                        {
                            title: "Staff & Access Control",
                            items: ["Multiple staff accounts", "Role-based permissions", "Activity logs"]
                        },
                        {
                            title: "Business Insights",
                            items: ["Reservation analytics", "Enquiry analytics", "Customer trends overview", "Monthly activity reports"]
                        }
                    ]
                },
                addons: "Extra page: $99",
                cta: "Get Started"
            },
            {
                title: "Premium Interactive",
                priceRange: "$1,800 – $4,000+",
                description: "Designed for brands that want a high-end interactive website with advanced visual design and custom digital systems.",
                featureGroups: [
                    {
                        title: "Typical Pages",
                        items: ["Home", "About", "Services", "Reservations", "Events", "Gallery", "Blog / News", "Contact"]
                    },
                    {
                        title: "Visual Experience",
                        items: ["Fully custom UI/UX", "Premium layouts", "Interactive storytelling sections", "Smooth page transitions"]
                    },
                    {
                        title: "Advanced Animation",
                        items: ["Scroll-triggered animations", "Parallax effects", "Interactive sections", "Motion design elements", "Optional 3D visuals"]
                    },
                    {
                        title: "Advanced System Features",
                        items: ["Advanced reservation system", "Enquiry management system", "Full admin dashboard", "Database storage", "Email notification system"]
                    },
                    {
                        title: "Integrations",
                        items: ["CMS editing system", "Blog management", "Event management", "Newsletter integration", "Analytics setup", "Third-party integrations"]
                    },
                    {
                        title: "Performance Optimization",
                        items: ["Optimized animations", "Fast loading performance", "SEO-optimized structure"]
                    },
                    {
                        title: "Revisions",
                        items: ["8 revisions included", "Additional revisions: $40 each"]
                    }
                ],
                adminDashboard: {
                    title: "Integrated Admin Dashboard",
                    description: "A built-in management dashboard that allows business owners and staff to manage customer enquiries and reservations without technical knowledge.",
                    groups: [
                        {
                            title: "Reservation Management",
                            items: ["View reservation requests", "Reservation details (name, contact, date, time, guests)", "Status tracking: Pending, Confirmed, Completed, Cancelled"]
                        },
                        {
                            title: "Enquiry Management",
                            items: ["View all contact submissions", "Customer information tracking", "Enquiry status monitoring"]
                        },
                        {
                            title: "Customer Data Storage",
                            items: ["Organized customer records", "Search and filtering tools", "Secure data storage"]
                        },
                        {
                            title: "Business Insights",
                            items: ["Total enquiries", "Total reservations", "Recent activity overview"]
                        },
                        {
                            title: "Access & Security",
                            items: ["Secure admin login", "Protected dashboard access", "Optional role-based access"]
                        }
                    ]
                },
                premiumUpgrade: {
                    title: "PREMIUM ADMIN DASHBOARD UPGRADE",
                    price: "$300 – $500",
                    description: "This upgrade enhances the included dashboard with advanced business management capabilities.",
                    groups: [
                        {
                            title: "Premium Dashboard Experience",
                            items: ["High-end modern UI", "Smooth dashboard transitions", "Enhanced visual data presentation", "Mobile-friendly interface", "Improved navigation workflow"]
                        },
                        {
                            title: "Advanced Features",
                            items: ["Reservation calendar view", "Customer database management", "Customer history tracking", "Advanced reservation tracking", "Export enquiries and reservations (CSV)"]
                        },
                        {
                            title: "Staff & Access Control",
                            items: ["Multiple staff accounts", "Role-based permissions", "Activity logs"]
                        },
                        {
                            title: "Business Insights",
                            items: ["Reservation analytics", "Enquiry analytics", "Customer trends overview", "Monthly activity reports"]
                        }
                    ]
                },
                addons: "Extra page: $120 • Advanced integrations quoted separately",
                cta: "Request Quote"
            }
        ],
        maintenance: [
            {
                title: "Standard Maintenance",
                price: "$120 / month",
                includes: [
                    "Routine website maintenance",
                    "Plugin and dependency updates",
                    "Security checks & Performance monitoring",
                    "Minor content & design adjustments"
                ],
                support: [
                    "Business hours technical support",
                    "Website troubleshooting",
                    "Assistance with content updates"
                ],
                monitoring: [
                    "Uptime monitoring",
                    "Dashboard & reservation system checks"
                ]
            },
            {
                title: "Premium Maintenance",
                price: "$300 / month",
                includes: [
                    "Full system & security monitoring",
                    "Performance optimization",
                    "Database health monitoring",
                    "Full inspection every 20 days"
                ],
                support: [
                    "24/7 priority support",
                    "Immediate response for critical issues",
                    "Priority bug investigation & fixes",
                    "Feature consultation & Integration support"
                ],
                monitoring: [
                    "Platform reliability monitoring",
                    "System updates and testing"
                ]
            }
        ],
        addOns: [
            "Speed optimization — $100",
            "Blog setup — $150",
            "SEO starter setup — $200",
            "Branding / logo design — $200 – $500",
            "Hosting setup — $75",
            "Priority delivery — custom quote"
        ],
        comparisonRows: [
            { name: "Pages Included", s: "4 Pages", g: "6 Pages", e: "8+ Pages" },
            { name: "Admin Dashboard", s: false, g: "Included", e: "Full Custom" },
            { name: "Revisions", s: "3 included", g: "5 included", e: "8 included" },
            { name: "Animations", s: "Light", g: "Advanced", e: "Interactive 3D" },
            { name: "CMS Integration", s: false, g: false, e: true }
        ]
    },
    ai: {
        tiers: [
            {
                title: "Starter Automation",
                priceRange: "$899 – $1,800",
                description: "Designed for small businesses that want to automate repetitive tasks and improve operational efficiency without deploying complex AI systems.",
                featureGroups: [
                    {
                        title: "Best Suited For",
                        items: ["Startups", "Small businesses", "Service providers", "Freelancers"]
                    },
                    {
                        title: "Automation Scope",
                        items: ["1–2 automation workflows", "Lead capture automation", "Automated email follow-ups", "Appointment confirmation automation", "CRM contact syncing", "Enquiry routing workflows", "Form submission automation"]
                    },
                    {
                        title: "Workflow Capabilities",
                        items: ["Trigger-based workflows", "Conditional logic", "Automated responses", "Notification systems", "Task creation for team members", "Automated data entry between systems"]
                    },
                    {
                        title: "Integrations",
                        items: ["Website forms", "CRM platforms", "Email platforms", "Google Workspace tools", "Calendars and scheduling systems", "Communication tools (Slack)"]
                    },
                    {
                        title: "Basic AI Assistance",
                        items: ["Automated response drafting", "AI-generated replies to enquiries", "Simple lead qualification prompts", "Text summarization"]
                    },
                    {
                        title: "Automation Monitoring",
                        items: ["Automation activity logs", "Workflow execution status", "Error alerts"]
                    },
                    {
                        title: "Delivery Process",
                        items: ["Workflow consultation", "Automation design", "System integration", "Testing and deployment"]
                    }
                ],
                addons: "2 workflow revisions included • Additional workflow changes $100 each",
                cta: "Get Started"
            },
            {
                title: "Business Automation",
                priceRange: "$2,800 – $5,500",
                description: "Designed for businesses that want multiple intelligent automation systems combined with AI assistance to improve customer interactions and internal productivity.",
                isPopular: true,
                featureGroups: [
                    {
                        title: "Best Suited For",
                        items: ["Restaurants", "Agencies", "Real estate companies", "Service businesses", "Growing startups"]
                    },
                    {
                        title: "Automation Scope",
                        items: ["3–5 intelligent automation workflows", "AI lead qualification systems", "Automated appointment scheduling", "CRM pipeline automation", "Customer follow-up automation", "Enquiry management automation", "Internal task automation"]
                    },
                    {
                        title: "AI Capabilities",
                        items: ["Generate customer responses", "Assist with email replies", "Summarize customer enquiries", "Assist with knowledge retrieval"]
                    },
                    {
                        title: "AI Assistant Integration",
                        items: ["Answering customer questions", "Collecting lead information", "Scheduling appointments", "Guiding customers through services", "Deploy on website, support tools, or messaging"]
                    }
                ],
                adminDashboard: {
                    title: "INTEGRATED AUTOMATION DASHBOARD",
                    description: "Monitor automation activity and customer interactions seamlessly.",
                    groups: [
                        {
                            title: "Dashboard Capabilities",
                            items: ["View active automation workflows", "Review automation execution logs", "Identify workflow errors"]
                        },
                        {
                            title: "Customer Interaction Tracking",
                            items: ["Track captured leads", "View appointment requests", "Review AI handled conversations"]
                        },
                        {
                            title: "Automation Insights",
                            items: ["Automation activity metrics", "Lead capture analytics", "Workflow success tracking"]
                        },
                        {
                            title: "Security",
                            items: ["Secure admin login", "Protected dashboard access"]
                        }
                    ]
                },
                premiumUpgrade: {
                    title: "PREMIUM AI AUTOMATION CONTROL CENTER",
                    price: "$600 – $1,200",
                    description: "Advanced dashboard providing improved design and deeper system insights.",
                    groups: [
                        {
                            title: "Premium Enhancements",
                            items: ["Modern high-end UI design", "Improved navigation and workflow visualization", "Real-time automation monitoring", "Advanced analytics dashboard"]
                        },
                        {
                            title: "AI Insights",
                            items: ["Customer interaction insights", "AI response performance tracking", "Lead quality analysis"]
                        },
                        {
                            title: "Management Features",
                            items: ["Customer database management", "Conversation history tracking", "Export data tools"]
                        },
                        {
                            title: "Team Controls",
                            items: ["Multiple staff accounts", "Role-based permissions", "Activity logs"]
                        }
                    ]
                },
                addons: "4 workflow revisions included • Additional revisions $150 each",
                cta: "Start Growing"
            },
            {
                title: "Premium Agentic AI Systems",
                priceRange: "$7,500 – $18,000+",
                description: "Designed for companies that want advanced AI systems capable of performing complex autonomous tasks via agentic architecture.",
                featureGroups: [
                    {
                        title: "Best Suited For",
                        items: ["Technology companies", "SaaS startups", "Enterprise teams", "AI-first businesses"]
                    },
                    {
                        title: "Agentic AI Capabilities",
                        items: ["Answering complex customer questions", "Processing incoming leads", "Conducting research tasks", "Generating reports", "Executing multi-step workflows"]
                    },
                    {
                        title: "AI Agent Types",
                        items: ["Customer support agents", "Sales assistant agents", "Research agents", "Internal operations agents", "Analytics agents"]
                    },
                    {
                        title: "AI System Integrations",
                        items: ["CRM systems", "Company databases", "Analytics tools", "Internal knowledge bases", "External APIs"]
                    },
                    {
                        title: "Deployment Process",
                        items: ["AI architecture design", "Agent development", "System integrations", "Testing and optimization", "Deployment"]
                    }
                ],
                adminDashboard: {
                    title: "AI OPERATIONS CONTROL DASHBOARD",
                    description: "Full AI operations dashboard used to monitor agent activity and reasoning bounds.",
                    groups: [
                        {
                            title: "Dashboard Features",
                            items: ["Agent activity monitoring", "Conversation logs", "Task execution tracking", "Workflow visualization"]
                        },
                        {
                            title: "AI Analytics",
                            items: ["Response quality metrics", "Task success rates", "Usage analytics"]
                        },
                        {
                            title: "System Controls",
                            items: ["Agent configuration tools", "Permission management", "Safety guardrails"]
                        }
                    ]
                },
                cta: "Request Consultation"
            }
        ],
        maintenance: [
            {
                title: "Standard AI Maintenance",
                price: "$350 / month",
                includes: [
                    "Monthly automation monitoring",
                    "Bug fixes for workflows",
                    "Integration troubleshooting",
                    "AI response tuning",
                    "Minor workflow adjustments",
                    "System health checks"
                ],
                support: [
                    "Business hours support",
                    "Support ticket or email"
                ],
                monitoring: [
                    "Automation execution metrics",
                    "Connection stability checks"
                ]
            },
            {
                title: "Premium AI Operations Support",
                price: "$900 / month",
                includes: [
                    "Full AI system monitoring",
                    "Workflow optimization",
                    "Model performance monitoring",
                    "Automation reliability checks",
                    "Full system inspection every 20 days",
                    "AI prompt optimization",
                    "Agent performance tuning",
                    "System scaling assistance"
                ],
                support: [
                    "24/7 priority support",
                    "Immediate response for critical issues"
                ],
                monitoring: [
                    "Automation reliability monitoring",
                    "Advanced usage analytics"
                ]
            }
        ],
        addOns: [
            "Additional automation workflow — $350 – $800 each",
            "Advanced AI assistant training — $500 – $1,200",
            "Custom AI integrations — Custom Quote",
            "Data pipeline automation — $800 – $2,000",
            "Custom analytics dashboards — $900 – $2,500"
        ],
        comparisonRows: [
            { name: "Automation Scope", s: "1–2 Workflows", g: "3–5 Systems", e: "Agentic Swarm" },
            { name: "AI Capabilities", s: "Basic Prompting", g: "Integrated Assistant", e: "Autonomous Execution" },
            { name: "Admin Dashboard", s: "Basic Logs", g: "Included", e: "Operations Terminal" },
            { name: "Maintenance", s: "Optional", g: "Optional", e: "Recommended" }
        ]
    },
    automation: {
        tiers: [
            {
                title: "Automate Basic",
                monthly: 299,
                annual: 249,
                description: "Streamline workflows and basic business processes.",
                features: [
                    "3 Custom Workflows",
                    "Standard Connectors",
                    "Email Support (48h SLA)"
                ],
                cta: "Get Started"
            },
            {
                title: "Automate Pro",
                monthly: 899,
                annual: 749,
                description: "End-to-end automation spanning multiple departments.",
                isPopular: true,
                features: [
                    "15 Custom Workflows",
                    "Advanced API Integrations",
                    "Priority Support (4h SLA)"
                ],
                cta: "Start Growing"
            },
            {
                title: "Automate Enterprise",
                monthly: 2499,
                annual: 1999,
                description: "High-volume, business-critical automation orchestrations.",
                features: [
                    "Unlimited Workflows",
                    "Complex RPA Deployments",
                    "24/7 Dedicated Support"
                ],
                cta: "Contact Sales"
            }
        ],
        comparisonRows: [
            { name: "Workflows", s: "3", g: "15", e: "Unlimited" },
            { name: "Integrations", s: "Standard", g: "Advanced API", e: "Custom Built" },
            { name: "Support", s: "Email (48h)", g: "Priority (4h)", e: "Dedicated 24/7" },
            { name: "RPA Support", s: false, g: false, e: true },
            { name: "SLA Guarantee", s: false, g: "99.5%", e: "99.99%" }
        ]
    },
    consulting: {
        tiers: [
            {
                title: "Discovery Session",
                priceRange: "$49 – $99",
                description: "Designed for businesses seeking initial guidance on automation and AI opportunities before committing to implementation. (One-time consultation)",
                featureGroups: [
                    {
                        title: "Best Suited For",
                        icon: "Users", color: "#60a5fa",
                        items: ["Startups exploring automation", "Small businesses evaluating AI tools", "Companies identifying inefficient workflows", "Teams planning early-stage automation projects"]
                    },
                    {
                        title: "Session Duration",
                        icon: "Clock", color: "#fbbf24",
                        items: ["45–60 minute strategy consultation via video call"]
                    },
                    {
                        title: "Consulting Focus",
                        icon: "MessageCircle", color: "#c4b5fd",
                        items: ["Identifying repetitive workflows", "Evaluating automation opportunities", "Understanding where AI can improve efficiency", "Reviewing current tools and systems", "Determining project feasibility"]
                    },
                    {
                        title: "Deliverables",
                        icon: "FileText", color: "#e879f9",
                        items: ["Short consultation summary", "Recommended automation opportunities", "Suggested next steps for implementation", "Feasibility insights"]
                    },
                    {
                        title: "Key Benefits",
                        icon: "Award", color: "#34d399",
                        items: ["Quick expert guidance", "Clarity on automation possibilities", "Practical recommendations", "Low commitment entry point"]
                    }
                ],
                cta: "Book Discovery Call"
            },
            {
                title: "Technical Scoping",
                priceRange: "$249 – $599",
                description: "Designed for businesses preparing to implement automation workflows, AI assistants, or internal AI tools, but requiring a clear technical plan before development begins.",
                isPopular: true,
                featureGroups: [
                    {
                        title: "Best Suited For",
                        icon: "Users", color: "#60a5fa",
                        items: ["Companies preparing automation projects", "Teams planning AI integrations", "Businesses improving operational workflows", "Organizations evaluating AI-driven processes"]
                    },
                    {
                        title: "Consultation Scope",
                        icon: "MessageCircle", color: "#c4b5fd",
                        items: ["Workflow analysis", "Automation opportunity mapping", "AI capability evaluation", "Integration feasibility assessment"]
                    },
                    {
                        title: "Architecture Planning",
                        icon: "Layers", color: "#38bdf8",
                        items: ["Automation system structure", "Recommended tools or platforms", "AI model usage suggestions", "Integration architecture overview", "Data flow planning"]
                    },
                    {
                        title: "Implementation Roadmap",
                        icon: "Rocket", color: "#fb7185",
                        items: ["Recommended automation workflows", "Suggested AI assistant capabilities", "Development phases and milestones", "Estimated implementation timeline"]
                    },
                    {
                        title: "Deliverables",
                        icon: "FileText", color: "#e879f9",
                        items: ["Technical scope outline", "Implementation roadmap", "Rough cost estimation ranges", "Timeline projections"]
                    },
                    {
                        title: "Key Benefits",
                        icon: "Award", color: "#34d399",
                        items: ["Prevents costly implementation mistakes", "Provides a clear development blueprint", "Accelerates project kickoff", "Improves project planning accuracy"]
                    }
                ],
                cta: "Start Technical Scoping"
            },
            {
                title: "Enterprise Strategy",
                priceRange: "$750 – $1,950",
                description: "Designed for organizations seeking strategic guidance for large-scale automation or AI adoption.",
                featureGroups: [
                    {
                        title: "Best Suited For",
                        icon: "Building", color: "#60a5fa",
                        items: ["Companies planning large automation initiatives", "Organizations exploring AI-driven operations", "Businesses scaling internal workflows", "Teams implementing long-term automation strategies"]
                    },
                    {
                        title: "Strategy Engagement Scope",
                        icon: "Brain", color: "#a78bfa",
                        items: ["Organization-wide workflow analysis", "Identification of automation opportunities across departments", "AI adoption planning", "Evaluation of system integrations"]
                    },
                    {
                        title: "Enterprise Planning",
                        icon: "Globe", color: "#818cf8",
                        items: ["Automation strategy recommendations", "AI assistant deployment planning", "Internal tool integration strategies", "Long-term AI infrastructure planning"]
                    },
                    {
                        title: "Transformation Roadmap",
                        icon: "Rocket", color: "#fb7185",
                        items: ["Prioritized automation opportunities", "Suggested AI implementation stages", "Workflow improvement strategy", "Integration planning"]
                    },
                    {
                        title: "Deliverables",
                        icon: "FileText", color: "#e879f9",
                        items: ["Strategy presentation", "Automation roadmap document", "AI adoption recommendations", "Risk and feasibility analysis"]
                    },
                    {
                        title: "Strategic Benefits",
                        icon: "Award", color: "#34d399",
                        items: ["Clear automation roadmap", "Alignment between AI capabilities and business goals", "Reduced project risk", "Structured implementation planning"]
                    }
                ],
                cta: "Contact Strategy Team"
            }
        ],
        comparisonRows: [
            { name: "Consulting Depth", s: "Basic Discovery", g: "Technical Blueprints", e: "Enterprise Roadmaps" },
            { name: "Architecture Diagrams", s: false, g: true, e: true },
            { name: "Cost & Timeline Mapped", s: false, g: true, e: true },
            { name: "Department Workflow Analysis", s: false, g: false, e: true }
        ]
    }
};

const faqs = [
    { q: "Can I upgrade or downgrade my plan at any time?", a: "Yes. Plans are fully flexible. Upgrade as your infrastructure needs grow, or downgrade if necessary. Changes take effect at the start of the next billing cycle with no penalties for switching." },
    { q: "Do you offer custom pricing for unique project scopes?", a: "Yes. Our Enterprise tier is designed for custom engagements. Contact our team to scope your specific requirements — we'll provide a tailored proposal with transparent terms and no hidden fees." },
    { q: "What is included in 'Agentic AI Deployment'?", a: "Full design and deployment of autonomous AI agents that execute complex tasks end-to-end — making decisions, interfacing with external APIs, managing multi-step workflows, and continuously improving from operational data." },
    { q: "Is there a setup fee?", a: "Starter and Growth plans have zero setup fees. Enterprise engagements may include a one-time onboarding fee based on integration complexity, clearly scoped before any commitment." },
    { q: "How does the annual billing discount work?", a: "Annual billing saves 20% compared to monthly pricing. You pay upfront for 12 months and receive the discounted rate. Billing cadence can be switched at any renewal period." },
    { q: "What payment methods do you accept?", a: "All major credit cards, ACH bank transfers, and wire transfers for Enterprise. Invoicing with NET-30 terms is available for annual Enterprise contracts." },
    { q: "Can I cancel at any time?", a: "Monthly plans can be cancelled at any time with no fee — access continues through the end of the billing period. Annual plans include a 30-day money-back guarantee." },
    { q: "Do you offer a free trial?", a: "We don't offer a self-serve trial. Every new engagement begins with a complimentary Discovery Consultation where we assess your requirements, demonstrate capabilities, and deliver a detailed implementation proposal — at no cost or obligation." }
];

export default function Pricing() {
    const { openChat } = useChat();
    const [isAnnual, setIsAnnual] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [activeService, setActiveService] = useState('software');
    const [openAdminDash, setOpenAdminDash] = useState(false);
    const [openPremiumDash, setOpenPremiumDash] = useState(false);

    return (
        <>
            <Helmet>
                <title>Pricing — SKYLIX | Scalable AI & Engineering Infrastructure</title>
                <meta name="description" content="Transparent, usage-aligned pricing for software engineering, agentic AI deployment, and automation infrastructure. No hidden fees. Scale when you're ready." />
            </Helmet>

            {/* ── Hero ────────────────────────────── */}
            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        {activeService === 'software' ? (
                            <>
                                <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(255,107,107,0.2)' }}>Software</span>
                                <h1 className="h1" style={{ marginTop: '24px' }}>
                                    Software Solutions for <span className="shimmer-text">Businesses</span>
                                </h1>
                                <p className="p" style={{ marginTop: '24px', marginInline: 'auto', maxWidth: '800px' }}>
                                    Custom websites and digital systems designed to help businesses establish a strong online presence, manage customer interactions, and scale their operations efficiently.
                                </p>
                            </>
                        ) : (
                            <>
                                <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(255,107,107,0.2)' }}>Pricing</span>
                                <h1 className="h1" style={{ marginTop: '24px' }}>
                                    Transparent Pricing for <span className="shimmer-text">Scalable Systems</span>
                                </h1>
                                <p className="p" style={{ marginTop: '24px', marginInline: 'auto' }}>
                                    Usage-aligned plans that scale with your infrastructure. From rapid prototypes to enterprise-grade AI ecosystems — no hidden fees, no lock-in.
                                </p>
                            </>
                        )}


                    </div>

                    {/* ── Floating Service Navigation ───── */}
                    <div style={{
                        position: 'sticky', top: '100px', zIndex: 50,
                        display: 'flex', justifyContent: 'center', marginBottom: '40px',
                        pointerEvents: 'none'
                    }}>
                        <div className="reveal" style={{
                            display: 'flex', gap: '8px', padding: '6px',
                            background: 'rgba(15, 20, 55, 0.65)', border: '1px solid var(--glass-border)',
                            borderRadius: '99px', backdropFilter: 'blur(20px)',
                            pointerEvents: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            overflowX: 'auto', maxWidth: '100%'
                        }}>
                            {[
                                { id: 'software', label: 'Software' },
                                { id: 'ai', label: 'AI Solutions' },
                                { id: 'consulting', label: 'Consulting' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveService(tab.id)}
                                    style={{
                                        padding: '10px 20px', borderRadius: '99px',
                                        border: 'none', cursor: 'pointer',
                                        fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 600,
                                        background: activeService === tab.id ? 'linear-gradient(135deg, var(--color-1), var(--color-2))' : 'transparent',
                                        color: activeService === tab.id ? '#fff' : 'var(--text-muted)',
                                        transition: 'all 0.3s ease', whiteSpace: 'nowrap'
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Pricing Cards ─────────────────── */}
                    <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
                        {pricingData[activeService].tiers.map((tier, idx) => {
                            const price = isAnnual ? tier.annual : tier.monthly;
                            return (
                                <div key={idx} className={`bento-card reveal${tier.isPopular ? ' pricing-popular' : ''}`}
                                    style={{
                                        padding: '40px 32px',
                                        position: 'relative',
                                        border: tier.isPopular ? '1px solid var(--color-1)' : undefined,
                                        boxShadow: tier.isPopular ? '0 0 60px -10px rgba(112,0,255,0.25)' : undefined,
                                        display: 'flex', flexDirection: 'column',
                                        overflow: 'visible',
                                        marginTop: tier.isPopular ? '14px' : '0'
                                    }}>
                                    {tier.isPopular && (
                                        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                                            <span className="badge" style={{ background: 'linear-gradient(135deg, var(--color-1), var(--color-3))', color: '#fff', border: 'none', fontSize: '11px', padding: '5px 16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>Most Popular</span>
                                        </div>
                                    )}

                                    <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>{tier.title}</h3>
                                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px', minHeight: '45px' }}>{tier.description}</p>

                                    <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        {/* Software plans use dynamic price ranges now */}
                                        <span style={{ fontSize: tier.priceRange ? '32px' : '44px', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}>
                                            {tier.priceRange || `$${price}`}
                                        </span>
                                        {!tier.priceRange && <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/month</span>}
                                    </div>

                                    <Link
                                        to={tier.cta === 'Request Quote' ? '/contact' : '/contact'}
                                        className={tier.isPopular ? 'btn btn-accent' : 'btn btn-outline'}
                                        style={{ width: '100%', textAlign: 'center', marginBottom: '28px' }}
                                    >{tier.cta}</Link>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                                        {/* Nested feature groups for detailed Software solutions */}
                                        {tier.featureGroups && tier.featureGroups.map((group, gIdx) => (
                                            <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    {group.icon && IconMap[group.icon] && (
                                                        React.createElement(IconMap[group.icon], { size: 16, style: { color: group.color || '#34d399' } })
                                                    )}
                                                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: group.color || '#fff' }}>{group.title}</h4>
                                                </div>
                                                <div style={{ paddingLeft: group.icon ? '24px' : '0' }}>
                                                    {group.items.map((f, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '8px' }}>
                                                            {group.icon ? (
                                                                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: group.color || '#34d399', marginTop: '7px', flexShrink: 0 }}></div>
                                                            ) : (
                                                                <Check size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                                                            )}
                                                            <span>{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Fallback for other standard plans */}
                                        {tier.features && tier.features.map((f, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                                <Check size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Additional Items pushed to bottom */}
                                    <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>

                                        {/* Built-in Admin Dashboard Toggle */}
                                        {tier.adminDashboard && (
                                            <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--glass-border)', borderRadius: '8px', overflow: 'hidden' }}>
                                                <button
                                                    onClick={() => setOpenAdminDash(openAdminDash === idx ? null : idx)}
                                                    style={{ width: '100%', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600 }}
                                                >
                                                    {tier.adminDashboard.title}
                                                    <span style={{ fontSize: '16px', color: 'var(--text-muted)', transform: openAdminDash === idx ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
                                                </button>
                                                <div style={{ maxHeight: openAdminDash === idx ? '1200px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                                    <div style={{ padding: '0 14px 14px' }}>
                                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.5' }}>{tier.adminDashboard.description}</p>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                            {tier.adminDashboard.groups.map((group, i) => (
                                                                <div key={i}>
                                                                    <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--light)', marginBottom: '6px' }}>{group.title}</h5>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                        {group.items.map((item, j) => (
                                                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                                                                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#c4b5fd', marginTop: '6px', flexShrink: 0 }}></div>
                                                                                <span>{item}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Premium Admin Upgrade Toggle */}
                                        {tier.premiumUpgrade && (
                                            <div style={{ background: 'rgba(112,0,255,0.06)', border: '1px solid rgba(112,0,255,0.2)', borderRadius: '8px', overflow: 'hidden' }}>
                                                <button
                                                    onClick={() => setOpenPremiumDash(openPremiumDash === idx ? null : idx)}
                                                    style={{ width: '100%', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', color: 'var(--color-1)', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 700, textAlign: 'left', letterSpacing: '0.02em' }}
                                                >
                                                    <div>
                                                        {tier.premiumUpgrade.title}
                                                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: 400, letterSpacing: 'normal' }}>Price: {tier.premiumUpgrade.price}</div>
                                                    </div>
                                                    <span style={{ fontSize: '16px', color: 'var(--color-1)', transform: openPremiumDash === idx ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>+</span>
                                                </button>
                                                <div style={{ maxHeight: openPremiumDash === idx ? '1000px' : '0', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                                                    <div style={{ padding: '0 14px 14px' }}>
                                                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.5' }}>{tier.premiumUpgrade.description}</p>
                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                            {tier.premiumUpgrade.groups.map((group, i) => (
                                                                <div key={i}>
                                                                    <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--light)', marginBottom: '6px' }}>{group.title}</h5>
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                                        {group.items.map((item, j) => (
                                                                            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                                                                                <Zap size={10} style={{ color: 'var(--color-1)', flexShrink: 0, marginTop: '3px' }} />
                                                                                <span>{item}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Addons display pinned to bottom */}
                                        {tier.addons && (
                                            <div style={{ marginTop: '8px' }}>
                                                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}><strong>Add-Ons:</strong> {tier.addons}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── Maintenance Plans ─────────────────── */}
                    {pricingData[activeService].maintenance && (
                        <div style={{ marginTop: '80px' }}>
                            <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
                                <h3 className="h3">{activeService === 'software' ? 'Website Maintenance & Support' : 'Optional AI Maintenance Plans'}</h3>
                                <p className="p" style={{ margin: '8px auto', color: 'var(--text-muted)' }}>
                                    {activeService === 'software' ? 'Keep your systems secure, updated, and performing optimally.' : 'Ongoing system monitoring, optimization, and support.'}
                                </p>
                            </div>
                            <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
                                {pricingData[activeService].maintenance.map((plan, idx) => (
                                    <div key={idx} className="bento-card reveal" style={{ padding: '40px 32px' }}>
                                        <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>{plan.title}</h3>
                                        <div style={{ margin: '16px 0 24px 0', fontSize: '28px', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: 'var(--color-1)' }}>
                                            {plan.price}
                                        </div>

                                        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#fff' }}>Includes</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                                            {plan.includes.map((f, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                                    <Check size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#fff' }}>Support</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                                            {plan.support.map((f, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                                    <Shield size={14} style={{ color: '#c4b5fd', flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#fff' }}>Monitoring</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {plan.monitoring.map((f, i) => (
                                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                                                    <Zap size={14} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Optional Add-On Services ─────────────────── */}
                    {pricingData[activeService].addOns && (
                        <div style={{ marginTop: '60px' }}>
                            <div className="bento-card reveal" style={{ padding: '40px', background: 'rgba(15, 20, 55, 0.4)' }}>
                                <h3 className="h3" style={{ marginBottom: '24px', fontSize: '22px' }}>Optional Add-On Services</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                                    {pricingData[activeService].addOns.map((addon, idx) => {
                                        const [name, price] = addon.split(' — ');
                                        return (
                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{name}</span>
                                                <span style={{ color: 'var(--color-1)', fontSize: '14px', fontWeight: 600 }}>{price ? `$${price.replace('$', '')}` : ''}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="section-divider"></div>

            {/* ── Feature Comparison ──────────────── */}
            <section className="section" style={{ background: 'rgba(15, 20, 55, 0.25)' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="h2">Compare <span className="glow-line">Plans</span></h2>
                        <p className="p" style={{ margin: '16px auto' }}>Side-by-side capability comparison across all tiers.</p>
                    </div>

                    <div className="reveal" style={{ overflowX: 'auto' }}>
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', minWidth: '200px' }}>Features</th>
                                    <th>{pricingData[activeService]?.tiers?.[0]?.title?.replace(' Website', '') || 'Starter'}</th>
                                    <th style={{ color: 'var(--color-2)' }}>{pricingData[activeService]?.tiers?.[1]?.title?.replace(' Website', '') || 'Growth'}</th>
                                    <th style={{ color: 'var(--color-1)' }}>{pricingData[activeService]?.tiers?.[2]?.title?.replace(' Website', '').replace(' Interactive', '') || 'Enterprise'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pricingData[activeService].comparisonRows.map((row, idx) => (
                                    <tr key={idx}>
                                        <td style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{row.name}</td>
                                        {['s', 'g', 'e'].map(col => (
                                            <td key={col} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {row[col] === true ? <Check size={18} style={{ color: '#34d399', margin: '0 auto', display: 'block' }} /> :
                                                    row[col] === false ? <X size={18} style={{ color: 'rgba(255,255,255,0.15)', margin: '0 auto', display: 'block' }} /> :
                                                        <span style={{ fontWeight: col !== 's' ? 600 : 400, color: col !== 's' ? '#fff' : 'var(--text-muted)' }}>{row[col]}</span>}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* ── Trust Elements ──────────────────── */}
            <section className="section">
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="h2">Built for <span className="glow-line">Trust</span></h2>
                    </div>
                    <div className="bento-grid reveal">
                        {[
                            { icon: <Shield size={22} />, color: '#34d399', bg: 'rgba(16,185,129,0.15)', title: 'SOC2 & GDPR Compliant', desc: 'All processes follow SOC2 Type II controls with GDPR-compliant data handling across every tier.' },
                            { icon: <Lock size={22} />, color: '#c4b5fd', bg: 'rgba(112,0,255,0.15)', title: 'End-to-End Encryption', desc: 'Data encrypted in transit and at rest. Zero-trust architecture standard for Enterprise deployments.' },
                            { icon: <Clock size={22} />, color: '#fbbf24', bg: 'rgba(245,158,11,0.15)', title: '99.99% Uptime SLA', desc: 'Enterprise-grade availability with automated failover, health monitoring, and incident response.' },
                            { icon: <HeartPulse size={22} />, color: '#38bdf8', bg: 'rgba(56,189,248,0.15)', title: 'HIPAA Ready', desc: 'Healthcare-compliant infrastructure available for qualifying Enterprise deployments with BAA support.' }
                        ].map((item, i) => (
                            <div key={i} className="bento-card" style={{ padding: '32px' }}>
                                <div className="bento-icon" style={{ background: item.bg, color: item.color }}>{item.icon}</div>
                                <h3 style={{ marginTop: '16px' }}>{item.title}</h3>
                                <p style={{ marginTop: '8px', fontSize: '14px', lineHeight: '1.7', color: 'var(--text-muted)' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* ── Custom Solutions Banner ─────────── */}
            <section className="section">
                <div className="container">
                    <div className="bento-card bento-span-2 reveal" style={{
                        padding: '60px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden',
                        border: '1px solid var(--color-1)',
                        background: 'linear-gradient(135deg, var(--glass-strong), var(--bg-elevated))'
                    }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '250px', height: '250px', background: 'var(--color-1)', opacity: 0.15, filter: 'blur(80px)', borderRadius: '50%' }} />
                        <h2 style={{ fontSize: '28px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px', position: 'relative', zIndex: 1 }}>Need a Custom Solution?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', maxWidth: '600px', marginInline: 'auto', position: 'relative', zIndex: 1, lineHeight: '1.7' }}>
                            Have a complex architecture or enterprise-scale requirements? We design tailored engagements with dedicated engineering teams, custom scoping, and transparent commercial terms.
                        </p>
                        <Link to="/contact" className="btn btn-primary" style={{ position: 'relative', zIndex: 1 }}>
                            Contact Sales <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="section-divider"></div>

            {/* ── FAQs ──────────────────────────── */}
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="h2">Frequently Asked <span className="glow-line">Questions</span></h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bento-card reveal" style={{ padding: 0, overflow: 'hidden' }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    style={{
                                        width: '100%', padding: '20px 24px',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        color: '#fff', fontWeight: 600, fontSize: '15px', textAlign: 'left',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                                    }}
                                >
                                    {faq.q}
                                    <span style={{
                                        fontSize: '20px', fontWeight: 300, color: 'var(--text-muted)',
                                        transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s', flexShrink: 0, marginLeft: '16px'
                                    }}>+</span>
                                </button>
                                <div style={{
                                    maxHeight: openFaq === idx ? '300px' : '0',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}>
                                    <p style={{
                                        padding: '0 24px 20px', margin: 0,
                                        fontSize: '14px', lineHeight: '1.8', color: 'var(--text-muted)'
                                    }}>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Final CTA ─────────────────────── */}
            <section className="section section-glow" style={{ background: 'rgba(10, 14, 40, 0.30)' }}>
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <h2 className="h2 reveal">Ready to <span className="shimmer-text">Scale</span>?</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>
                        Join the teams using SKYLIX infrastructure to ship faster, operate leaner, and scale with confidence.
                    </p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <button className="btn btn-accent" onClick={() => openChat('sales')}>Book a Demo</button>
                        <Link className="btn btn-ghost" to="/contact">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
