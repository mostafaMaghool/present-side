'use client';

import React from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';
import { SlideElementComponent } from './SlideElement';

export const Canvas: React.FC = () => {
  const { presentation, activeSlideId, selectElement } = usePresentationStore();
  const currentSlide = presentation.slides.find((s) => s.id === activeSlideId);

  if (!currentSlide) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500 font-sans">
        هیچ اسلایدی انتخاب نشده است
      </div>
    );
  }

  return (
    <main
      className="flex-1 bg-[#18181b] flex items-center justify-center p-6 overflow-auto"
      onClick={() => selectElement(null)}
    >
      {/* بوم اسلاید با ابعاد دقیق ۱۶:۹ */}
      <div
        className="relative w-[960px] h-[540px] bg-slate-900 rounded-md shadow-2xl border border-zinc-700/60 overflow-hidden"
        style={{ backgroundColor: currentSlide.background }}
      >
        {currentSlide.elements.map((element) => (
          <SlideElementComponent key={element.id} element={element} />
        ))}
      </div>
    </main>
  );
};