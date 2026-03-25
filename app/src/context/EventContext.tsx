import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface EventData {
  id: string;
  name: string;
  category: 'Technical' | 'Creative' | 'Sports' | 'Workshop';
  date: string; // Used for "Temporal Sync"
  location: string; // Used for "Deployment Zone"
  description: string; // Used for "Technical Brief"
  coordinatorId: string;
  // Fields for the generic event registry (EventsPage)
  price?: number;
  tag?: string;
  image?: string;
  imageAlt?: string;
}

interface EventContextType {
  allEvents: EventData[];
  addEvent: (event: Omit<EventData, 'id'>) => void;
  updateEvent: (id: string, updatedData: Partial<EventData>) => void;
}

const INITIAL_EVENTS: EventData[] = [
  {
    id: 'meta-01',
    name: 'Metaphysical Symposium 01',
    category: 'Creative',
    date: '18:00 HRS',
    location: 'Hall G-24',
    description: 'A deep dive into the digital consciousness and the evolution of the virtual self.',
    coordinatorId: 'ADMIN-001',
  },
  {
    id: 'meta-02',
    name: 'Metaphysical Symposium 02',
    category: 'Creative',
    date: '20:00 HRS',
    location: 'Hall G-24',
    description: 'Exploring the boundaries of reality and virtual space in the modern era.',
    coordinatorId: 'ADMIN-001',
  },
  {
    id: 'synthetica-2024',
    name: 'Synthetica Summit 2024',
    date: 'Oct 12',
    location: 'Neo Tokyo',
    price: 149,
    category: 'Technical',
    tag: 'Level 01',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    imageAlt: 'Cyberpunk city at night with blue neon lights',
    description: 'Annual gathering of synthetic intelligence experts.',
    coordinatorId: 'TECH-04'
  },
  {
    id: 'void-discovery',
    name: 'Void Discovery Protocol',
    date: 'Nov 05',
    location: 'SF Orbit',
    price: 189,
    category: 'Technical',
    tag: 'Celestial',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    imageAlt: 'Abstract cosmic nebula with deep blue and purple gases',
    description: 'Protocol discovery in the SF Orbit zone.',
    coordinatorId: 'SCI-09'
  },
  {
    id: 'silicon-foundry',
    name: 'Silicon Foundry Expo',
    date: 'Dec 01',
    location: 'Berlin Lab',
    price: 219,
    category: 'Technical',
    tag: 'Hardware',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80',
    imageAlt: 'Microchip with glowing circuitry paths',
    description: 'Expo for silicon manufacturing and research.',
    coordinatorId: 'ENG-12'
  },
];

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [allEvents, setAllEvents] = useState<EventData[]>(INITIAL_EVENTS);

  const addEvent = (event: Omit<EventData, 'id'>) => {
    const newEvent: EventData = {
      ...event,
      id: Math.random().toString(36).substring(2, 9),
    };
    setAllEvents((prev) => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, updatedData: Partial<EventData>) => {
    setAllEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, ...updatedData } : evt))
    );
  };

  return (
    <EventContext.Provider value={{ allEvents, addEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
