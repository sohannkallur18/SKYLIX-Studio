/**
 * SKYLIX Chat Engine — Intelligent Conversation System
 * Keyword-based intent detection, contextual responses,
 * service discovery, lead qualification, and contact redirection.
 */

// ── Intent Keywords ──────────────────────────────────────
const INTENTS = {
    greeting: {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings', 'sup', 'yo'],
        priority: 1
    },
    services_overview: {
        keywords: ['services', 'what do you do', 'what you offer', 'offerings', 'solutions', 'help me with', 'what can you build'],
        priority: 2
    },
    ai_services: {
        keywords: ['ai', 'artificial intelligence', 'machine learning', 'agentic', 'agents', 'automation', 'automate', 'chatbot', 'nlp', 'llm', 'gpt'],
        priority: 3
    },
    web_dev: {
        keywords: ['website', 'web app', 'web development', 'frontend', 'backend', 'full stack', 'react', 'node', 'web design'],
        priority: 3
    },
    mobile_dev: {
        keywords: ['mobile', 'ios', 'android', 'app development', 'mobile app', 'react native', 'flutter'],
        priority: 3
    },
    cloud_services: {
        keywords: ['cloud', 'aws', 'azure', 'devops', 'infrastructure', 'deployment', 'hosting', 'scaling', 'kubernetes'],
        priority: 3
    },
    pricing: {
        keywords: ['price', 'pricing', 'cost', 'budget', 'quote', 'estimate', 'how much', 'rates', 'packages', 'affordable'],
        priority: 4
    },
    contact: {
        keywords: ['contact', 'reach', 'call', 'email', 'talk to someone', 'speak', 'connect', 'get in touch', 'human', 'representative'],
        priority: 5
    },
    consultation: {
        keywords: ['consult', 'consultation', 'meeting', 'schedule', 'book', 'demo', 'appointment', 'discovery call'],
        priority: 5
    },
    project_inquiry: {
        keywords: ['project', 'hire', 'work together', 'collaboration', 'partner', 'build', 'develop', 'create', 'need help', 'looking for'],
        priority: 4
    },
    about: {
        keywords: ['about', 'who are you', 'company', 'team', 'skylix', 'tell me about', 'your story'],
        priority: 2
    },
    support: {
        keywords: ['support', 'help', 'issue', 'problem', 'bug', 'error', 'trouble', 'fix', 'broken', 'not working'],
        priority: 3
    },
    farewell: {
        keywords: ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'cheers', 'later', 'that\'s all', 'done'],
        priority: 1
    }
};

