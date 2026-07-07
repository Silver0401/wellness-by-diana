export interface NavItem {
  label: string;
  href: string;
}

export interface EnfoqueCard {
  icon: "leaf" | "target" | "book" | "flask";
  title: string;
  text: string;
}

export interface PriceCard {
  tag: string;
  title: string;
  price: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
}

export interface Testimonial {
  quote: string;
  initial: string;
  age: string;
}

export interface RedCard {
  network: "instagram" | "tiktok" | "whatsapp";
  name: string;
  handle: string;
  href: string;
}
