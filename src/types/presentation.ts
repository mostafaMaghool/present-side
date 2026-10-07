export type ElementType = 'text' | 'heading';

export interface SlideElement {
  id: string;
  type: ElementType;
  content: string;
  x: number; // مختصات افقی بر حسب پیکسل
  y: number; // مختصات عمودی بر حسب پیکسل
  fontSize: number;
  color: string;
  width?: number;
}

export interface Slide {
  id: string;
  background: string;
  elements: SlideElement[];
}

export interface PresentationData {
  id: string;
  title: string;
  slides: Slide[];
}