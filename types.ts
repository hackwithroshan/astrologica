import type { LucideProps } from 'lucide-react';
import type React from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'temple_manager';
  assignedTempleId?: number;
  mobile?: string;
  password: string;
}

export interface Puja {
  id: number;
  nameKey: string;
  descriptionKey: string;
  price: number;
  isEPuja?: boolean;
  detailsKey?: string;
  virtualTourLink?: string;
  requirementsKey?: string;
}

export interface AvailablePrasad {
    id: number;
    nameKey: string;
    descriptionKey: string;
    imageUrl: string;
    priceMonthly: number;
    priceQuarterly: number;
}

export interface Temple {
  id: number;
  nameKey: string;
  locationKey: string;
  deityKey: string;
  famousPujaKey: string;
  imageUrl: string;
  descriptionKey: string;
  gallery: string[];
  pujas: Puja[];
  availablePrasads?: AvailablePrasad[];
  benefitsKey: string[];
  reviewIds: number[];
  faq: {
    questionKey: string;
    answerKey: string;
  }[];
  layoutImageUrl?: string;
}

export interface QuickAction {
  id: number;
  labelKey: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

export interface Service {
    _id: string;
    id: number;
    titleKey: string;
    descriptionKey: string;
    icon: string;
}

export interface Testimonial {
    _id: string;
    id: number;
    quote: string;
    author: string;
    location: string;
}

export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

export interface PopulatedUser {
    _id: string;
    name: string;
    email: string;
}

export interface Booking {
  id: string; // transactionId
  userId: string | PopulatedUser;
  userEmail: string;
  pujaNameKey: string;
  templeNameKey: string;
  date: string; // YYYY-MM-DD format
  status: BookingStatus;
  price: number;
  isEPuja?: boolean;
  liveStreamLink?: string;
  numDevotees: number;
  fullName: string;
  phoneNumber: string;
  addOns?: {
    guideLanguage?: string;
    pickupDrop?: boolean;
    poojaItems?: boolean;
    receiveNotifications?: boolean;
  };
  // FIX: Add createdAt property to match backend model
  createdAt: string;
}

export interface PrasadSubscription {
  _id: string;
  id: string; // transactionId
  userId: string | PopulatedUser;
  templeNameKey: string;
  prasadNameKey: string;
  frequency: 'Monthly' | 'Quarterly';
  nextDeliveryDate: string; // YYYY-MM-DD format
  status: 'Active' | 'Cancelled';
  price: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  // FIX: Add createdAt property to match backend model and fix type error
  createdAt: string;
}

export interface TourPackage {
    _id: string;
    id: number;
    nameKey: string;
    descriptionKey: string;
    imageUrl: string;
    price: number;
    durationKey: string;
}

export interface SpecialSeva {
    id: number;
    nameKey: string;
    descriptionKey: string;
    imageUrl: string;
    price: number;
    templeNameKey: string;
    benefitsKey: string;
}

export interface SeasonalEvent {
    title: string;
    description: string;
    cta: string;
    imageUrl: string;
}

export interface AppSettings {
    helpline: string;
    whatsapp: string;
    email: string;
}

export interface QueueAssistancePackage {
  _id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  order: number;
}

export interface QueueAssistanceAddOn {
  _id: string;
  name: string;
  description: string;
  price: number;
  active: boolean;
  type: 'guide' | 'pickup' | 'poojaItems';
}


// For PhonePe Payment
// FIX: Add createdAt to Omit to prevent type errors when creating payment payloads.
export type PaymentDetails = Omit<Booking, 'status' | 'userId' | 'userEmail' | 'id' | 'createdAt'> | Omit<PrasadSubscription, '_id' | 'userId' | 'nextDeliveryDate' | 'status' | 'id' | 'createdAt'>;

export interface PaymentPayload {
    amount: number;
    details: PaymentDetails;
    type: 'booking' | 'subscription';
}