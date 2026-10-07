import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Slide, SlideElement, PresentationData } from '@/types/presentation';

interface PresentationStore {
  presentation: PresentationData;
  activeSlideId: string;
  selectedElementId: string | null;

  // Actions
  setActiveSlide: (slideId: string) => void;
  selectElement: (elementId: string | null) => void;
  addSlide: () => void;
  deleteSlide: (slideId: string) => void;
  addElement: (type: 'text' | 'heading') => void;
  updateElementPosition: (elementId: string, x: number, y: number) => void;
  updateElementContent: (elementId: string, content: string) => void;
  setPresentation: (data: PresentationData) => void;
}

const initialSlideId = 'slide-1';
const initialPresentation: PresentationData = {
  id: 'pres-default',
  title: 'ارائه من',
  slides: [
    {
      id: initialSlideId,
      background: '#0f172a',
      elements: [
        {
          id: 'el-1',
          type: 'heading',
          content: 'عنوان اسلاید اول',
          x: 100,
          y: 80,
          fontSize: 36,
          color: '#ffffff',
        },
      ],
    },
  ],
};

export const usePresentationStore = create<PresentationStore>()(
  persist(
    (set, get) => ({
      presentation: initialPresentation,
      activeSlideId: initialSlideId,
      selectedElementId: null,

      setActiveSlide: (slideId) => set({ activeSlideId: slideId, selectedElementId: null }),
      selectElement: (elementId) => set({ selectedElementId: elementId }),

      addSlide: () => {
        const newSlideId = `slide-${Date.now()}`;
        const newSlide: Slide = {
          id: newSlideId,
          background: '#0f172a',
          elements: [],
        };
        set((state) => ({
          presentation: {
            ...state.presentation,
            slides: [...state.presentation.slides, newSlide],
          },
          activeSlideId: newSlideId,
        }));
      },

      deleteSlide: (slideId) => {
        const { presentation, activeSlideId } = get();
        if (presentation.slides.length <= 1) return;

        const remainingSlides = presentation.slides.filter((s) => s.id !== slideId);
        const nextActive = activeSlideId === slideId ? remainingSlides[0].id : activeSlideId;

        set({
          presentation: { ...presentation, slides: remainingSlides },
          activeSlideId: nextActive,
        });
      },

      addElement: (type) => {
        const { activeSlideId, presentation } = get();
        const newElement: SlideElement = {
          id: `el-${Date.now()}`,
          type,
          content: type === 'heading' ? 'تیتر جدید' : 'متن توضیحات اسلاید...',
          x: 120,
          y: 150,
          fontSize: type === 'heading' ? 32 : 18,
          color: '#f8fafc',
        };

        const updatedSlides = presentation.slides.map((slide) => {
          if (slide.id !== activeSlideId) return slide;
          return { ...slide, elements: [...slide.elements, newElement] };
        });

        set({
          presentation: { ...presentation, slides: updatedSlides },
          selectedElementId: newElement.id,
        });
      },

      updateElementPosition: (elementId, x, y) => {
        const { activeSlideId, presentation } = get();
        const updatedSlides = presentation.slides.map((slide) => {
          if (slide.id !== activeSlideId) return slide;
          return {
            ...slide,
            elements: slide.elements.map((el) => (el.id === elementId ? { ...el, x, y } : el)),
          };
        });

        set({ presentation: { ...presentation, slides: updatedSlides } });
      },

      updateElementContent: (elementId, content) => {
        const { activeSlideId, presentation } = get();
        const updatedSlides = presentation.slides.map((slide) => {
          if (slide.id !== activeSlideId) return slide;
          return {
            ...slide,
            elements: slide.elements.map((el) => (el.id === elementId ? { ...el, content } : el)),
          };
        });

        set({ presentation: { ...presentation, slides: updatedSlides } });
      },

      setPresentation: (data) => set({ presentation: data, activeSlideId: data.slides[0]?.id || '' }),
    }),
    {
      name: 'present_slide_core_storage',
    }
  )
);