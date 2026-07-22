import { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById('cursor') as HTMLElement | null;

    if (cursor) {
      const mouseMoveHandler = (event: MouseEvent) => {
        if (cursor) {
          cursor.style.left = `${event.clientX}px`;
          cursor.style.top = `${event.clientY}px`;
          setPosition({ x: event.clientX, y: event.clientY });
        }
      };

      // Add hover detection for interactive elements
      const mouseOverHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.card-hover') ||
          target.closest('[class*="cursor-pointer"]') ||
          target.closest('.badge-pulse')
        ) {
          setIsHovering(true);
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.backgroundColor = '#fb923c';
        } else {
          setIsHovering(false);
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.backgroundColor = '#fbbf24';
        }
      };

      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseover', mouseOverHandler);

      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
        window.removeEventListener('mouseover', mouseOverHandler);
      };
    }
  }, []);

  return (
    <>
      <div id="cursor" className="cursor-follower" />
      {/* Secondary cursor for hover effect */}
      {isHovering && (
        <div
          id="cursor-secondary"
          className="fixed w-8 h-8 border-2 border-yellow-400 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-9999"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
      )}
    </>
  );
};

export default CursorFollower;
