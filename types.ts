export interface ItineraryDay {
  id: number;
  date: string;
  title: string;
  loc: string;
  color: string;
  summary: string;
  morning: string;
  afternoon: string;
  evening: string;
  options: string;
  img: string;
}

export interface Restaurant {
  name: string;
  city: string;
  area: string;
  price: number;
  rating: number;
  type: string;
  desc: string;
}

export interface Monument {
  name: string;
  price: number;
  link: string;
}

export type TabType = 'itinerario' | 'gastronomia' | 'transporte' | 'presupuesto';

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'sightseeing' | 'food' | 'transport' | 'nature';
  location?: string;
  imageKeyword?: string;
}

export interface DayPlan {
  date: string;
  dayOfWeek: string;
  location: string;
  summary: string;
  activities: Activity[];
}

export interface TripPlan {
  tripName: string;
  description: string;
  estimatedCost: string;
  tips: string[];
  days: DayPlan[];
}

export interface SlideData {
  id: string | number;
  bgImage: string;
  date?: string;
  title: string;
  subtitle?: string;
  type: 'intro' | 'summary' | 'day' | 'transition';
  highlights?: { icon: string; title: string; desc: string }[];
  content?: {
    morning?: string;
    afternoon?: string;
    lunch?: string;
    dinner?: string;
    stay?: string;
    tips?: string[];
  };
}