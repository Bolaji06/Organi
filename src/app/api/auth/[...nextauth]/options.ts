
import type { NextAuthOptions } from "next-auth";
import GitProvider from 'next-auth/providers/github'
import  CredentialsProvider from "next-auth/providers/credentials";
import SignInPage from "../../../signin/page";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GitProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username",
        //             type: "text",
        //             placeholder: "Enter your username",
                    
        //         },
        //         password: {
        //             label: "Password",
        //             type: "password",
        //             placeholder: "Enter your password",
                    
        //         }
        //     },
        //     async authorize(credentials){
        //         const user = { id: "11", name: "Bolaji", password: "password" };

        //         if (credentials?.username === user.name && 
        //             credentials?.password === user.password){
        //                 return user;
        //             } else { return null; }
        //     }
        // })
    ],
    pages: {
        signIn: '/signin',
        signOut: '/sign-out',
    }
}