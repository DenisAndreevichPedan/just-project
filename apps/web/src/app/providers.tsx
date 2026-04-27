"use client"

import { SessionProvider } from "next-auth/react";


export function WithProviderWrapper ({ children }: any) {
    return <SessionProvider>{children}</SessionProvider>
}