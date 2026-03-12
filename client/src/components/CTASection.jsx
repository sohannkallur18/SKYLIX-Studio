import React from 'react';
import { ArrowRight } from './Icons';
import { Link } from 'react-router-dom';

const CTASection = ({
    title = "Ready to Transform Your Operations?",
    subtitle = "Join the teams leveraging SKYLIX's autonomous AI infrastructure to ship faster and scale further.",
    primaryBtnText = "Book a Demo",
    primaryBtnLink = "/contact",
    secondaryBtnText = "View Pricing",
    secondaryBtnLink = "/pricing"
}) => {
    return (
        <section className="section section-glow" style={{ background: 'rgba(0,0,0,0.15)' }}>
            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                    <h2 className="h2 reveal">{title}</h2>
                    <p className="p reveal" style={{ margin: '24px auto' }}>{subtitle}</p>
                    <div className="row reveal" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <Link to={primaryBtnLink} className="btn btn-accent">
                            {primaryBtnText} <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                        </Link>
                        <Link to={secondaryBtnLink} className="btn btn-ghost">{secondaryBtnText}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
