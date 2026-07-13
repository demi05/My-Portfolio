"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDotReveal } from "@/lib/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

const LOG = [
  { hash: "a3f9c21", color: "text-green", scope: "decloud23", msg: "shipping a job-tracker platform + Zheeta", when: "Aug 2025 — now" },
  { hash: "7e2d9f0", color: "text-indigo", scope: "frnwei", msg: "built client sites incl. Criterion Homes, Global Range Farms", when: "Jul 2025 — now" },
  { hash: "4b1a88c", color: "text-amber", scope: "aiesec", msg: "built aiesec.ng pages, National Program Manager", when: "Aug 2024 — now" },
  { hash: "9c0e5f2", color: "text-coral", scope: "skillsforge", msg: "shipped production React + TypeScript features", when: "May — Jul 2024" },
];

export default function Log() {
  const dotRef = useDotReveal<HTMLDivElement>();
  const rowsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!rowsRef.current) return;
    const ctx = gsap.context(() => {
      const rows = rowsRef.current!.querySelectorAll(".logrow");
      gsap.set(rows, { opacity: 0, y: 16 });
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: rowsRef.current, start: "top 75%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="log" className="max-w-[960px] mx-auto px-6 py-20">
      <div className="mb-10 sm:pl-14">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-[800] tracking-tight">Log</h2>
          <span className="font-mono text-xs text-ink/50">git log --oneline</span>
        </div>
        <p className="text-sm text-ink/55 mt-2 max-w-md">
          Work history.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[56px_1fr]">
        <div className="hidden sm:flex justify-center pt-2">
          <div ref={dotRef} className="w-[13px] h-[13px] rounded-full bg-coral ring-[5px] ring-paper" />
        </div>
        <div ref={rowsRef}>
          {LOG.map((l) => (
            <div
              key={l.hash}
              className="logrow border border-line rounded-lg bg-white/50 px-4.5 py-3.5 mb-3 flex flex-wrap items-center gap-3 font-mono text-[13px]"
            >
              <span className={`font-bold ${l.color}`}>{l.hash}</span>
              <span>
                <span className="text-ink/45">feat({l.scope}):</span> {l.msg}
              </span>
              <span className="sm:ml-auto text-ink/40 text-xs">{l.when}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}