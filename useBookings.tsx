import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Booking {
  id: string;
  bikeType: string;
  bikeName: string;
  date: string;
  timeSlot: string;
  duration: string;
  totalFare: number;
  confirmationId: string;
  username: string;
  createdAt: string;
}

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'confirmationId' | 'createdAt'>) => Booking;
  getTotalBookings: () => number;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

const generateConfirmationId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'RW-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem('ridewise-bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'confirmationId' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      confirmationId: generateConfirmationId(),
      createdAt: new Date().toISOString(),
    };

    const updated = [...bookings, newBooking];
    setBookings(updated);
    sessionStorage.setItem('ridewise-bookings', JSON.stringify(updated));
    
    return newBooking;
  };

  const getTotalBookings = () => bookings.length;

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, getTotalBookings }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within BookingsProvider');
  }
  return context;
};
