import NavBar from "@/components/NavBar";

import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserPage(){
   const session = await getServerSession(options);
  // const userImage = session?.user?.image

//    if (!session){
//     redirect('/')
//    }

    return (
        <>
            {
                session ? (
                <main className="px-4 lg:px-12">            
                                
                                <pre>{JSON.stringify(session, null, 2)}</pre>
                </main>
                ) : <h1>Please Sign In</h1>
            }
           
        </>
    )
}