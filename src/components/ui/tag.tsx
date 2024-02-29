import { Star } from "lucide-react";

export default function TagCount({ rate }: { rate: number }) {
  return (
    <>
      <div className="w-10 flex justify-between gap-1 items-center p-1 bg-primary rounded-sm">
        <Star size={12} color="white" />
        <p className="text-xs text-white">{rate.toFixed(1)}</p>
      </div>
    </>
  );
}
