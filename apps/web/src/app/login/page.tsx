'use client'
import { signIn } from 'next-auth/react'
import { useState, useEffect, EventHandler } from "react"
import { redirect } from 'next/navigation'
import { useRouter } from "next/navigation";

type LoginCredentials = {
    login?: string;
    password?: string;
  };

export default function Login () {
    const [credentials, setCrenentials] = useState<LoginCredentials>({})
    
    const onSubmit = async () => {
        const SignInResult = await signIn("credentials", { login: credentials.login, password: credentials.password, redirect: true, callbackUrl: "/app"})
    }

    return (
    <div>
        <input 
            value={credentials.login} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrenentials((prev) => ({...prev, login: e.target.value}))} placeholder="login"
        />
        <input 
            value={credentials.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrenentials((prev) => ({...prev, password: e.target.value}))} placeholder="password"/>
        <button onClick={onSubmit}>Login</button>
    </div>
    )
}