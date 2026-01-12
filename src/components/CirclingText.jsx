import { useEffect, useRef } from 'react';
import './CirclingText.css';

// Rotating circular text component - adds creative flair to sections
const CirclingText = ({ 
  text = "CREATIVE • BUILDER • DEVELOPER • ", 
  size = 150, 
  speed = 0.3,
  className = ""
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    let rotation = 0;
    let animationId;

    const animate = () => {
      rotation += speed;
      element.style.transform = `rotate(${rotation}deg)`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  // Calculate the path radius based on size
  const radius = (size / 2) - 15;

  return (
    <div className={`circling-text-wrapper ${className}`} style={{ width: size, height: size }}>
      <svg ref={textRef} className="circling-text-svg" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <path
            id={`circlePath-${size}`}
            d={`M ${size/2}, ${size/2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius*2},0 a ${radius},${radius} 0 1,1 -${radius*2},0`}
          />
        </defs>
        <text className="circling-text-content">
          <textPath href={`#circlePath-${size}`}>
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CirclingText;
