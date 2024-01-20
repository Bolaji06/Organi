import { ChevronDown, Menu, Phone } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function TopLevel(){



    return (
        <>
            <main className="flex gap-4 flex-col lg:flex-row justify-between items-center mt-8">
                <DropdownMenu>
                    <DropdownMenuTrigger className='w-full flex items-center justify-around lg:justify-evenly gap-6 bg-primary lg:min-w-[20rem]
                     py-3 text-white font-semi-bold tracking-widest lg:w-[200px]'>
                        <Menu />
                        All Category
                        <ChevronDown />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='min-w-[300px]'>
                        <DropdownMenuItem>
                            Electrical
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Electrical
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Electrical
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Electrical
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Electrical
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="w-full flex flex-col gap-4 lg:gap-2 md:flex-row lg:justify-evenly justify-between items-center">
                    <div className="flex">
                            <Input placeholder="What do you need?" className="w-full md:w-[400px] rounded-none py-6 border-slate-300 focus-visible:ring-0
                            placeholder:text-slate-500 text-base"/>
                            <Button className="bg-primary py-6 outline
                            rounded-none font-semibold uppercase">Search</Button>
                    </div>
                  

                <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex justify-center items-center">
                        <Phone fill="#7fad39" color="#7fad39"strokeWidth={.5}/>
                    </div>

                    <div>
                        <h2 className="font-extrabold text-base text-black">+65 11.188.888</h2>
                        <p className="text-slate-400 text-sm py-1">support 24/7 time</p>

                    </div>
                </div>
                </div>
                
                
            </main>
        </>
    )
}