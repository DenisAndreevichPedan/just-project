'use client'
import {useState, useEffect} from "react";
import { Notification } from "@ui";

type CreateTicketFormProps = {
    formIsOpen: boolean
    submitFunction: any
    ticketId?: string | null
}

export function CreateTicketForm ({ submitFunction, formIsOpen, ticketId = null }: CreateTicketFormProps) {

    const [values, setValues] = useState({title: '', description: '', status: '', priority: ''}) 
    const [showNotification, setShowNotification] = useState(false)

    const isUpdateMode = ticketId !== null

    const changeHadler = (id: any) => (e: any) => {
        setValues((prevState: any) => ({...prevState, [id]: e.target.value}))
    }

    const isValid = Object.values(values).every(value => 
        (value)
    );

    useEffect(() => {
        if(showNotification) 
          setTimeout(() => setShowNotification(false), 3000)
      }, [showNotification])
    
    
return formIsOpen ? (
    <form
     onSubmit={(e: any) => {
        e.preventDefault()

        if (isValid) {
            submitFunction({ ...values, id: isUpdateMode ? ticketId : crypto.randomUUID()}, ticketId)
            return
        }
 
        setShowNotification(true)
    }}
    >
        <div 
            style={{
                display: 'flex', 
                flexDirection: 'column', 
                width: '240px'
            }}
        >
            <input placeholder='Title' key='1' value={values.title} onChange={changeHadler('title')}/>
            <input placeholder='description' key='2' value={values.description} onChange={changeHadler('description')}/>
            <input placeholder='status' key='3' value={values.status} onChange={changeHadler('status')}/>
            <input placeholder='priority' key='4' value={values.priority} onChange={changeHadler('priority')}/>
        </div>
        <button type="submit">Создать</button>
        {
          showNotification && <Notification text="Заполните все поля формы"/>
        }
    </form>
    )
    : null
}