import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollReveal() {
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.14 });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [location.pathname]); // Re-run on navigation
}
