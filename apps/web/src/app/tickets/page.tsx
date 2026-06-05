"use client";

import { useEffect, useMemo, useState } from "react";
import { CreateTicketForm, Ticket, Notification } from "@ui";
import { useTicketsStore } from "../store/useTicketsStore";


export default function Tickets() {
  const baseTickets = useTicketsStore((state) => state.tickets)
  const addTicket = useTicketsStore((state) => state.addTicket)
  const [showNotification, setShowNotification] = useState(false)

  const [formIsOpen, setFormIsOpen] = useState(false)


  useEffect(() => {
    if(showNotification) 
      setTimeout(() => setShowNotification(false), 3000)
  }, [showNotification])

  return (
    <div>
      <h1>Tickets</h1>
        <button onClick={() => setFormIsOpen(true)}>Create ticket</button>
        {
            baseTickets.map(
                ({id, title, description = '', status, priority}, index) => 
                  (<Ticket 
                    key={id}
                    id={id}
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
            submitFunction={(val: any) => addTicket(val)}
          />
        }
    </div>
  );
}