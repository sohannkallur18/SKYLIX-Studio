import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useUserAuth } from '../context/UserAuthContext';
import { User, Mail, Lock, ArrowRight } from '../components/Icons';

export default function UserSignup() {
    const { register, isAuthenticated } = useUserAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (isAuthenticated) {
        navigate('/', { replace: true });
        return null;
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setSubmitting(true);
        const result = await register(form.username, form.email, form.password, form.confirmPassword);
        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setError(result.error || 'Registration failed.');
        }
        setSubmitting(false);
    };

    return (
        <>
            <Helmet>
                <title>Sign Up — SKYLIX</title>
                <meta name="description" content="Create your SKYLIX account to get started with our software solutions and AI services." />
            </Helmet>

            <section className="section" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '460px' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(125,211,252,0.15))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px', border: '1px solid rgba(52,211,153,0.2)'
                        }}>
                            <User size={24} style={{ color: '#34d399' }} />
                        </div>
                        <h1 className="h2">Get <span className="shimmer-text">Started</span></h1>
                        <p className="p" style={{ marginTop: '12px' }}>Create your SKYLIX account</p>
                    </div>

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
                            <label className="form-label">Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{
                                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.25)', pointerEvents: 'none'
                                }} />
                                <input
                                    className="form-input"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="John Smith"
                                    required
                                    autoComplete="name"
                                    disabled={submitting}
                                    style={{ paddingLeft: '42px' }}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{
                                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.25)', pointerEvents: 'none'
                                }} />
                                <input
                                    className="form-input"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@company.com"
                                    required
                                    autoComplete="email"
                                    disabled={submitting}
                                    style={{ paddingLeft: '42px' }}
                                />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{
                                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.25)', pointerEvents: 'none'
                                }} />
                                <input
                                    className="form-input"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Minimum 6 characters"
                                    required
                                    autoComplete="new-password"
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
                        </div>

                        <div className="form-group" style={{ marginBottom: '24px' }}>
                            <label className="form-label">Confirm Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{
                                    position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                    color: 'rgba(255,255,255,0.25)', pointerEvents: 'none'
                                }} />
                                <input
                                    className="form-input"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter password"
                                    required
                                    autoComplete="new-password"
                                    disabled={submitting}
                                    style={{ paddingLeft: '42px' }}
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-accent"
                            type="submit"
                            disabled={submitting}
                            style={{ width: '100%', marginBottom: '16px', opacity: submitting ? 0.7 : 1 }}
                        >
                            {submitting ? 'Creating Account...' : <>Create Account <ArrowRight size={16} style={{ marginLeft: '6px' }} /></>}
                        </button>

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                            Already have an account?{' '}
                            <Link to="/login" style={{ color: '#FF6B6B', textDecoration: 'none', fontWeight: 600 }}>Log In</Link>
                        </p>
                    </form>
                </div>
            </section>
        </>
    );
}
