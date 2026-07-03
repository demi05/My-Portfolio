"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fades + slides an element up into place once it's ~85% into the viewport. */
export function useRevealOnScroll<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.set(ref.current, { opacity: 0, y: 26 });
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, [delay]);

  return ref;
}

/** Pops a dot in with a back-out ease once it scrolls into view. */
export function useDotReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.set(ref.current, { scale: 0 });
      gsap.to(ref.current, {
        scale: 1,
        duration: 0.5,
        ease: "back.out(2.2)",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return ref;
}
