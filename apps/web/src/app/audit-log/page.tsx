import { dateFormatFunction } from "@shared"

const testDate = new Date("2026-03-25T14:30:00");
const currentDate = Date.now()


export default function AuditLog () {
    return (
        <div>
            <p>AuditLog</p>
            <span>{dateFormatFunction.format(currentDate)}</span>
        </div>
    )
}