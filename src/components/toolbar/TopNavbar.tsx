'use client';

import React from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';
import Link from 'next/link';

export const TopNavbar: React.FC = () => {
  const { presentation, addSlide, addElement } = usePresentationStore();

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(presentation, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${presentation.title || 'presentation'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900 px-4 flex items-center justify-between text-slate-200">
      <div className="flex items-center gap-3">
        <span className="font-bold text-blue-500 text-lg">PresentSlide</span>
        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">Core</span>
      </div>

      {/* دکمه‌های ابزار ویرایش */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => addElement('heading')}
          className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 rounded transition"
        >
          + تیتر
        </button>
        <button
          onClick={() => addElement('text')}
          className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 rounded transition"
        >
          + متن
        </button>
        <button
          onClick={addSlide}
          className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 rounded font-medium transition"
        >
          + اسلاید جدید
        </button>
      </div>

      {/* خروجی و اجرای پرزنت */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleExportJSON}
          className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 rounded transition"
        >
          دانلود JSON
        </button>
        <Link
          href="/present"
          className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-500 rounded font-medium transition"
        >
          شروع ارائه (Present)
        </Link>
      </div>
    </header>
  );
};