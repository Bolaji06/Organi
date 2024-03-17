import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Signup'
}
export default function SignUpPage(){

    return (
        <>
            <main className="flex justify-center items-center mb-10 mt-6">
                <SignUp />
            </main>
        </>
    )
}