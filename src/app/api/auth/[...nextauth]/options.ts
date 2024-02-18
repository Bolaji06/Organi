
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
    ],
    pages: {
        signIn: '/signin',
        signOut: '/sign-out',
    }
}