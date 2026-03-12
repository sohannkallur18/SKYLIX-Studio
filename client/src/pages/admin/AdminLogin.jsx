import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
    const { login, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Redirect to dashboard if already authenticated
    if (!authLoading && isAuthenticated) {
        return <Navigate to="/skylix-admin-portal/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        const result = await login(username, password);
        if (result.success) {
            navigate('/skylix-admin-portal/dashboard', { replace: true });
        } else {
            setError(result.error || 'Login failed.');
        }
        setSubmitting(false);
    };

    if (authLoading) {
        return (
            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                        <div className="admin-spinner" style={{ margin: '0 auto 16px' }}></div>
                        Verifying session...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <div style={styles.brandRow}>
                    <div style={styles.brandDot}></div>
                    <span style={styles.brandName}>SKYLIX</span>
                </div>
                <p style={styles.subtitle}>Admin Portal</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="admin"
                            required
                            autoComplete="username"
                            disabled={submitting}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                style={styles.input}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                                disabled={submitting}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeBtn}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                tabIndex={-1}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <button style={{ ...styles.btn, opacity: submitting ? 0.7 : 1 }} type="submit" disabled={submitting}>
                        {submitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={styles.footer}>Secure access only. All activity is logged.</p>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#06010F',
        padding: '20px'
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(15, 20, 55, 0.35)',
        border: '1px solid rgba(99, 120, 255, 0.12)',
        borderRadius: '20px',
        padding: '48px 40px',
        backdropFilter: 'blur(20px)'
    },
    brandRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
        marginBottom: '4px'
    },
    brandDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)'
    },
    brandName: {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800,
        fontSize: '22px',
        color: '#fff',
        letterSpacing: '0.08em'
    },
    subtitle: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '13px',
        fontWeight: 500,
        marginBottom: '32px'
    },
    error: {
        background: 'rgba(255,107,107,0.1)',
        border: '1px solid rgba(255,107,107,0.3)',
        borderRadius: '10px',
        padding: '12px 16px',
        color: '#FF6B6B',
        fontSize: '13px',
        marginBottom: '20px',
        textAlign: 'center'
    },
    formGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        fontSize: '12px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '8px'
    },
    input: {
        width: '100%',
        padding: '14px 16px',
        background: 'rgba(15, 20, 55, 0.45)',
        border: '1px solid rgba(99, 120, 255, 0.14)',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '15px',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
    },
    eyeBtn: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px',
        lineHeight: 1
    },
    btn: {
        width: '100%',
        padding: '14px',
        background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
        border: 'none',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 600,
        fontFamily: "'Space Grotesk', sans-serif",
        cursor: 'pointer',
        marginTop: '8px',
        transition: 'opacity 0.2s'
    },
    footer: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.2)',
        fontSize: '11px',
        marginTop: '24px'
    }
};
