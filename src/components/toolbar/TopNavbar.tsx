'use client';

import React from 'react';
import { usePresentationStore } from '@/store/usePresentationStore';
import Link from 'next/link';

export const TopNavbar: React.FC = () => {
  const { presentation } = usePresentationStore();

  const handleSave = () => {
    // اکشن ذخیره در localStorage انجام شده است، یک فیدبک ساده نشان می‌دهیم
    alert('ارائه با موفقیت ذخیره شد!');
  };

  return (
    <header className="h-16 border-b border-[#1b2b2b] bg-[#071010] px-6 flex items-center justify-between text-slate-100 select-none">
      {/* سمت چپ: دکمه‌های پرزنت و ذخیره */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#10b981] hover:bg-[#059669] text-white rounded-lg transition shadow-md shadow-emerald-950/40"
        >
          <span>ذخیره سریع</span>
          <span>💾</span>
        </button>

        <Link
          href="/present"
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#111e1e] hover:bg-[#1a2d2d] text-slate-200 border border-[#213838] rounded-lg transition"
        >
          <span>نمایش حالت ارائه (تمام صفحه)</span>
          <span>💻</span>
        </Link>
      </div>

      {/* وسط: سوییچ تم تیره/روشن */}
      <div className="flex items-center bg-[#0d1717] border border-[#1b2e2e] p-1 rounded-lg">
        <button className="px-3 py-1 text-xs rounded-md bg-[#10b981] text-white font-medium">
          تیره
        </button>
        <button className="px-3 py-1 text-xs rounded-md text-slate-400 hover:text-white transition">
          روشن
        </button>
      </div>

      {/* سمت راست: نام ارائه و برند */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-300">
          {presentation.title || 'وبینار تحلیل دارایی‌ها و سناریوها'}
        </span>
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00c48c] text-[#052820] font-black text-xs shadow-md">
          <span>SlideBuilder Studio</span>
          <span>⚡</span>
        </div>
      </div>
    </header>
  );
};