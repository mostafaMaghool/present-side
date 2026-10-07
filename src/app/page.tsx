'use client';

import React, { useEffect, useState } from 'react';
import { TopNavbar } from '@/components/toolbar/TopNavbar';
import { SlideThumbnails } from '@/components/sidebar/SlideThumbnails';
import { Canvas } from '@/components/canvas/Canvas';

export default function EditorPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-500">
        در حال بارگذاری...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <SlideThumbnails />
        <Canvas />
      </div>
    </div>
  );
}