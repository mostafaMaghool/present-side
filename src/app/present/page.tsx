'use client';

import React, { useEffect, useState } from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';
import { useRouter } from 'next/navigation';

export default function PresentPage() {
  const router = useRouter();
  const { presentation } = usePresentationStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = presentation.slides;
  const currentSlide = slides[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        router.push('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, router]);

  if (!mounted || !currentSlide) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-500">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen relative flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: currentSlide.background }}
    >
      <div className="relative w-[960px] h-[540px]">
        {currentSlide.elements.map((el) => (
          <div
            key={el.id}
            style={{
              position: 'absolute',
              left: `${el.x}px`,
              top: `${el.y}px`,
              fontSize: `${el.fontSize}px`,
              color: el.color,
            }}
          >
            {el.content}
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 right-6 text-sm text-slate-500 font-mono select-none">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
}