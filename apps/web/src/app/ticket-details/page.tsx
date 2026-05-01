'use client'

import { useSearchParams } from 'next/navigation'

export default function TicketDetails () {

    const searchParams = useSearchParams()

    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')

    return (
        <div>
            <div>Details:</div>
            <br/>
            <div>title: <span>{title}</span></div>
            <div>description: <span>{description}</span></div>
            <div>status: <span>{status}</span></div>
            <div>priority: <span>{priority}</span></div>
        </div>
        )
}