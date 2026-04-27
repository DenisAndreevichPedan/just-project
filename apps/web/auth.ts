import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut} = NextAuth({
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                login: { label: "Login", type: "Text" },
                password: { label: "Password", type: "password" },
            },
            async authorize (credentials: any) {
                const ok = credentials.login === "Clerk1" && credentials.password === "1"
                if (!ok) return null

                return {
                    id: "1",
                    name: "Clerk1",
                    email: "Clerk1@gmail.com"
                }
            },
        })
    ],
})