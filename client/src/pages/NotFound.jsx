import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

export default function NotFound() {
    const { openChat } = useChat();

    return (
        <>
            <Helmet>
                <title>404 — Page Not Found | SKYLIX</title>
                <meta name="description" content="The page you're looking for doesn't exist. Navigate back to SKYLIX to explore our software solutions and AI automation services." />
            </Helmet>
            <section className="not-found">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="not-found-code">404</div>
                    <h1 className="h2" style={{ marginBottom: '16px' }}>
                        This page doesn't <span className="galaxy-gradient-word">exist</span>
                    </h1>
                    <p className="p" style={{ marginInline: 'auto', maxWidth: '480px' }}>
                        The page you're looking for has been moved, deleted, or never existed.
                        Let's get you back on track.
                    </p>
                    <div className="row" style={{ justifyContent: 'center', marginTop: '40px', gap: '16px' }}>
                        <Link className="btn btn-accent galaxy-btn-glow" to="/">Go Home</Link>
                        <Link className="btn btn-ghost galaxy-btn-outline" to="/contact">Contact Us</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
