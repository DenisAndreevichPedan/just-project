"use client";

import { useEffect, useMemo, useState } from "react";
import { CreateTicketForm, Ticket, Notification } from "@ui";

type TicketStatus = "open" | "in_progress" | "done";
type TicketPriority = "low" | "medium" | "high";

type Ticket = {
  id: string;
  title: string;
  description: string | null;
  status: TicketStatus;
  priority: TicketPriority;
};

const baseTickets = [
  {
    title: "Fix login redirect",
    description: "After login user should land on dashboard.",
    status: "open",
    priority: "high",
  },
  {
    title: "Improve tickets page layout",
    description: "Add spacing and clearer visual hierarchy.",
    status: "in_progress",
    priority: "medium",
  },
  {
    title: "Add empty state illustration",
    description: "Show friendly message when no tickets found.",
    status: "done",
    priority: "low",
  },
  {
    title: "ErrorTicket",
    description: null,
    status: "done",
    priority: "low",
  },
]

export default function Tickets() {
  const [showNotification, setShowNotification] = useState(false)

  const [formIsOpen, setFormIsOpen] = useState(false)

  const [tickets, setTickets] = useState(baseTickets)

  useEffect(() => {
    if(showNotification) 
      setTimeout(() => setShowNotification(false), 3000)
  }, [showNotification])

  return (
    <div>
      <h1>Tickets</h1>
        <button onClick={() => setFormIsOpen(true)}>Create ticket</button>
        {
            tickets.map(
                ({title, description = '', status, priority}, index) => 
                  (<Ticket 
                    key={index}
                    title={title} 
                    description={description} 
                    status={status} 
                    priority={priority} 
                    setShowNotification={() => setShowNotification(true)}
                    />
                  )
            )
        }
        {
          showNotification && <Notification text="Отсутствует тикет"/>
        }
        {
          formIsOpen && 
          <CreateTicketForm 
          formIsOpen={formIsOpen} 
          submitFunction={(val: any) => setTickets((prev) => ([...prev, val]))}
          />
        }
    </div>
  );
}