import { useEffect, useRef, useState } from 'react';
import { ThemeMode } from '../types.ts';

interface CursorRingProps {
  enabled: boolean;
  theme: ThemeMode;
}

export function CursorRing({ enabled, theme }: CursorRingProps) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if the device is touch-only / coarse pointer
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return isCoarse && hasTouch;
    };
    setIsTouch(checkTouch());
  }, []);

  useEffect(() => {
    if (!enabled || isTouch) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const container = containerRef.current;
    if (!ring || !dot || !container) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let isVisible = false;
    let isHovering = false;
    let isMouseDown = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        // Snap directly on first detection to avoid flying from top-left
        if (ringX < 0) {
          ringX = mouseX;
          ringY = mouseY;
          dotX = mouseX;
          dotY = mouseY;
        }
        container.style.opacity = '1';
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      container.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      container.style.opacity = '1';
    };

    const onMouseDown = () => {
      isMouseDown = true;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        'a, button, input, textarea, select, [role="button"], [onclick], .cursor-pointer'
      );
      isHovering = !!isInteractive;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    // Smooth physics loop with lerp (linear interpolation)
    const renderLoop = () => {
      if (isVisible) {
        // Outer ring has a smooth trailing / lag effect (lerp factor 0.16)
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;

        // Center dot follows more directly (lerp factor 0.45)
        dotX += (mouseX - dotX) * 0.45;
        dotY += (mouseY - dotY) * 0.45;

        // Scale factors
        const scale = isMouseDown ? 0.8 : isHovering ? 1.35 : 1.0;
        const ringRadius = 17; // 34px diameter base
        const dotRadius = 2.5; // 5px diameter base

        ring.style.transform = `translate3d(${ringX - ringRadius}px, ${ringY - ringRadius}px, 0px) scale(${scale})`;
        dot.style.transform = `translate3d(${dotX - dotRadius}px, ${dotY - dotRadius}px, 0px)`;

        // Adjust ring opacity / glow based on hover state
        if (isHovering) {
          ring.style.borderColor = '#CBEA30';
          ring.style.boxShadow = '0 0 16px rgba(203, 234, 48, 0.7), inset 0 0 8px rgba(203, 234, 48, 0.25)';
        } else {
          ring.style.borderColor = theme === 'dark' ? 'rgba(203, 234, 48, 0.9)' : 'rgba(141, 174, 9, 0.95)';
          ring.style.boxShadow = theme === 'dark' ? '0 0 10px rgba(203, 234, 48, 0.45)' : '0 0 8px rgba(141, 174, 9, 0.35)';
        }
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [enabled, isTouch, theme]);

  if (!enabled || isTouch) return null;

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      id="custom-cursor-container"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
    >
      {/* Smooth Trailing Outer Ring - slightly thicker and more clearly visible (2.5px stroke) */}
      <div
        ref={ringRef}
        id="custom-cursor-ring"
        className="fixed top-0 left-0 w-[34px] h-[34px] rounded-full border-[2.5px] pointer-events-none will-change-transform"
        style={{
          borderWidth: '2.5px',
          borderColor: isDark ? 'rgba(203, 234, 48, 0.9)' : 'rgba(141, 174, 9, 0.95)',
          boxShadow: isDark ? '0 0 10px rgba(203, 234, 48, 0.45)' : '0 0 8px rgba(141, 174, 9, 0.35)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
      />

      {/* Center Solid Dot */}
      <div
        ref={dotRef}
        id="custom-cursor-dot"
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full pointer-events-none will-change-transform"
        style={{
          backgroundColor: isDark ? '#CBEA30' : '#729004',
          boxShadow: isDark
            ? '0 0 6px rgba(203, 234, 48, 0.8), 0 0 2px #CBEA30'
            : '0 0 6px rgba(114, 144, 4, 0.7)',
        }}
      />
    </div>
  );
}
