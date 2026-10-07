'use client';

import React from 'react';

export const PropertySidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-[#162727] bg-[#0a1313] p-4 text-slate-200 h-[calc(100vh-64px)] select-none">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 border-b border-[#1b2d2d] pb-2">
        <span>⚙️</span>
        <span>تنظیمات و مشخصات المان</span>
      </div>

      <div className="mt-4 text-xs text-slate-400 leading-6 text-center">
        روی هر المان در اسلاید کلیک کنید تا متن‌ها، عنوان، درصدها یا تنظیمات آن را به صورت زنده تغییر دهید.
      </div>
    </aside>
  );
};