import { SignUp } from "@clerk/nextjs";

export default function SignUpPage(){

    return (
        <>
            <main className="flex justify-center items-center mb-10 mt-6">
                <SignUp />
            </main>
        </>
    )
}