'use client';

import { useState, useEffect, useRef } from 'react';

const techStack = [
  'mern',
  'node',
  'RAILS',
  'python',
  'django',
  'react',
  'nextjs',
  'vue',
  'angular',
  'typescript',
  'javascript',
  'java',
  'php',
  'laravel',
  'express',
  'mongodb',
  'postgresql',
  'mysql',
  'redis',
  'docker',
  'kubernetes',
  'aws',
  'azure',
  'gcp',
];

export default function TechStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const itemsToShow = 6;
  const itemWidth = 192; // 168px width + 24px gap

  useEffect(() => {
    // Auto-scroll every 3 seconds
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          setIsTransitioning(false);
          return (prevIndex + 1) % techStack.length;
        });
      }, 700); // Match transition duration
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Get the 6 items to display starting from currentIndex
  const getDisplayItems = () => {
    const items = [];
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % techStack.length;
      items.push(techStack[index]);
    }
    return items;
  };

  const displayItems = getDisplayItems();
  const nextItem = techStack[(currentIndex + itemsToShow) % techStack.length];

  return (
    <section className="py-20 bg-black relative">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          We Support your entire{' '}
          <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h2>
        
        {/* Slider Container */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="flex justify-center">
            <div 
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{
                width: `${itemsToShow * itemWidth}px`,
                transform: isTransitioning ? `translateX(-${itemWidth}px)` : 'translateX(0)'
              }}
            >
              {displayItems.map((tech, index) => (
                <div
                  key={`${tech}-${currentIndex}-${index}`}
                  className="flex-shrink-0 bg-black border border-red-500/50 rounded-full px-8 py-4 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/30 hover:-translate-y-1 transition-all duration-300 transform"
                  style={{
                    width: '168px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span className="text-white font-semibold text-lg tracking-wide whitespace-nowrap block text-center">
                    {tech}
                  </span>
                </div>
              ))}
              {/* Next item for smooth transition */}
              {isTransitioning && (
                <div
                  className="flex-shrink-0 bg-black border border-red-500/50 rounded-full px-8 py-4"
                  style={{
                    width: '168px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span className="text-white font-semibold text-lg tracking-wide whitespace-nowrap block text-center">
                    {nextItem}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
