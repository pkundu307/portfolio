import { useEffect } from 'react';

const CursorFollower = () => {
  useEffect(() => {
    // Ensure the element is of type HTMLElement
    const cursor = document.getElementById('cursor') as HTMLElement | null;

    // Check if cursor element exists to avoid null errors
    if (cursor) {
      const mouseMoveHandler = (event: MouseEvent) => {
        if (cursor) {
          cursor.style.left = `${event.clientX - 10}px`; // Center the circle at the mouse position
          cursor.style.top = `${event.clientY - 10}px`; // Center the circle at the mouse position
        }
      };

      // Add event listener for mouse move
      window.addEventListener('mousemove', mouseMoveHandler);

      // Clean up on component unmount
      return () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
      };
    }
  }, []);

  return (
    <div id="cursor" className="cursor-follower"></div>
  );
};

export default CursorFollower;
