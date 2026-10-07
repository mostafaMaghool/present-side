'use client';

import React from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';

export const SlideThumbnails: React.FC = () => {
  const {
    presentation,
    activeSlideId,
    setActiveSlide,
    addSlide,
    deleteSlide,
    addElement,
  } = usePresentationStore();

  return (
    <aside className="w-72 border-l border-[#162727] bg-[#0a1313] p-4 flex flex-col justify-between text-slate-200 h-[calc(100vh-64px)] select-none">
      {/* بخش بالای سایدبار: مدیریت اسلایدها */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-slate-300 font-bold border-b border-[#1b2d2d] pb-2">
          <div className="flex items-center gap-1.5">
            <span>اسلایدهای ارائه</span>
            <span>📑</span>
          </div>
          <button
            onClick={addSlide}
            className="text-[11px] bg-[#122424] hover:bg-[#1a3434] text-emerald-400 border border-[#214343] px-2 py-1 rounded transition"
          >
            + اسلاید جدید
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-1">
          {presentation.slides.map((slide, index) => {
            const isActive = slide.id === activeSlideId;
            return (
              <div
                key={slide.id}
                onClick={() => setActiveSlide(slide.id)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-xs cursor-pointer transition ${
                  isActive
                    ? 'border-[#00c48c] bg-[#0c1f1d] text-white shadow-sm'
                    : 'border-[#1b2c2c] bg-[#0c1717] hover:border-[#2b4444] text-slate-400'
                }`}
              >
                {presentation.slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlide(slide.id);
                    }}
                    className="text-slate-500 hover:text-red-400 text-sm leading-none"
                  >
                    ✕
                  </button>
                )}
                <span className="font-medium truncate flex-1 text-right mr-2">
                  {index === 0
                    ? 'سبد پیشنهادی و دارایی‌ها'
                    : index === 1
                    ? 'سناریوهای مقایسه‌ای و تسک‌ها'
                    : `اسلاید شماره ${index + 1}`}
                </span>
                <span className="text-[11px] bg-[#152727] text-slate-400 px-1.5 py-0.5 rounded font-mono">
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* بخش پایین سایدبار: المان‌های آماده */}
      <div className="flex flex-col gap-2 pt-4 border-t border-[#172929]">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>المان‌های قابل درگ به اسلاید:</span>
          <span>🧩</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addElement('heading')}
            className="flex items-center justify-between px-2.5 py-2 text-[11px] bg-[#0e1b1b] hover:bg-[#162a2a] border border-[#1d3535] rounded-md transition text-slate-300"
          >
            <span>سربرگ اسلاید</span>
            <span>🏷️</span>
          </button>
          <button
            onClick={() => addElement('heading')}
            className="flex items-center justify-between px-2.5 py-2 text-[11px] bg-[#0e1b1b] hover:bg-[#162a2a] border border-[#1d3535] rounded-md transition text-slate-300"
          >
            <span>کارت شاخص‌ها</span>
            <span>📈</span>
          </button>
          <button
            onClick={() => addElement('text')}
            className="flex items-center justify-between px-2.5 py-2 text-[11px] bg-[#0e1b1b] hover:bg-[#162a2a] border border-[#1d3535] rounded-md transition text-slate-300"
          >
            <span>اسلایدر سناریو</span>
            <span>🎚️</span>
          </button>
          <button
            onClick={() => addElement('text')}
            className="flex items-center justify-between px-2.5 py-2 text-[11px] bg-[#0e1b1b] hover:bg-[#162a2a] border border-[#1d3535] rounded-md transition text-slate-300"
          >
            <span>نمودار تحلیلی</span>
            <span>📊</span>
          </button>
          <button
            onClick={() => addElement('text')}
            className="flex items-center justify-between px-2.5 py-2 text-[11px] bg-[#0e1b1b] hover:bg-[#162a2a] border border-[#1d3535] rounded-md transition text-slate-300"
          >
            <span>چک‌لیست تسک</span>
            <span>☑️</span>
          </button>
          <button
            onClick={() => addElement('text')}
            className="flex items-center justify-between px-2.5 py-2 text-[11px] bg-[#0e1b1b] hover:bg-[#162a2a] border border-[#1d3535] rounded-md transition text-slate-300"
          >
            <span>بلوک یادداشت</span>
            <span>📝</span>
          </button>
        </div>
      </div>
    </aside>
  );
};