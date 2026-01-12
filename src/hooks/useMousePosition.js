import { useState, useEffect } from 'react';

// tracks mouse position globally
// returns normalized values (-1 to 1) centered on screen
export const useMousePosition = () => {
  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  };

  const [mousePosition, setMousePosition] = useState(getInitialPosition);
  const [normalizedPosition, setNormalizedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePositions = (clientX, clientY) => {
      setMousePosition({ x: clientX, y: clientY });
      
      // normalize to -1 to 1
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (clientY / window.innerHeight) * 2 - 1;
      setNormalizedPosition({ x: normalizedX, y: normalizedY });
    };

    const handlePointerMove = (e) => updatePositions(e.clientX, e.clientY);
    const supportsPointerMove = typeof window !== 'undefined' && 'onpointermove' in window;

    // start centered
    const initial = getInitialPosition();
    updatePositions(initial.x, initial.y);

    if (supportsPointerMove) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    } else {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    return () => {
      if (supportsPointerMove) {
        window.removeEventListener('pointermove', handlePointerMove);
      } else {
        window.removeEventListener('mousemove', handlePointerMove);
      }
    };
  }, []);

  return { mousePosition, normalizedPosition };
};

export default useMousePosition;
