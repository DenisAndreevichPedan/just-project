'use client';
import { useRouter } from "next/navigation";

export function AppWrapper () {
    const router = useRouter()
    const isLogin = localStorage.getItem('isLogin')

    isLogin ? router.replace('/app') : router.replace('/login')
    return (
        <></>
    )
}