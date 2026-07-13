"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import MenuOverlay from "./MenuOverlay";

export default function Nav({ onOpenResume }: { onOpenResume: () => void }) {
  const [open, setOpen] = useState(false);
  const topBar = useRef<SVGLineElement>(null);
  const midBar = useRef<SVGLineElement>(null);
  const botBar = useRef<SVGLineElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { duration: 0.35, ease: "power2.inOut" } });
      tl.to(topBar.current, { attr: { y1: 12, y2: 12, x1: 5, x2: 19 }, rotate: 45, transformOrigin: "50% 50%" }, 0)
        .to(botBar.current, { attr: { y1: 12, y2: 12, x1: 5, x2: 19 }, rotate: -45, transformOrigin: "50% 50%" }, 0)
        .to(midBar.current, { opacity: 0 }, 0);
      if (open) tl.play();
      else tl.reverse();
    });
    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur bg-paper/90 border-b border-line">
        <div className="max-w-[960px] mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-mono text-sm font-semibold tracking-tight">
            demi.dev
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative w-10 h-10 flex items-center justify-center rounded-md border border-line hover:border-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <line ref={topBar} x1="5" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line ref={midBar} x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line ref={botBar} x1="5" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>
      <MenuOverlay open={open} onClose={() => setOpen(false)} onOpenResume={onOpenResume} />
    </>
  );
}
