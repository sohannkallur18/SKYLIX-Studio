import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/chat/ChatWidget';
import NeuralMesh from '../components/NeuralMesh';
import ParticlesBackground from '../components/ParticlesBackground';
import DocumentBackgroundCanvas from '../components/DocumentBackgroundCanvas';

/* ── Back to Top Button ──────────────────────────────── */
function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            className={`back-to-top ${visible ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
}

export default function Layout() {
    const { pathname } = useLocation();
    const [pageReady, setPageReady] = useState(false);

    // Scroll to top on route change + trigger page fade
    useEffect(() => {
        window.scrollTo(0, 0);
        setPageReady(false);
        const raf = requestAnimationFrame(() => setPageReady(true));
        return () => cancelAnimationFrame(raf);
    }, [pathname]);

    // IntersectionObserver for reveal animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
        );

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [pathname]);

    return (
        <>
            {/* ── Document-level animated background canvas ── */}
            <DocumentBackgroundCanvas
                frameCount={216} // 240 - 24
                imagePath="/images/"
                imagePrefix="ezgif-frame-"
                imageExtension=".jpg"
                startIndex={25}
                opacity={0.18}
            />

            <div className="bg-mesh-container">
                <div className="bg-orb bg-orb-1"></div>
                <div className="bg-orb bg-orb-2"></div>
                <div className="bg-orb bg-orb-3"></div>
                <NeuralMesh />
                <ParticlesBackground />
            </div>

            <div className="site-content-layer">
                <Header />

                <main id="main-content" className={pageReady ? 'page-fade-active' : 'page-fade-enter'}>
                    <Outlet />
                </main>

                <Footer />
            </div>

            <BackToTop />
            <ChatWidget />
        </>
    );
}
