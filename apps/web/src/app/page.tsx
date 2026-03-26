import Image from "next/image";
import styles from "./page.module.css";
import { testFunction } from "@shared";
import Link from "next/link";
import { DefaultLink } from "@ui";
const test = testFunction();

export default function Home() {
  return (
    <div style={{height: '100vh'}}>
      <div className="header">
        
      </div>
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
      </div>

    </div>
  );
}
