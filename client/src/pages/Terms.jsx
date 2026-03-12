import { Helmet } from 'react-helmet-async';

export default function Terms() {
    return (
        <>
            <Helmet>
                <title>Terms of Service — SKYLIX</title>
                <meta name="description" content="SKYLIX terms of service for software development and AI automation consulting services." />
            </Helmet>
            <section className="section" style={{ minHeight: '90vh', paddingTop: '140px' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h1 className="h2" style={{ marginBottom: '32px' }}>Terms of Service</h1>

                    <div style={{ marginBottom: '40px', padding: '32px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                        <h3 style={{ color: '#fff', marginBottom: '16px' }}>1. Agreement</h3>
                        <p className="p" style={{ lineHeight: '1.8', marginBottom: '32px' }}>
                            By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
                        </p>

                        <h3 style={{ color: '#fff', marginBottom: '16px' }}>2. Services</h3>
                        <p className="p" style={{ lineHeight: '1.8', marginBottom: '32px' }}>
                            SKYLIX provides software development, agentic AI solutions, and automation consulting services. All timelines and deliverables are defined in separate Statements of Work (SOW).
                        </p>

                        <h3 style={{ color: '#fff', marginBottom: '16px' }}>3. Disclaimer</h3>
                        <p className="p" style={{ lineHeight: '1.8', marginBottom: '32px' }}>
                            The materials on SKYLIX's website are provided "as is". SKYLIX makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
