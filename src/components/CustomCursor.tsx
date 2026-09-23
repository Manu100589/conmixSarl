import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorMode, setCursorMode] = useState<'default' | 'button' | 'view' | 'explore'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Strictly disable custom cursor on touch/mobile/tablet devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024) {
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Project cards
      if (
        target.closest('[data-cursor="explore"]') ||
        target.closest('#projets-realises') ||
        target.closest('.project-card')
      ) {
        setCursorMode('explore');
        return;
      }

      // Images / Showcases
      if (
        target.closest('[data-cursor="view"]') ||
        target.tagName === 'IMG' ||
        target.closest('.image-view-trigger')
      ) {
        setCursorMode('view');
        return;
      }

      // Buttons / Links / Interactive
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      ) {
        setCursorMode('button');
        return;
      }

      setCursorMode('default');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.16,
        y: prev.y + (position.y - prev.y) * 0.16,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isVisible]);

  if (!isVisible) return null;

  const isView = cursorMode === 'view';
  const isExplore = cursorMode === 'explore';
  const isButton = cursorMode === 'button';

  return (
    <>
      {/* 1. Curseur principal : petit cercle blanc */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${
            isClicking ? 0.5 : isView || isExplore ? 0 : 1
          })`,
        }}
      />

      {/* 2. Curseur secondaire : cercle rouge légèrement retardé */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center transition-all duration-300 ease-out select-none ${
          isView || isExplore
            ? 'w-20 h-20 bg-[#C82333]/90 text-white font-space font-extrabold text-[10px] tracking-widest uppercase shadow-[0_0_30px_rgba(200,35,51,0.6)] backdrop-blur-sm'
            : isButton
            ? 'w-14 h-14 border border-[#C82333] bg-[#C82333]/15 scale-110 shadow-[0_0_20px_rgba(200,35,51,0.35)]'
            : 'w-8 h-8 border border-[#C82333]/60 bg-[#C82333]/5 scale-100'
        }`}
        style={{
          transform: `translate3d(${
            isView || isExplore ? trailingPos.x - 40 : isButton ? trailingPos.x - 28 : trailingPos.x - 16
          }px, ${
            isView || isExplore ? trailingPos.y - 40 : isButton ? trailingPos.y - 28 : trailingPos.y - 16
          }px, 0) scale(${isClicking ? 0.85 : 1})`,
        }}
      >
        {isView && <span>VIEW</span>}
        {isExplore && <span>EXPLORE</span>}
      </div>
    </>
  );
};
