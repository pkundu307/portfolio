import { useEffect } from 'react';

const CursorFollower = () => {
  useEffect(() => {
    // Handle mouse movement
    const cursor = document.getElementById('cursor');

    const mouseMoveHandler = (event) => {
      cursor.style.left = `${event.clientX - 10}px`; // Center the circle at the mouse position
      cursor.style.top = `${event.clientY - 10}px`; // Center the circle at the mouse position
    };

    // Add event listener for mouse move
    window.addEventListener('mousemove', mouseMoveHandler);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div id="cursor" className="cursor-follower"></div>
  );
};

export default CursorFollower;
