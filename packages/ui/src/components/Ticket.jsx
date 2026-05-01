'use client'

import { useRouter } from 'next/navigation'

export function Ticket ({title, description, status, priority}) {
    
    const router = useRouter()


    // после реализации API просто забирать данные по айди 
    // вместо передачи query-параметров
    const clickHandler = () => {
        const params = new URLSearchParams({
            title,
            description,
            status,
            priority
        })
    
        router.push(`/ticket-details?${params.toString()}`)
    }

    return (
        <div onClick={clickHandler} style={{paddingBottom: "8px", cursor: "pointer"}}>
            <div>
                - {title}
            </div>
        </div>
    )
}