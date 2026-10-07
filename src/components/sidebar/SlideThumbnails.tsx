'use client';

import React from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';

export const SlideThumbnails: React.FC = () => {
  const { presentation, activeSlideId, setActiveSlide, deleteSlide } = usePresentationStore();

  return (
    <aside className="w-56 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col gap-3 overflow-y-auto">
      <div className="text-xs font-semibold text-slate-400 tracking-wider">اسلایدها</div>
      {presentation.slides.map((slide, index) => {
        const isActive = slide.id === activeSlideId;
        return (
          <div
            key={slide.id}
            onClick={() => setActiveSlide(slide.id)}
            className={`group relative aspect-video w-full rounded border p-2 cursor-pointer transition flex items-center justify-center text-xs ${
              isActive
                ? 'border-blue-500 bg-slate-800/80 ring-1 ring-blue-500'
                : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
          >
            <span className="text-slate-400">اسلاید {index + 1}</span>

            {/* دکمه حذف اسلاید */}
            {presentation.slides.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSlide(slide.id);
                }}
                className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 bg-red-600/80 hover:bg-red-600 text-white rounded p-0.5 text-[10px] transition"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
    </aside>
  );
};