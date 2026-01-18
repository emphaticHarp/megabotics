'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryItems = [
  { emoji: '🤖', title: 'Robotics Lab', desc: 'State-of-the-art robotics development facility' },
  { emoji: '🚁', title: 'Drone Testing', desc: 'Advanced drone testing and calibration center' },
  { emoji: '🏭', title: 'Manufacturing', desc: 'Precision manufacturing and assembly unit' },
  { emoji: '💻', title: 'AI Center', desc: 'Cutting-edge AI and machine learning hub' },
  { emoji: '🔬', title: 'R&D Lab', desc: 'Research and development innovation center' },
  { emoji: '🌐', title: 'Operations', desc: 'Global operations and deployment center' },
];

export function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 2) % galleryItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 2) % galleryItems.length);
    setAutoPlay(true);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 2 + galleryItems.length) % galleryItems.length);
    setAutoPlay(true);
  };

  const getVisibleItems = () => {
    return [
      galleryItems[current],
      galleryItems[(current + 1) % galleryItems.length],
    ];
  };

  return (
    <div className="space-y-6">
      {/* Slider */}
      <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative h-72 flex items-center justify-center px-4">
          {/* Items Grid */}
          <div className="w-full grid grid-cols-2 gap-6">
            {getVisibleItems().map((item, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 text-center space-y-3 animate-in fade-in duration-500"
              >
                <div className="text-5xl">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-2 z-10 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-2 z-10 p-2 bg-white hover:bg-gray-100 rounded-full shadow-md transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(galleryItems.length / 2) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx * 2);
              setAutoPlay(true);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx * 2 === current ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
