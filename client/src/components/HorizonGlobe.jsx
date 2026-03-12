import React, { useEffect, useRef, useCallback } from 'react';

/**
 * HorizonGlobe — 3D curved horizon with animated dot-grid particles.
 * Creates the "planet horizon" effect from the reference design.
 * Mouse-reactive parallax, theme-aware colors, reduced-motion support.
 */
export default function HorizonGlobe() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0.5, y: 0.5 });
    const animIdRef = useRef(null);

    const getTheme = useCallback(() => {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width, height;
        const dots = [];
        const DOT_ROWS = 28;
        const DOT_COLS = 60;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            generateDots();
        };

        const generateDots = () => {
            dots.length = 0;
            for (let row = 0; row < DOT_ROWS; row++) {
                for (let col = 0; col < DOT_COLS; col++) {
                    const u = col / (DOT_COLS - 1);       // 0..1 horizontal
                    const v = row / (DOT_ROWS - 1);       // 0..1 vertical (top to bottom of globe arc)
                    dots.push({ u, v, phase: Math.random() * Math.PI * 2 });
                }
            }
        };

        const handleMouseMove = (e) => {
            if (prefersReducedMotion) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = (e.clientX - rect.left) / rect.width;
            mouseRef.current.y = (e.clientY - rect.top) / rect.height;
        };

        let time = 0;

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            time += prefersReducedMotion ? 0 : 0.008;

            const isDark = getTheme() !== 'light';

            // Horizon curve parameters
            const horizonY = height * 0.15;          // where the horizon sits
            const curveRadius = width * 1.2;          // curvature radius
            const centerX = width / 2;

            // Mouse parallax offset
            const mx = (mouseRef.current.x - 0.5) * 30;
            const my = (mouseRef.current.y - 0.5) * 15;

            // Draw atmospheric glow behind the horizon
            const glowGrad = ctx.createRadialGradient(
                centerX + mx, horizonY + my + curveRadius * 0.02, 0,
                centerX + mx, horizonY + my + curveRadius * 0.3, curveRadius * 0.6
            );
            if (isDark) {
                glowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.28)');
                glowGrad.addColorStop(0.2, 'rgba(124, 58, 237, 0.16)');
                glowGrad.addColorStop(0.4, 'rgba(79, 70, 229, 0.08)');
                glowGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.03)');
                glowGrad.addColorStop(1, 'transparent');
            } else {
                glowGrad.addColorStop(0, 'rgba(59, 130, 246, 0.14)');
                glowGrad.addColorStop(0.3, 'rgba(99, 102, 241, 0.07)');
                glowGrad.addColorStop(1, 'transparent');
            }
            ctx.fillStyle = glowGrad;
            ctx.fillRect(0, 0, width, height);

            // Draw the horizon edge glow line
            ctx.beginPath();
            ctx.ellipse(
                centerX + mx * 0.5,
                horizonY + my * 0.3 + curveRadius,
                curveRadius,
                curveRadius,
                0, Math.PI * 1.15, Math.PI * 1.85
            );
            const lineGrad = ctx.createLinearGradient(0, 0, width, 0);
            if (isDark) {
                lineGrad.addColorStop(0, 'rgba(99, 102, 241, 0)');
                lineGrad.addColorStop(0.15, 'rgba(99, 102, 241, 0.4)');
                lineGrad.addColorStop(0.35, 'rgba(129, 140, 248, 0.75)');
                lineGrad.addColorStop(0.5, 'rgba(167, 139, 250, 0.9)');
                lineGrad.addColorStop(0.65, 'rgba(129, 140, 248, 0.75)');
                lineGrad.addColorStop(0.85, 'rgba(99, 102, 241, 0.4)');
                lineGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
            } else {
                lineGrad.addColorStop(0, 'rgba(59, 130, 246, 0)');
                lineGrad.addColorStop(0.3, 'rgba(59, 130, 246, 0.2)');
                lineGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.35)');
                lineGrad.addColorStop(0.7, 'rgba(59, 130, 246, 0.2)');
                lineGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
            }
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = isDark ? 2.5 : 1.5;
            ctx.stroke();

            // Second glow layer for extra brightness
            ctx.beginPath();
            ctx.ellipse(
                centerX + mx * 0.5,
                horizonY + my * 0.3 + curveRadius,
                curveRadius,
                curveRadius,
                0, Math.PI * 1.15, Math.PI * 1.85
            );
            ctx.strokeStyle = isDark ? 'rgba(129, 140, 248, 0.12)' : 'rgba(99, 102, 241, 0.06)';
            ctx.lineWidth = isDark ? 8 : 4;
            ctx.stroke();

            // Draw dot grid on the curved surface
            for (const dot of dots) {
                // Map u,v to 3D-projected position on curved surface
                const angle = (dot.u - 0.5) * Math.PI * 0.7; // spread across horizon
                const depth = dot.v;                            // 0 = horizon edge, 1 = far away

                // Project onto the curved surface
                const projX = centerX + Math.sin(angle) * curveRadius * (0.5 + depth * 0.5);
                const projY = horizonY + curveRadius - Math.cos(angle * 0.15) * curveRadius * (1 - depth * 0.55);

                // Perspective scale — dots closer to horizon edge are larger
                const scale = 1 - depth * 0.7;
                const perspectiveAlpha = scale * scale;

                // Skip dots above the horizon line or outside view
                if (projY < horizonY - 10 || projY > height + 10) continue;
                if (projX < -20 || projX > width + 20) continue;

                // Twinkle animation
                const twinkle = 0.6 + 0.4 * Math.sin(time * 2 + dot.phase);

                const dotSize = Math.max(0.5, scale * (isDark ? 2.2 : 1.4));
                const alpha = perspectiveAlpha * twinkle * (isDark ? 0.85 : 0.4);

                if (alpha < 0.02) continue;

                // Parallax offset per dot
                const px = mx * depth * 0.3;
                const py = my * depth * 0.2;

                ctx.beginPath();
                ctx.arc(projX + px, projY + py, dotSize, 0, Math.PI * 2);
                if (isDark) {
                    ctx.fillStyle = `rgba(165, 180, 252, ${alpha})`;
                } else {
                    ctx.fillStyle = `rgba(99, 102, 241, ${alpha * 0.6})`;
                }
                ctx.fill();
            }

            animIdRef.current = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        };
    }, [getTheme]);

    return (
        <div
            className="horizon-globe-container"
            style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120%',
                height: '55%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden'
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block'
                }}
            />
        </div>
    );
}
