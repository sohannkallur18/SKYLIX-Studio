import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * DocumentBackgroundCanvas
 *
 * A document-level animated canvas background that:
 *   - Lives absolutely-positioned inside the page flow
 *   - Stretches to full document height
 *   - Scrolls naturally with the page (NOT fixed, NOT sticky)
 *   - Renders image-sequence frames based on global scroll progress
 *   - Acts as the ONLY animated background layer
 *   - Never interferes with content interaction (pointer-events: none)
 */
const DocumentBackgroundCanvas = ({
    frameCount = 240,
    imagePath = '/images/',
    imagePrefix = 'ezgif-frame-',
    imageExtension = '.jpg',
    startIndex = 1,       // first frame file number
    padLength = 3,        // zero-pad width (e.g. 001)
    opacity = 0.18,       // subtle blending with existing palette
}) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(-1);
    const docHeightRef = useRef(0);
    const renderStateRef = useRef({
        targetFrame: 0,
        currentFrameFloat: 0,
        lastDrawnFrame: -1
    });

    // ── Preload frames progressively ─────────────────────────────
    useEffect(() => {
        const loaded = new Array(frameCount);
        const pad = (n) => String(n).padStart(padLength, '0');

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `${imagePath}${imagePrefix}${pad(i + startIndex)}${imageExtension}`;
            loaded[i] = img;
        }

        imagesRef.current = loaded;
    }, [frameCount, imagePath, imagePrefix, imageExtension, startIndex, padLength]);

    // ── Measure document height ─────────────────────────────────
    const measureDocHeight = useCallback(() => {
        const h = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
        );
        docHeightRef.current = h;
        return h;
    }, []);

    // ── Draw a specific frame onto the canvas ───────────────────
    const drawFrame = useCallback((frameIndex) => {
        const canvas = canvasRef.current;
        if (!canvas) return false;
        const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false can improve performance
        if (!ctx) return false;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return false;

        const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x for perf
        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;

        if (cw === 0 || ch === 0) return false;

        // Only resize internal buffer when dimensions change
        const targetW = Math.round(cw * dpr);
        const targetH = Math.round(ch * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
        }

        ctx.save();
        ctx.scale(dpr, dpr);

        // "cover" scaling: fill the entire canvas area, crop overflow
        const scaleX = cw / img.naturalWidth;
        const scaleY = ch / img.naturalHeight;
        const scale = Math.max(scaleX, scaleY);

        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const dx = (cw - drawW) / 2;
        const dy = (ch - drawH) / 2;

        // Use standard image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill background to prevent transparent smearing since alpha is false
        ctx.fillStyle = '#080B20'; // Match site background
        ctx.fillRect(0, 0, cw, ch);

        ctx.drawImage(img, dx, dy, drawW, drawH);

        ctx.restore();
        return true;
    }, []);

    // ── Main scroll + render loop ───────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animationFrameId;

        const measureScroll = () => {
            const docH = docHeightRef.current;
            const viewH = window.innerHeight;
            const maxScroll = docH - viewH;

            if (maxScroll <= 0) {
                renderStateRef.current.targetFrame = 0;
                return;
            }

            // Progress exactly tracks global scroll position from top (pixel 0) to bottom
            let progress = window.scrollY / maxScroll;

            // Clamp progress to prevent overflow errors.
            progress = Math.min(Math.max(progress, 0), 1);

            let idx = Math.floor(progress * (frameCount - 1));
            renderStateRef.current.targetFrame = Math.min(Math.max(idx, 0), frameCount - 1);
        };

        const onScroll = () => {
            measureScroll();
        };

        const onResize = () => {
            measureDocHeight();
            measureScroll();
            // Force an instant redraw on resize
            renderStateRef.current.currentFrameFloat = renderStateRef.current.targetFrame;
            currentFrameRef.current = -1;
        };

        const renderLoop = () => {
            const state = renderStateRef.current;

            // Fast, smooth interpolation
            state.currentFrameFloat += (state.targetFrame - state.currentFrameFloat) * 0.15;
            const frameToDraw = Math.round(state.currentFrameFloat);

            // Attempt to draw if frame changed, OR if the last drawn frame wasn't successful
            if (frameToDraw !== currentFrameRef.current || state.lastDrawnFrame !== frameToDraw) {
                const success = drawFrame(frameToDraw);
                currentFrameRef.current = frameToDraw;
                if (success) {
                    state.lastDrawnFrame = frameToDraw;
                }
            }

            animationFrameId = requestAnimationFrame(renderLoop);
        };

        const resizeObserver = new ResizeObserver(() => {
            measureDocHeight();
            measureScroll();
        });
        resizeObserver.observe(document.documentElement);

        measureDocHeight();
        measureScroll();

        // Initialize state
        renderStateRef.current.currentFrameFloat = renderStateRef.current.targetFrame;

        renderLoop();

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            resizeObserver.disconnect();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [frameCount, drawFrame, measureDocHeight]);

    // ── Re-measure height periodically in case of async layout shifts ───
    useEffect(() => {
        const interval = setInterval(() => {
            const oldHeight = docHeightRef.current;
            const newHeight = measureDocHeight();
            if (oldHeight !== newHeight) {
                currentFrameRef.current = -1; // force redraw
            }
        }, 500);
        return () => clearInterval(interval);
    }, [measureDocHeight]);

    return (
        <div
            className="doc-bg-canvas-wrapper"
            aria-hidden="true"
            style={{ opacity: opacity }}
        >
            <canvas
                ref={canvasRef}
                className="doc-bg-canvas"
            />
        </div>
    );
};

export default DocumentBackgroundCanvas;

