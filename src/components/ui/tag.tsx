
import { Star } from 'lucide-react'

export default function TagCount({ rate }: { rate: number }){

    return (
        <>
            <div className="flex justify-between gap-1 items-center p-1 bg-primary rounded-sm">
                <Star size={10} color="white"/>
                <p className="text-xs text-white">{rate}</p>

            </div>
        </>
    )
}