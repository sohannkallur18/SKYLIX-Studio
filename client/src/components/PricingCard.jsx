import React from 'react';
import { Check } from '../Icons';

const PricingCard = ({
    title,
    price,
    period = "/month",
    description,
    features = [],
    buttonText = "Get Started",
    isPopular = false,
    onButtonClick
}) => {
    return (
        <div className={`bento-card${isPopular ? ' pricing-popular' : ''}`}
            style={{
                padding: '40px 32px',
                position: 'relative',
                border: isPopular ? '1px solid var(--color-1)' : undefined,
                boxShadow: isPopular ? '0 0 60px -10px rgba(112,0,255,0.25)' : undefined,
                display: 'flex', flexDirection: 'column',
                transition: 'all 0.3s',
            }}
        >
            {isPopular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)' }}>
                    <span className="badge" style={{ background: 'linear-gradient(135deg, var(--color-1), var(--color-3))', color: '#fff', border: 'none', fontSize: '11px', padding: '5px 16px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Most Popular
                    </span>
                </div>
            )}

            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', minHeight: '45px' }}>{description}</p>
            </div>

            <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '44px', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", color: '#fff' }}>{price}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{period}</span>
            </div>

            <button
                onClick={onButtonClick}
                className={isPopular ? 'btn btn-accent' : 'btn btn-outline'}
                style={{ width: '100%', marginBottom: '28px' }}
            >
                {buttonText}
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                {features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <Check size={16} style={{ color: '#34d399', flexShrink: 0 }} />
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingCard;
