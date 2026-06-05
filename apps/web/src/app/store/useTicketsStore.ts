import { create } from "zustand"

type TicketStatus = "open" | "in_progress" | "done";
type TicketPriority = "low" | "medium" | "high";

type Ticket = {
    id: string;
    title: string;
    description: string | null;
    status: TicketStatus;
    priority: TicketPriority;
  };

type TicketsStore = {
    tickets: Ticket[];
    addTicket: (ticket: Ticket) => void;
    updateTicket: (updatedTicket: Ticket, id: string) => void;
}

const baseTickets: Ticket[] = [
    {
      id: "123412412",
      title: "Fix login redirect",
      description: "After login user should land on dashboard.",
      status: "open",
      priority: "high",
    },
    {
      id: "322412412",
      title: "Improve tickets page layout",
      description: "Add spacing and clearer visual hierarchy.",
      status: "in_progress",
      priority: "medium",
    },
    {
      id: "113212412",
      title: "Add empty state illustration",
      description: "Show friendly message when no tickets found.",
      status: "done",
      priority: "low",
    },
    {
      id: "112412322",
      title: "ErrorTicket",
      description: null,
      status: "done",
      priority: "low",
    },
  ]

export const useTicketsStore = create<TicketsStore>((set) => ({
    tickets: baseTickets,
    addTicket: (ticket) => 
        set((state) => ({
            tickets: [...state.tickets, ticket]
        })),
    updateTicket: (updatedTicket, id) => 
        set((state) => {
            const ticketIndex = state.tickets.findIndex((ticket) => id === ticket.id)
            let newTicketsValue = [...state.tickets]
            newTicketsValue[ticketIndex] = updatedTicket
            return ({tickets: newTicketsValue})
        })
}))