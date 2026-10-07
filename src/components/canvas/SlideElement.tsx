'use client';

import React, { useRef } from 'react';
import { SlideElement as ElementProps } from '@/types/presentation';
import { usePresentationStore } from '@/store/usePresentationStore';

interface Props {
  element: ElementProps;
}

export const SlideElementComponent: React.FC<Props> = ({ element }) => {
  const { selectedElementId, selectElement, updateElementPosition, updateElementContent } =
    usePresentationStore();
  const isSelected = selectedElementId === element.id;

  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    selectElement(element.id);

    // ثبت مختصات اولیه شروع درگ
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: element.x,
      initialY: element.y,
    };

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;

    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;

    // موقعیت جدید با اعمال تغییرات ماوس
    const newX = Math.max(0, dragRef.current.initialX + deltaX);
    const newY = Math.max(0, dragRef.current.initialY + deltaY);

    updateElementPosition(element.id, Math.round(newX), Math.round(newY));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // نادیده گرفتن خطای احتمالی لغو رویداد
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        left: `${element.x}px`,
        top: `${element.y}px`,
        fontSize: `${element.fontSize}px`,
        color: element.color,
      }}
      className={`absolute cursor-move select-none p-2 rounded transition-shadow ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-500/10' : 'hover:ring-1 hover:ring-slate-500'
      }`}
    >
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => updateElementContent(element.id, e.currentTarget.textContent || '')}
        className="outline-none"
      >
        {element.content}
      </span>
    </div>
  );
};