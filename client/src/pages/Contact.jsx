import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { Zap, Mail, Building, Phone, Clock, Shield, CheckCircle } from '../components/Icons';

export default function Contact() {
    const { openChat } = useChat();

    const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
    const [status, setStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                // Parse server validation errors
                if (data.errors && Array.isArray(data.errors)) {
                    setErrorMsg(data.errors.join(' '));
                } else {
                    setErrorMsg(data.error || 'Failed to send your message.');
                }
                setStatus('error');
                return;
            }
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' });
        } catch {
            setErrorMsg('Network error. Please check your connection and try again.');
            setStatus('error');
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact SKYLIX — Start Your Engineering Engagement</title>
                <meta name="description" content="Connect with SKYLIX for custom software engineering, AI systems, automation infrastructure, or technical consulting. We respond within 24 hours." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px' }}>
                <div className="container">
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span className="badge" style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid rgba(124,58,237,0.2)' }}>Contact Us</span>
                        <h1 className="h1" style={{ marginTop: '24px' }}>Let's Start <span className="shimmer-text">Engineering</span></h1>
                        <p className="p" style={{ marginTop: '16px', marginInline: 'auto' }}>Describe your project requirements. We'll respond within 24 hours with a scoped proposal and technical recommendation.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'start' }}>
                        {/* Contact Form */}
                        <form className="bento-card reveal" style={{ padding: '44px' }} onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input className="form-input" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email *</label>
                                    <input className="form-input" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Your Email Address" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Contact Number " />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Company</label>
                                    <input className="form-input" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Service Interest</label>
                                    <select className="form-select" name="service" value={formData.service} onChange={handleChange}>
                                        <option value="">Select a service</option>
                                        <option value="software">Software Development</option>
                                        <option value="ai">AI Solutions</option>
                                        <option value="automation">Automation</option>
                                        <option value="consulting">Consulting</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Budget Range</label>
                                    <select className="form-select" name="budget" value={formData.budget} onChange={handleChange}>
                                        <option value="">Select budget</option>
                                        <option value="10k-25k">$100 – $500</option>
                                        <option value="25k-50k">$500 – $1000</option>
                                        <option value="50k-100k">$1000 – $5000</option>
                                        <option value="100k+">$5000+</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Project Details *</label>
                                <textarea className="form-textarea" name="message" value={formData.message} onChange={handleChange} required placeholder="Describe your project goals, timeline, and any technical requirements..." />
                            </div>
                            <button className="btn btn-accent" type="submit" disabled={status === 'sending'} style={{ width: '100%', marginTop: '12px', padding: '16px 32px', fontSize: '15px' }}>
                                {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                            </button>
                            {status === 'success' && <p style={{ marginTop: '16px', color: '#34d399', fontSize: '14px', textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Inquiry received. Our team will follow up within 24 hours.</p>}
                            {status === 'error' && <p style={{ marginTop: '16px', color: '#f87171', fontSize: '14px', textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{errorMsg}</p>}
                        </form>

                        {/* Sidebar */}
                        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="bento-card" style={{ padding: '32px' }}>
                                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.01em', color: 'var(--text-bright)' }}>Contact Information</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Mail size={17} style={{ color: 'var(--accent)' }} />
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Email</span>
                                            <a href="mailto:sohannkallur18@gmail.com" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--text-bright)', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>sohannkallur18@gmail.com</a>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Phone size={17} style={{ color: 'var(--accent)' }} />
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Phone</span>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--text-bright)' }}>9900226838</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <Building size={17} style={{ color: 'var(--accent)' }} />
                                        </div>
                                        <div>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 600, color: 'var(--muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Office</span>
                                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--text-bright)' }}>Remote-First, Worldwide</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card" style={{ padding: '32px' }}>
                                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 700, marginBottom: '20px', letterSpacing: '-0.01em', color: 'var(--text-bright)' }}>What to Expect</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {['Sub-24-hour response time', 'Complimentary discovery session', 'Scoped technical proposal', 'Zero-obligation engagement'].map((item, i) => (
                                        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13.5px', fontWeight: 500, color: 'var(--text-muted)' }}>
                                            <CheckCircle size={15} style={{ color: '#34d399', flexShrink: 0 }} /> {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bento-card" style={{ padding: '32px' }}>
                                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '17px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.01em', color: 'var(--text-bright)' }}>Quick Chat</h3>
                                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '18px' }}>
                                    Need an immediate answer? Connect with our engineering team directly.
                                </p>
                                <button className="btn btn-ghost btn-sm" onClick={() => openChat('general')} style={{ width: '100%', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    <Zap size={14} style={{ marginRight: '6px' }} /> Open Live Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
