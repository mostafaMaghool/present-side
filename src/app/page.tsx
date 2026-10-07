'use client';

import React, { useEffect, useState } from 'react';
import { TopNavbar } from '@/components/toolbar/TopNavbar';
import { SlideThumbnails } from '@/components/sidebar/SlideThumbnails';
import { PropertySidebar } from '@/components/sidebar/PropertySidebar';
import { Canvas } from '@/components/canvas/Canvas';

export default function EditorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#071010] text-emerald-400 font-mono text-sm">
        در حال بارگذاری محیط ویرایشگر...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#071010] font-sans" dir="rtl">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        {/* پنل راست: مدیریت اسلایدها و ابزارها */}
        <SlideThumbnails />
        {/* بخش وسط: بوم اسلاید */}
        <Canvas />
        {/* پنل چپ: خصوصیات المان */}
        <PropertySidebar />
      </div>
    </div>
  );
}