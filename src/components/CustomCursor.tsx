import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
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
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
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
    let animationFrameId: number;

    const follow = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Crimson Red Dot */}
      <div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#A71D2A] rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out shadow-[0_0_10px_#C82333]"
        style={{
          transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${
            isClicking ? 0.6 : isHovered ? 1.6 : 1
          })`,
        }}
      />

      {/* Outer Crimson Metallic Ring */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? 'w-14 h-14 border-[#A71D2A] bg-[#A71D2A]/15 scale-110 shadow-[0_0_20px_rgba(167,29,42,0.4)]'
            : 'w-8 h-8 border-white/20 scale-100'
        }`}
        style={{
          transform: `translate3d(${
            isHovered ? trailingPos.x - 28 : trailingPos.x - 16
          }px, ${isHovered ? trailingPos.y - 28 : trailingPos.y - 16}px, 0)`,
        }}
      />
    </>
  );
};
