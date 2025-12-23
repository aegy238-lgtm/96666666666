
import React, { useState, useEffect, useRef } from 'react';

interface Props {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterEffect: React.FC<Props> = ({ text, speed = 5, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset state if text changes
    if (currentIndex > text.length) {
      setDisplayText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        
        // Auto-scroll logic: Enhanced for faster typing
        const scrollThreshold = 200; 
        const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - scrollThreshold);
        
        // Scroll every 15 characters to keep up with high speed
        if (isNearBottom && currentIndex % 15 === 0) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'auto' // Use 'auto' for high speed to avoid laggy smooth transitions
            });
        }
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <div ref={containerRef} className="relative leading-[1.8] md:leading-[2] text-base md:text-xl whitespace-pre-wrap font-medium text-slate-100">
      {displayText}
      <span className="inline-block w-1.5 md:w-3 h-4 md:h-6 bg-cyan-400 ml-1 cursor align-middle shadow-[0_0_10px_rgba(34,211,238,0.9)]"></span>
    </div>
  );
};

export default TypewriterEffect;
