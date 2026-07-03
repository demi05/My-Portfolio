"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lerpColor } from "@/lib/colorRamp";

gsap.registerPlugin(ScrollTrigger);

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only take over the cursor on devices that actually have a precise
    // pointer, and only if the user hasn't asked for reduced motion.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!hasFinePointer || prefersReducedMotion) return;
    if (!cursorRef.current || !ringRef.current || !dotRef.current) return;

    document.documentElement.classList.add("custom-cursor");

    const moveCursor = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const moveCursorY = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    const moveDot = gsap.quickTo(dotRef.current, "x", { duration: 0.08, ease: "none" });
    const moveDotY = gsap.quickTo(dotRef.current, "y", { duration: 0.08, ease: "none" });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        // Snap to the actual first position instead of tweening in from (0,0),
        // then fade in so there's no visible jump from the corner.
        gsap.set([cursorRef.current, dotRef.current], { x: e.clientX, y: e.clientY });
        gsap.to([cursorRef.current, dotRef.current], { opacity: 1, duration: 0.2 });
      }
      moveCursor(e.clientX);
      moveCursorY(e.clientY);
      moveDot(e.clientX);
      moveDotY(e.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      if (!target) return;
      const label = target.getAttribute("data-cursor");
      gsap.to(ringRef.current, {
        scale: label ? 2.6 : 1.8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        gsap.to(labelRef.current, { opacity: 1, duration: 0.25 });
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR);
      if (!target) return;
      gsap.to(ringRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(labelRef.current, { opacity: 0, duration: 0.15 });
    };
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const color = lerpColor(self.progress);
        if (ringRef.current) ringRef.current.style.borderColor = color;
        if (dotRef.current) dotRef.current.style.background = color;
      },
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.classList.remove("custom-cursor");
      st.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[70] opacity-0"
      >
        <div
          ref={ringRef}
          className="w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center"
        >
          <span
            ref={labelRef}
            className="font-mono text-[9px] uppercase tracking-wider text-ink opacity-0 whitespace-nowrap"
          />
        </div>
      </div>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-ink pointer-events-none z-[70] opacity-0"
      />
    </>
  );
}