import { useEffect, useRef } from 'react';
import { ThemeMode } from '../types.ts';

interface AmbientBubble {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  speedY: number;
  speedX: number;
  wobbleAngle: number;
  wobbleSpeed: number;
  life: number;
  maxLife: number;
  fadeInDuration: number;
  fadeOutDuration: number;
  targetOpacity: number;
}

export function BubbleBackground({
  theme = 'dark',
}: {
  theme?: ThemeMode;
  cursorEffectEnabled?: boolean;
}) {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    if (!bgCanvas) return;

    const bgCtx = bgCanvas.getContext('2d', { alpha: true });
    if (!bgCtx) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let animationFrameId: number;
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);

    // Signature palette color: strictly #CBEA30 (RGB: 203, 234, 48)
    const BRAND_COLOR = '203, 234, 48';

    // -------------------------------------------------------------------------
    // Ambient Floating Bubbles Across Website Background
    // Behavior:
    // - Only 1 to 3 bubbles active at any given moment (max 5 absolute).
    // - Appear gradually and independently after subtle intervals.
    // - Moderate elegant size (14px to 22px radius).
    // - Very slow, gentle rise and subtle sideways drift.
    // - Smooth fade-in, smooth floating, and smooth fade-out with subtle softening.
    // - Kept safely behind content with low opacity (0.08 to 0.14).
    // -------------------------------------------------------------------------
    const ambientBubbles: AmbientBubble[] = [];
    let nextAmbientSpawnTime = performance.now() + 800; // subtle initial delay

    const spawnAmbientBubble = (now: number, isInitial = false) => {
      // Moderate radius: 14px to 22px
      const radius = Math.random() * 8 + 14;
      const maxLife = Math.floor(Math.random() * 200 + 400); // 400 to 600 frames (~7 to 10 seconds)
      const fadeInDuration = 70; // ~1.1s smooth fade in
      const fadeOutDuration = 90; // ~1.5s smooth fade out

      // For initial spawn, can appear mid-lower screen; otherwise spawns gently from bottom
      const startY = isInitial
        ? height * (0.45 + Math.random() * 0.45)
        : height + radius + Math.random() * 15;
      const startX = Math.random() * (width - 100) + 50;

      ambientBubbles.push({
        x: startX,
        y: startY,
        radius,
        maxRadius: radius,
        color: BRAND_COLOR,
        speedY: -(Math.random() * 0.32 + 0.22), // slow, gentle upward drift
        speedX: (Math.random() - 0.5) * 0.2, // subtle sideways motion
        wobbleAngle: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.015 + 0.006,
        life: 0,
        maxLife,
        fadeInDuration,
        fadeOutDuration,
        targetOpacity: Math.random() * 0.05 + 0.09, // 0.09 to 0.14 (subtle, non-distracting)
      });

      // Schedule next independent bubble appearance (random 1.8s to 3.8s)
      nextAmbientSpawnTime = now + (Math.random() * 2000 + 1800);
    };

    // -------------------------------------------------------------------------
    // Resize Handling
    // -------------------------------------------------------------------------
    const handleResize = () => {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // -------------------------------------------------------------------------
    // Main Animation Loop
    // -------------------------------------------------------------------------
    let isRunning = true;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isRunning) return;

      const now = performance.now();
      bgCtx.clearRect(0, 0, width, height);

      // Manage & Render Ambient Floating Bubbles
      if (ambientBubbles.length < 3 && now >= nextAmbientSpawnTime) {
        spawnAmbientBubble(now, ambientBubbles.length === 0);
      }

      for (let i = ambientBubbles.length - 1; i >= 0; i--) {
        const b = ambientBubbles[i];
        b.life++;
        b.wobbleAngle += b.wobbleSpeed;

        // Slow, gentle floating motion
        b.x += b.speedX + Math.sin(b.wobbleAngle) * 0.22;
        b.y += b.speedY;

        // Compute smooth fade-in and fade-out opacity
        let opacity = b.targetOpacity;
        if (b.life < b.fadeInDuration) {
          opacity = b.targetOpacity * (b.life / b.fadeInDuration);
        } else if (b.life > b.maxLife - b.fadeOutDuration) {
          const fadeProgress = (b.maxLife - b.life) / b.fadeOutDuration;
          opacity = b.targetOpacity * Math.max(0, fadeProgress);
        }

        // Soft shrink during fade out
        let currentRadius = b.maxRadius;
        if (b.life > b.maxLife - b.fadeOutDuration) {
          const fadeProgress = Math.max(0, (b.maxLife - b.life) / b.fadeOutDuration);
          currentRadius = b.maxRadius * (0.85 + 0.15 * fadeProgress);
        }

        // Remove bubble when fully expired or scrolled off-screen
        if (b.life >= b.maxLife || opacity <= 0.005 || b.y + b.radius < -30) {
          ambientBubbles.splice(i, 1);
          continue;
        }

        const isLightMode = themeRef.current === 'light';

        // Draw ambient bubble
        bgCtx.save();
        bgCtx.beginPath();
        bgCtx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);

        // Soft translucent interior
        bgCtx.fillStyle = isLightMode
          ? `rgba(${b.color}, ${opacity * 0.45})`
          : `rgba(${b.color}, ${opacity * 0.35})`;
        bgCtx.fill();

        // Delicate outer rim
        bgCtx.lineWidth = 1.2;
        bgCtx.strokeStyle = isLightMode
          ? `rgba(140, 175, 15, ${opacity * 1.1})`
          : `rgba(${b.color}, ${opacity * 0.8})`;
        bgCtx.stroke();

        // Subtle specular highlight for glass-like depth
        bgCtx.beginPath();
        bgCtx.arc(
          b.x - currentRadius * 0.3,
          b.y - currentRadius * 0.3,
          currentRadius * 0.2,
          0,
          Math.PI * 2
        );
        bgCtx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
        bgCtx.fill();

        bgCtx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={bgCanvasRef}
      id="ambient-bubbles-canvas"
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
