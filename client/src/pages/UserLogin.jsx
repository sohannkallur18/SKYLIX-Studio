import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserAuth } from '../context/UserAuthContext';
import { Lock, Mail, ArrowRight } from '../components/Icons';

export default function UserLogin() {
    const { unifiedLogin, isAuthenticated } = useUserAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Redirect info message (e.g., from Contact page guard)
    const redirectMsg = searchParams.get('msg');

    // If already logged in as USER, redirect (Admins handled by their own context or manual nav)
    if (isAuthenticated) {
        navigate(redirect, { replace: true });
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const result = await unifiedLogin(loginIdentifier, password);

        if (result.success) {
            if (result.role === 'admin') {
                // Force reload or nav to admin portal so AdminProvider picks up the token
                window.location.href = '/skylix-admin-portal/dashboard';
            } else {
                navigate(redirect, { replace: true });
            }
        } else {
            setError(result.error || 'Login failed.');
        }
        setSubmitting(false);
    };

    return (
        <>
            <Helmet>
                <title>Login — SKYLIX</title>
                <meta name="description" content="Log in to your SKYLIX account to access our services and contact our team." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '460px' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, rgba(255,107,107,0.15), rgba(255,142,83,0.15))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px', border: '1px solid rgba(255,107,107,0.2)'
                        }}>
                            <Lock size={24} style={{ color: '#FF6B6B' }} />
                        </div>
                        <h1 className="h2">Welcome <span className="shimmer-text">Back</span></h1>
                        <p className="p" style={{ marginTop: '12px' }}>Sign in to your SKYLIX account</p>
                    </div>

                    {redirectMsg && (
                        <div className="reveal" style={{
                            background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)',
                            borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
                            color: '#fbbf24', fontSize: '13px', textAlign: 'center'
                        }}>
                            {redirectMsg}
                        </div>
                    )}

                    <form className="bento-card reveal" style={{ padding: '36px' }} onSubmit={handleSubmit}>
                        {error && (
                            <div style={{
                                background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)',
                                borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
                                color: '#f87171', fontSize: '13px', textAlign: 'center'
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label">Email or Username</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{
                                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.25)', pointerEvents: 'none'
                                }} />
                                <input
                                    className="form-input"
                                    type="text"
                                    value={loginIdentifier}
                                    onChange={e => setLoginIdentifier(e.target.value)}
                                    placeholder="username "
                                    required
                                    autoComplete="username"
                                    disabled={submitting}
                                    style={{ paddingLeft: '42px' }}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '24px' }}>
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{
                                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.25)', pointerEvents: 'none'
                                }} />
                                <input
                                    className="form-input"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    disabled={submitting}
                                    style={{ paddingLeft: '42px', paddingRight: '48px' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px',
                                        color: 'rgba(255,255,255,0.3)', padding: '4px'
                                    }}
                                    tabIndex={-1}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={e => setRememberMe(e.target.checked)}
                                        style={{ accentColor: '#FF6B6B' }}
                                    />
                                    Remember me
                                </label>
                                <Link to="/forgot-password" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <button
                            className="btn btn-accent"
                            type="submit"
                            disabled={submitting}
                            style={{ width: '100%', marginBottom: '16px', opacity: submitting ? 0.7 : 1 }}
                        >
                            {submitting ? 'Signing in...' : <>Sign In <ArrowRight size={16} style={{ marginLeft: '6px' }} /></>}
                        </button>

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                            Don't have an account?{' '}
                            <Link to="/signup" style={{ color: '#FF6B6B', textDecoration: 'none', fontWeight: 600 }}>Sign Up</Link>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
}
