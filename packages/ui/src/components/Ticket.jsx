'use client'

import { useRouter } from 'next/navigation'
import {Notification} from '@ui'

export function Ticket ({title, description, status, priority, setShowNotification}) {
    
    const router = useRouter()


    // после реализации API просто забирать данные по айди 
    // вместо передачи query-параметров
    const clickHandler = () => {
        if (!description) {
            setShowNotification()
            return
        }

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