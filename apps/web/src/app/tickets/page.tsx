"use client";

import { useMemo } from "react";
import { Ticket } from "@ui";

type TicketStatus = "open" | "in_progress" | "done";
type TicketPriority = "low" | "medium" | "high";

type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
};

export default function Tickets() {
  const tickets = useMemo<Ticket[]>(
    () => [
      {
        id: "TCK-001",
        title: "Fix login redirect",
        description: "After login user should land on dashboard.",
        status: "open",
        priority: "high",
      },
      {
        id: "TCK-002",
        title: "Improve tickets page layout",
        description: "Add spacing and clearer visual hierarchy.",
        status: "in_progress",
        priority: "medium",
      },
      {
        id: "TCK-003",
        title: "Add empty state illustration",
        description: "Show friendly message when no tickets found.",
        status: "done",
        priority: "low",
      },
    ],
    []
  );

  return (
    <div>
      <h1>Tickets</h1>
        {
            tickets.map(
                ({id, title, description, status, priority}) => 
                  (<Ticket title={title} description={description} status={status} priority={priority}/>)
            )
        }
    </div>
  );
}