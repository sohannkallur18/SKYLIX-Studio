import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, ArrowLeft } from '../components/Icons';

export default function ForgotPassword() {
    return (
        <>
            <Helmet>
                <title>Forgot Password — SKYLIX</title>
            </Helmet>

            <section className="section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="container" style={{ maxWidth: '460px' }}>
                    <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: 'rgba(15, 20, 55, 0.40)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 20px', border: '1px solid rgba(99, 120, 255, 0.14)'
                        }}>
                            <Lock size={24} style={{ color: 'rgba(255,255,255,0.6)' }} />
                        </div>
                        <h1 className="h2">Reset Password</h1>
                        <p className="p" style={{ marginTop: '12px' }}>
                            Self-service password reset is currently disabled.
                        </p>
                    </div>

                    <div className="bento-card reveal" style={{ padding: '36px', textAlign: 'center' }}>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', lineHeight: '1.6' }}>
                            Please contact your system administrator or support team to request a password reset for your account.
                        </p>

                        <div style={{ padding: '16px', background: 'rgba(15, 20, 55, 0.30)', borderRadius: '12px', marginBottom: '24px' }}>
                            <p style={{ fontSize: '14px', color: '#fff' }}>support@skylix.studio</p>
                        </div>

                        <Link to="/login" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
