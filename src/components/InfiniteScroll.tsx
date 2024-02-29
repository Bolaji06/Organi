"use client";

import { SvgSpinnersEclipse } from "./client";
import { useInView } from "react-intersection-observer";

export default function InfiniteScrollLoader() {
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  return (
    <>
      <div ref={ref} className="flex justify-center items-center">
        {inView && (
          <SvgSpinnersEclipse
            width={"2em"}
            height={"2em"}
            color="green"
            strokeWidth={"2em"}
          />
        )}
      </div>
    </>
  );
}
