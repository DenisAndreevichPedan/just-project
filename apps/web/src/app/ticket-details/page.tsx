'use client'

import { useSearchParams } from 'next/navigation'
import { CreateTicketForm, StatusBadge } from "@ui"
import { useTicketsStore } from '../store/useTicketsStore'
import { useState } from 'react'

export default function TicketDetails () {
    const [formIsOpen, setFormIsOpen] = useState(false)
    
    const searchParams = useSearchParams()
    const ticketId = searchParams.get('id')

    const allTickets = useTicketsStore((state) => state.tickets)
    const updateTicket = useTicketsStore((state) => state.updateTicket)
    const { title, description, status, priority } = (allTickets.filter(({id}) => ticketId === id))[0]


    return (
        <div>
            <button onClick={() => setFormIsOpen(true)}>Edit ticket</button>
            <div>Details:</div>
            <br/>
            <div>title: <span>{title}</span></div>
            <div>description: <span>{description}</span></div>
            <div>priority: <span>{priority}</span></div>
            <StatusBadge status={status}/>
            <CreateTicketForm 
                formIsOpen={formIsOpen} 
                submitFunction={(val: any, id: any) => updateTicket(val, id)}
                ticketId={ticketId}
            />
        </div>
        )
}