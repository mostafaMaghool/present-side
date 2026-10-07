'use client';

import React from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';
import { SlideElementComponent } from './SlideElement';

export const Canvas: React.FC = () => {
  const { presentation, activeSlideId, selectElement } = usePresentationStore();
  const currentSlide = presentation.slides.find((s) => s.id === activeSlideId);

  if (!currentSlide) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        اسلایدی انتخاب نشده است.
      </div>
    );
  }

  return (
    <div
      className="flex-1 bg-slate-950 flex items-center justify-center p-8 overflow-auto"
      onClick={() => selectElement(null)}
    >
      <div
        className="relative w-[960px] h-[540px] shadow-2xl rounded-lg overflow-hidden border border-slate-800 transition-colors"
        style={{ backgroundColor: currentSlide.background }}
      >
        {currentSlide.elements.map((element) => (
          <SlideElementComponent key={element.id} element={element} />
        ))}
      </div>
    </div>
  );
};