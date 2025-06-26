import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Ticket {
  id: string;
  from: string;
  to: string;
  passengers: number;
  ticketType: string;
  fare: number;
  travelDate: string;
  travelTime: string;
  bookingDate: string;
  status: 'active' | 'used' | 'expired' | 'cancelled';
  userId: string;
}

interface TicketContextType {
  tickets: Ticket[];
  bookTicket: (ticket: Ticket) => void;
  cancelTicket: (ticketId: string) => void;
  getUserTickets: (userId: string) => Ticket[];
}

const TicketContext = createContext<TicketContextType | null>(null);

export const TicketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const bookTicket = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  const cancelTicket = (ticketId: string) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, status: 'cancelled' as const }
          : ticket
      )
    );
  };

  const getUserTickets = (userId: string) => {
    return tickets.filter(ticket => ticket.userId === userId);
  };

  return (
    <TicketContext.Provider value={{ tickets, bookTicket, cancelTicket, getUserTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicket must be used within a TicketProvider');
  }
  return context;
};