// ── Response Templates ───────────────────────────────────
const RESPONSES = {
    greeting: [
        {
            text: "Welcome to SKYLIX! 👋 I'm your AI assistant.\n\nI can help you explore our software solutions, AI capabilities, and services. What are you looking for today?",
            quickReplies: ['Our Services', 'AI Solutions', 'Get a Quote', 'Talk to Sales']
        }
    ],
    services_overview: [
        {
            text: "At SKYLIX, we deliver end-to-end digital solutions:\n\n🚀 **Custom Software Development** — Scalable applications tailored to your business\n\n🤖 **Agentic AI & Automation** — Intelligent agents that replace manual workflows\n\n🌐 **Web & Mobile Applications** — Premium digital experiences\n\n☁️ **Cloud & DevOps** — Modern infrastructure and deployment\n\nWhich area interests you most?",
            quickReplies: ['AI & Automation', 'Web Development', 'Mobile Apps', 'Cloud & DevOps', 'Get a Quote']
        }
    ],
    ai_services: [
        {
            text: "Our **Agentic AI** solutions are built to transform your operations:\n\n🧠 **Autonomous AI Agents** — Agents that handle tasks end-to-end without human intervention\n\n⚡ **Workflow Automation** — Replace manual processes with intelligent pipelines\n\n💬 **Conversational AI** — Smart chatbots and virtual assistants\n\n📊 **AI Analytics** — Predictive insights and data intelligence\n\nWe've helped businesses achieve up to **10x efficiency gains**. Want to see how AI could work for you?",
            quickReplies: ['Book Consultation', 'See Case Studies', 'Pricing Info', 'Contact Team']
        }
    ],
    web_dev: [
        {
            text: "Our web development team builds **premium digital experiences**:\n\n🎨 **Frontend Excellence** — React, Next.js, modern UI/UX\n\n⚙️ **Backend Engineering** — Node.js, Python, robust APIs\n\n🔧 **Full-Stack Solutions** — End-to-end from design to deployment\n\n📱 **Responsive Design** — Perfect on every device\n\nEvery project includes performance optimization, SEO, and security best practices.",
            quickReplies: ['Start a Project', 'See Portfolio', 'Get a Quote', 'Talk to Sales']
        }
    ],
    mobile_dev: [
        {
            text: "We build **native-quality mobile applications**:\n\n📱 **Cross-Platform** — React Native, Flutter for iOS & Android\n\n🎯 **Native Development** — Swift, Kotlin for maximum performance\n\n🔄 **API Integration** — Seamless backend connectivity\n\n🧪 **Quality Assurance** — Rigorous testing across devices\n\nFrom concept to App Store launch, we handle the complete lifecycle.",
            quickReplies: ['Discuss My App Idea', 'Get a Quote', 'See Our Work', 'Contact Us']
        }
    ],
    cloud_services: [
        {
            text: "Our cloud & DevOps services ensure your infrastructure is **scalable and reliable**:\n\n☁️ **Cloud Migration** — AWS, Azure, GCP strategy & execution\n\n🔄 **CI/CD Pipelines** — Automated build, test, deploy workflows\n\n📈 **Auto-Scaling** — Handle traffic spikes gracefully\n\n🔒 **Security & Monitoring** — 24/7 infrastructure protection\n\nWe help teams ship faster with confidence.",
            quickReplies: ['Infrastructure Audit', 'Get a Quote', 'Talk to an Expert']
        }
    ],
    pricing: [
        {
            text: "Our pricing is tailored to your project's scope and requirements.\n\n💰 Every engagement starts with a **free discovery consultation** where we:\n\n• Understand your business goals\n• Define project scope and timeline\n• Provide a transparent, detailed proposal\n\nNo hidden fees. No lock-in contracts.\n\n👉 **Visit our Contact page** to schedule your free consultation and get a custom quote.",
            quickReplies: ['Go to Contact Page', 'Book Consultation', 'Talk to Sales'],
            redirectHint: true
        }
    ],
    contact: [
        {
            text: "We'd love to connect with you! 🤝\n\n📋 The best way to reach us is through our **Contact page**, where you can:\n\n• Submit your project details\n• Request a callback\n• Schedule a consultation\n\nOur team typically responds within **2-4 business hours**.",
            quickReplies: ['Go to Contact Page'],
            link: { text: '→ Open Contact Page', url: '/contact' }
        }
    ],
    consultation: [
        {
            text: "Great choice! 🎯 A discovery consultation is the perfect first step.\n\nDuring our **free 30-min session**, we'll:\n\n• Understand your project vision\n• Identify the best technology approach\n• Outline a roadmap and timeline\n• Provide a preliminary estimate\n\n📋 **Head to our Contact page** to submit your details and we'll schedule your session.",
            quickReplies: ['Go to Contact Page'],
            link: { text: '→ Schedule on Contact Page', url: '/contact' }
        }
    ],
    project_inquiry: [
        {
            text: "Exciting! We'd love to hear about your project. 🚀\n\nTo give you the best possible guidance, please share your requirements through our **Contact page**. Include:\n\n• Brief project description\n• Timeline and budget range\n• Any preferred technologies\n\nOur solutions team will reach out with a tailored proposal.",
            quickReplies: ['Go to Contact Page', 'Learn About Services'],
            link: { text: '→ Submit Project Details', url: '/contact' }
        }
    ],
    about: [
        {
            text: "**SKYLIX** is a software solutions and Agentic AI company.\n\n🎯 **Mission** — Replace manual chaos with intelligent automation\n\n🏢 **What We Do** — Custom software, AI agents, web & mobile apps, cloud infrastructure\n\n🌟 **Why Choose Us** — Enterprise-grade quality, startup agility, transparent pricing\n\nWe believe in building technology that works autonomously, so your team can focus on what matters.",
            quickReplies: ['Our Services', 'AI Solutions', 'Contact Us', 'Get a Quote']
        }
    ],
    support: [
        {
            text: "I'm here to help! 🛠️\n\nFor **technical support**, the fastest way to get assistance is through our Contact page where our support team can track and resolve your issue.\n\nFor general questions, feel free to ask me here — I'll do my best to help!",
            quickReplies: ['Go to Contact Page', 'Our Services', 'FAQ']
        }
    ],
    farewell: [
        {
            text: "Thanks for chatting with us! 🙏\n\nIf you need anything else, I'm always here. Feel free to come back anytime.\n\nHave a great day! ✨",
            quickReplies: ['Start Over']
        }
    ],
    fallback: [
        {
            text: "I appreciate your question! While I might not have the perfect answer for that, I can definitely help you with:\n\n• 🚀 Our software and AI services\n• 💰 Pricing and project inquiries\n• 📞 Connecting you with our team\n\nOr you can reach our team directly through the Contact page.",
            quickReplies: ['Our Services', 'AI Solutions', 'Contact Us', 'Get a Quote']
        }
    ],
    faq: [
        {
            text: "Here are some frequently asked questions:\n\n❓ **What technologies do you use?**\nReact, Node.js, Python, AWS, and cutting-edge AI frameworks.\n\n❓ **How long does a project take?**\nTypically 4-12 weeks depending on scope.\n\n❓ **Do you offer maintenance?**\nYes, ongoing support and maintenance packages are available.\n\n❓ **What's your pricing model?**\nProject-based and retainer options. Free consultation to discuss.",
            quickReplies: ['Get a Quote', 'Book Consultation', 'Contact Us']
        }
    ]
};

