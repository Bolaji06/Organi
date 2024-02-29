import Image from "next/image";

import signBg from "../../../public/assets/gadgets.webp";
import { Button } from "@/components/ui/button";
import { getProviders, signIn } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import { GitHubLoginButton } from "@/components/client";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = getServerSession();
  console.log(session);
  const providers = await getProviders();

  // if(!session){
  //     redirect('/')
  // }else{
  //     redirect('/signin')
  // }

  return (
    <>
      <main className="bg-[#74f874]/30 w-full h-screen">
        <div className="w-full flex">
          <div
            className="basis-[60%] -ml-20
                     bg-white h-screen -skew-x-12"
          >
            <Image
              src={signBg}
              alt="Sign in background image"
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative basis-[40%]">
            <div
              className="flex items-center justify-center shadow-md bg-white rounded-md w-[200px]
                        px-4 py-2
                        absolute top-[20%] -translate-x-1/2"
            >
              {providers &&
                Object.values(providers).map((provider) => (
                  <div className="w-full" key={provider.name}>
                    <GitHubLoginButton
                      name={provider.name}
                      providerId={provider.id}
                    />
                  </div>
                ))}
            </div>

            {}
          </div>
        </div>
      </main>
    </>
  );
}
