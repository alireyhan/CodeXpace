'use client';

import { useEffect, useRef, useState } from 'react';

interface ServiceDescriptionProps {
  title: string;
  description: string | string[];
}

export default function ServiceDescription({ title, description }: ServiceDescriptionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Convert description to array if it's a string
  const descriptionArray = Array.isArray(description) ? description : [description];

  return (
    <section className="py-20 bg-black relative">
      <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-8 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <div
          className={`space-y-6 text-gray-300 leading-relaxed transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {descriptionArray.map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

