"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    });
    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div
      ref={lineRef}
      className="hidden sm:block absolute left-[52px] top-0 w-[2px] h-full origin-top scale-y-0"
      style={{
        background:
          "linear-gradient(#1F8A5F, #5B5BD6 35%, #C98A00 65%, #E0567C)",
      }}
      aria-hidden
    />
  );
}
