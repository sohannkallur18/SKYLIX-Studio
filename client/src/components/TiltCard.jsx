import { useRef, useEffect } from 'react';

export default function TiltCard({ children, className = "" }) {
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const canTilt = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
        if (!canTilt) return;

        const strength = 6;

        const onMove = (ev) => {
            const r = card.getBoundingClientRect();
            const x = (ev.clientX - r.left) / r.width;
            const y = (ev.clientY - r.top) / r.height;
            const rx = (y - 0.5) * -strength;
            const ry = (x - 0.5) * strength;

            // Set CSS custom properties for inner glow effect
            card.style.setProperty('--mouse-x', `${ev.clientX - r.left}px`);
            card.style.setProperty('--mouse-y', `${ev.clientY - r.top}px`);
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) scale(1.01)`;
        };

        const onLeave = () => {
            card.style.transform = "";
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);

        return () => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    return (
        <article
            ref={cardRef}
            className={className}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
            {children}
        </article>
    );
}
