import React from 'react';

const FeatureBlock = ({ icon: Icon, title, description, className = '' }) => {
    return (
        <div className={`bento-card ${className}`} style={{ transition: 'all 0.3s' }}>
            <div className="bento-icon" style={{ background: 'var(--glass-high)', marginBottom: '16px' }}>
                {Icon && <Icon size={22} style={{ color: 'var(--color-2)' }} />}
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: '#fff', marginBottom: '8px' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>{description}</p>
        </div>
    );
};

export default FeatureBlock;
