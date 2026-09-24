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

interface CursorBubble {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  baseOpacity: number;
  wobbleAngle: number;
  wobbleSpeed: number;
}

export function BubbleBackground({ theme = 'dark' }: { theme?: ThemeMode }) {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const cursorCanvas = cursorCanvasRef.current;
    if (!bgCanvas || !cursorCanvas) return;

    const bgCtx = bgCanvas.getContext('2d', { alpha: true });
    const cursorCtx = cursorCanvas.getContext('2d', { alpha: true });
    if (!bgCtx || !cursorCtx) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    let animationFrameId: number;
    let width = (bgCanvas.width = cursorCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = cursorCanvas.height = window.innerHeight);

    // Signature palette color: strictly #CBEA30 (RGB: 203, 234, 48)
    const BRAND_COLOR = '203, 234, 48';

    // -------------------------------------------------------------------------
    // 1. Ambient Floating Bubbles Across Website
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
    // 2. Mouse Cursor Bubble Trail (Desktop only)
    // Behavior:
    // - Smooth medium-sized bubbles (5.5px to 9.5px radius) matching cursor.
    // - Extended lifetime (~55 to 85 frames) so they linger elegantly.
    // - Continuous flow without clustering or burst clouds.
    // - Gradually shrinks down and fades away smoothly without sudden popping.
    // - Soft buoyancy and natural trailing drift.
    // -------------------------------------------------------------------------
    const cursorBubbles: CursorBubble[] = [];
    const supportsFinePointer =
      window.matchMedia('(pointer: fine)').matches &&
      !('ontouchstart' in window && window.innerWidth < 1024);

    let lastMouseX = -999;
    let lastMouseY = -999;
    let lastSpawnTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!supportsFinePointer) return;

      const currentX = e.clientX;
      const currentY = e.clientY;
      const now = performance.now();

      if (lastMouseX === -999) {
        lastMouseX = currentX;
        lastMouseY = currentY;
        return;
      }

      const dx = currentX - lastMouseX;
      const dy = currentY - lastMouseY;
      const distance = Math.hypot(dx, dy);

      // Smooth threshold: emit smoothly as cursor moves
      if (distance >= 12 || (distance > 3 && now - lastSpawnTime > 55)) {
        // When moving quickly, interpolate 1 sub-step to keep trail continuous and seamless
        const steps = distance > 38 ? 2 : 1;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const spawnX = lastMouseX + dx * t;
          const spawnY = lastMouseY + dy * t;

          // Medium size: radius 5.5px to 9.5px
          const initialRadius = Math.random() * 4 + 5.5;
          // Longer, elegant lifetime: 55 to 85 frames (~0.9s to 1.4s)
          const maxLife = Math.floor(Math.random() * 30 + 55);

          // Gentle velocity trailing naturally behind cursor
          const angle = Math.random() * Math.PI * 2;
          const spread = Math.random() * 0.4 + 0.15;
          const vx = -dx * 0.05 + Math.cos(angle) * spread;
          const vy = -dy * 0.05 + Math.sin(angle) * spread - 0.22; // subtle float upward

          cursorBubbles.push({
            x: spawnX + (Math.random() - 0.5) * 6,
            y: spawnY + (Math.random() - 0.5) * 6,
            radius: initialRadius,
            maxRadius: initialRadius,
            color: BRAND_COLOR,
            vx,
            vy,
            life: maxLife,
            maxLife,
            baseOpacity: Math.random() * 0.15 + 0.42, // 0.42 to 0.57
            wobbleAngle: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.05 + 0.02,
          });
        }

        lastMouseX = currentX;
        lastMouseY = currentY;
        lastSpawnTime = now;

        // Controlled pool size to avoid clutter
        if (cursorBubbles.length > 50) {
          cursorBubbles.splice(0, cursorBubbles.length - 50);
        }
      }
    };

    if (supportsFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // -------------------------------------------------------------------------
    // 3. Resize Handling
    // -------------------------------------------------------------------------
    const handleResize = () => {
      width = bgCanvas.width = cursorCanvas.width = window.innerWidth;
      height = bgCanvas.height = cursorCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // -------------------------------------------------------------------------
    // 4. Main Animation Loop
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
      cursorCtx.clearRect(0, 0, width, height);

      // --- A. Manage & Render Ambient Floating Bubbles ---
      // Maintain strictly around 1 to 3 active ambient bubbles (never crowded)
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
          // Gradual appearance
          opacity = b.targetOpacity * (b.life / b.fadeInDuration);
        } else if (b.life > b.maxLife - b.fadeOutDuration) {
          // Gradual disappearance
          const fadeProgress = (b.maxLife - b.life) / b.fadeOutDuration;
          opacity = b.targetOpacity * Math.max(0, fadeProgress);
        }

        // Soft shrink during fade out
        let currentRadius = b.maxRadius;
        if (b.life > b.maxLife - b.fadeOutDuration) {
          const fadeProgress = Math.max(0, (b.maxLife - b.life) / b.fadeOutDuration);
          currentRadius = b.maxRadius * (0.85 + 0.15 * fadeProgress);
        }

        // Remove bubble when fully expired or scrolled well off-screen
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

      // --- B. Render Mouse Cursor Bubble Trail (Desktop) ---
      const isLightMode = themeRef.current === 'light';
      for (let i = cursorBubbles.length - 1; i >= 0; i--) {
        const cb = cursorBubbles[i];
        cb.life--;
        cb.wobbleAngle += cb.wobbleSpeed;

        // Smooth physics: gentle friction & upward buoyancy
        cb.vx *= 0.96;
        cb.vy *= 0.96;
        cb.vy -= 0.02; // subtle float upward
        cb.x += cb.vx + Math.sin(cb.wobbleAngle) * 0.18;
        cb.y += cb.vy;

        const progress = cb.life / cb.maxLife; // 1 -> 0

        // Auto-remove dead bubbles
        if (cb.life <= 0 || progress <= 0) {
          cursorBubbles.splice(i, 1);
          continue;
        }

        // Smooth fade out: remains visible longer, then smoothly diminishes
        const fadeFactor = progress > 0.65 ? 1 : Math.pow(progress / 0.65, 0.85);
        const currentOpacity = cb.baseOpacity * fadeFactor;

        // Gradually shrinks down smoothly as it drifts
        const currentRadius = Math.max(
          1.2,
          cb.maxRadius * (0.3 + 0.7 * Math.pow(progress, 0.75))
        );

        if (currentOpacity <= 0.01) {
          cursorBubbles.splice(i, 1);
          continue;
        }

        cursorCtx.save();
        cursorCtx.beginPath();
        cursorCtx.arc(cb.x, cb.y, currentRadius, 0, Math.PI * 2);

        // Soft translucent body
        cursorCtx.fillStyle = isLightMode
          ? `rgba(${cb.color}, ${currentOpacity * 0.55})`
          : `rgba(${cb.color}, ${currentOpacity * 0.45})`;
        cursorCtx.fill();

        // Elegant crisp border
        cursorCtx.lineWidth = 1.2;
        cursorCtx.strokeStyle = isLightMode
          ? `rgba(135, 170, 10, ${currentOpacity * 0.95})`
          : `rgba(${cb.color}, ${currentOpacity * 0.88})`;
        cursorCtx.stroke();

        // Subtle specular highlight
        if (currentRadius > 3.0) {
          cursorCtx.beginPath();
          cursorCtx.arc(
            cb.x - currentRadius * 0.3,
            cb.y - currentRadius * 0.3,
            currentRadius * 0.22,
            0,
            Math.PI * 2
          );
          cursorCtx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
          cursorCtx.fill();
        }

        cursorCtx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (supportsFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Ambient floating bubbles - behind all existing content */}
      <canvas
        ref={bgCanvasRef}
        id="ambient-bubbles-canvas"
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
      />
      {/* Mouse cursor bubble trail - follows mouse without intercepting clicks */}
      <canvas
        ref={cursorCanvasRef}
        id="cursor-bubbles-canvas"
        className="fixed inset-0 pointer-events-none z-30"
        aria-hidden="true"
      />
    </>
  );
}
