"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lerpColor } from "@/lib/colorRamp";
import { useLenis } from "@/lib/lenisContent";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    setEnabled(true); // visible on all pointer types, unlike the cursor override

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (draggingRef.current) return;
        const p = self.progress;
        if (thumbRef.current) {
          thumbRef.current.style.height = `${p * 100}%`;
          thumbRef.current.style.background = lerpColor(p);
        }
      },
    });

    return () => st.kill();
  }, []);

  const scrollToProgress = (p: number) => {
    const clamped = Math.min(1, Math.max(0, p));
    const target = clamped * (document.documentElement.scrollHeight - window.innerHeight);
    if (lenis) {
      lenis.scrollTo(target, { immediate: draggingRef.current });
    } else {
      window.scrollTo({ top: target, behavior: draggingRef.current ? "auto" : "smooth" });
    }
    if (thumbRef.current) {
      thumbRef.current.style.height = `${clamped * 100}%`;
      thumbRef.current.style.background = lerpColor(clamped);
    }
  };

  const progressFromClientY = (clientY: number) => {
    if (!trackRef.current) return 0;
    const rect = trackRef.current.getBoundingClientRect();
    return (clientY - rect.top) / rect.height;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scrollToProgress(progressFromClientY(e.clientY));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    scrollToProgress(progressFromClientY(e.clientY));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  if (!enabled) return null;

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="hidden sm:block fixed right-1.5 top-0 h-screen w-3 z-[60] cursor-pointer group"
      aria-hidden
    >
      <div className="absolute right-[5px] top-0 h-full w-[3px] rounded-full bg-ink/10 group-hover:bg-ink/15 transition-colors" />
      <div
        ref={thumbRef}
        className="absolute right-[5px] top-0 w-[3px] rounded-full transition-[width] group-hover:w-[5px] group-hover:right-1"
        style={{ height: "0%" }}
      />
    </div>
  );
}