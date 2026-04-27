'use client';

import { DefaultLink } from "@ui"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function App () {

    const logOut = async () => {
      await signOut({
        callbackUrl: "/login",
      })
    }

    return (
        <div style={{height: '100vh'}}>
        <div className="header"></div>
        <div 
          style={{
            position: 'sticky',
            border: '1px solid',
            backgroundColor: 'green', 
            width: '250px', 
            height: '100%'
          }}
          className="sideBar"
        >
          <div className="navigation">
          <DefaultLink name={"dashboard"} href={"/dashboard"}/>
          <DefaultLink name={"tickets"} href={"/tickets"}/> 
          <DefaultLink name={"ticket details"} href={"/ticket-details"}/> 
          <DefaultLink name={"audit log"} href={"/audit-log"}/> 
          <DefaultLink name={"team"} href={"/team"}/> 
          <DefaultLink name={"settings"} href={"/settings"}/>  
          </div>
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
    )
}