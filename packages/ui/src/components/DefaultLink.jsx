import Link from "next/link";

export function DefaultLink ({name, href}) {
    return (
        <div>
            <Link href={href} >{name}</Link>
        </div>
        )
}