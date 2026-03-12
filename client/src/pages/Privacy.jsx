import { Helmet } from 'react-helmet-async';

export default function Privacy() {
    return (
        <>
            <Helmet>
                <title>Privacy Policy — SKYLIX</title>
                <meta name="description" content="SKYLIX privacy policy. We prioritize data minimization and never sell your data." />
            </Helmet>
            <section className="section" style={{ minHeight: '90vh', paddingTop: '140px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 className="h2" style={{ marginBottom: '32px' }}>Privacy Policy</h1>
                    <p className="p" style={{ marginBottom: '24px', color: '#fff' }}>
                        Last Updated: February 2026
                    </p>

                    <div style={{ marginBottom: '40px', padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                        <p className="p" style={{ lineHeight: '1.8' }}>
                            At SKYLIX, we prioritize data minimization. We only collect information that you explicitly provide to us via our chat widget or contact forms (Name, Email, Phone).
                            <br /><br />
                            We do not sell your data. We do not use cookies for tracking across third-party websites.
                            Any data entered into our demo chat widget is stored locally in your browser (LocalStorage) and is not transmitted to our servers until you explicitly submit a "Booking" or "Contact" request.
                            <br /><br />
                            For a complete legal privacy policy, please consult with your legal jurisdiction's requirements. This page serves as a placeholder for the template.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
