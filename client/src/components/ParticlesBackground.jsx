import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animationId;

        const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.floor(width * height / 14000);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    size: Math.random() * 1.2 + 0.3,
                    type: Math.random(), // used for color selection
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        };

        let time = 0;

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            time += 0.016;

            const isDark = getTheme() !== 'light';

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Twinkle effect
                const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase);
                const currentSize = p.size * (0.7 + 0.3 * twinkle);

                // Theme-aware colors
                let color;
                if (isDark) {
                    if (p.type < 0.4) {
                        color = `rgba(255, 255, 255, ${(Math.random() * 0.3 + 0.05) * twinkle})`;
                    } else if (p.type < 0.7) {
                        color = `rgba(124, 58, 237, ${(Math.random() * 0.3 + 0.1) * twinkle})`;
                    } else {
                        color = `rgba(99, 102, 241, ${(Math.random() * 0.25 + 0.08) * twinkle})`;
                    }
                } else {
                    // Light mode: very subtle particles
                    if (p.type < 0.5) {
                        color = `rgba(148, 163, 184, ${0.12 * twinkle})`;
                    } else {
                        color = `rgba(99, 102, 241, ${0.08 * twinkle})`;
                    }
                }

                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2,
                pointerEvents: 'none',
                opacity: 0.35
            }}
        />
    );
}
