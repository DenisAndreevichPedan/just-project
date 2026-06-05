'use client'

import { useRouter } from 'next/navigation'
import {Notification, StatusBadge} from '@ui'

export function Ticket ({id, title, description, status, priority, setShowNotification}) {
    
    const router = useRouter()


    // после реализации API просто забирать данные по айди 
    // вместо передачи query-параметров
    const clickHandler = () => {
        if (!description) {
            setShowNotification()
            return
        }

        const params = new URLSearchParams({
            id
        })

        router.push(`/ticket-details?${params.toString()}`)
    }

    return (
        <div onClick={clickHandler} style={{paddingBottom: "8px", cursor: "pointer", display: "flex"}}>
            <div style={{marginRight: "5px"}}>
                - {title}
            </div>
            <StatusBadge status={status}/>
        </div>
    )
}