// ── Quick Reply Mappings ─────────────────────────────────
const QUICK_REPLY_MAP = {
    'our services': 'services_overview',
    'learn about services': 'services_overview',
    'ai solutions': 'ai_services',
    'ai & automation': 'ai_services',
    'web development': 'web_dev',
    'mobile apps': 'mobile_dev',
    'cloud & devops': 'cloud_services',
    'get a quote': 'pricing',
    'pricing info': 'pricing',
    'talk to sales': 'contact',
    'contact team': 'contact',
    'contact us': 'contact',
    'go to contact page': 'contact',
    'book consultation': 'consultation',
    'discuss my app idea': 'consultation',
    'start a project': 'consultation',
    'infrastructure audit': 'consultation',
    'talk to an expert': 'contact',
    'see case studies': 'about',
    'see portfolio': 'about',
    'see our work': 'about',
    'submit project details': 'project_inquiry',
    'start over': 'greeting',
    'faq': 'faq'
};

// ── Core Engine ──────────────────────────────────────────
function detectIntent(message) {
    const lower = message.toLowerCase().trim();

    // Check quick reply mappings first (exact match)
    if (QUICK_REPLY_MAP[lower]) {
        return QUICK_REPLY_MAP[lower];
    }

    let bestIntent = null;
    let bestScore = 0;

    for (const [intent, config] of Object.entries(INTENTS)) {
        let score = 0;
        for (const keyword of config.keywords) {
            if (lower.includes(keyword)) {
                // Longer keyword matches are weighted more
                score += keyword.split(' ').length * config.priority;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    }

    return bestIntent || 'fallback';
}

function getResponse(intent) {
    const responses = RESPONSES[intent] || RESPONSES.fallback;
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Process a user message and return the bot response.
 * @param {string} message The user's message text
 * @param {string} activeTab 'support' or 'sales'
 * @returns {{ text: string, quickReplies?: string[], link?: { text: string, url: string } }}
 */
export function processMessage(message, activeTab = 'support') {
    const intent = detectIntent(message);
    const response = getResponse(intent);

    return {
        text: response.text,
        quickReplies: response.quickReplies || [],
        link: response.link || null
    };
}

/**
 * Get the initial welcome message with quick replies.
 * @param {string} tab 'support' or 'sales'
 * @returns {object}
 */
export function getWelcomeMessage(tab = 'support') {
    if (tab === 'sales') {
        return {
            text: "Welcome to SKYLIX Sales! 🚀\n\nI can help you understand our solutions, get pricing information, or connect you with our sales team.\n\nWhat would you like to explore?",
            quickReplies: ['Our Services', 'AI Solutions', 'Get a Quote', 'Book Consultation']
        };
    }
    return {
        text: "Hi there! 👋 I'm the SKYLIX assistant.\n\nI'm here to help you learn about our services, answer questions, or connect you with our team.\n\nHow can I help you today?",
        quickReplies: ['Our Services', 'AI Solutions', 'Get a Quote', 'Contact Us']
    };
}
