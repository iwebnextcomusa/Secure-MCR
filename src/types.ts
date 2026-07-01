export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  imageType: "dome" | "bullet" | "wireless" | "kit2" | "kit4" | "kit8" | "nvr" | "dvr" | "ptz";
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  tag: "Residential" | "Commercial";
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
