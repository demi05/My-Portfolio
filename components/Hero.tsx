"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Linkedin } from "lucide-react";

const TYPED_TEXT = "frontend engineer. ships fast, ships clean.";

function useTypewriter(text: string, speed = 34, startDelay = 900) {
  const [out, setOut] = useState("");

  useEffect(() => {
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const start = setTimeout(() => {
      const tick = () => {
        i += 1;
        setOut(text.slice(0, i));
        if (i < text.length) timeout = setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return out;
}

function useMagnetic(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref]);
}

export default function Hero() {
  const typed = useTypewriter(TYPED_TEXT);
  const rootRef = useRef<HTMLDivElement>(null);
  const btn1 = useRef<HTMLAnchorElement>(null!);
  const btn2 = useRef<HTMLAnchorElement>(null!);
  const btn3 = useRef<HTMLAnchorElement>(null!);

  useMagnetic(btn1);
  useMagnetic(btn2);
  useMagnetic(btn3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-line span", { yPercent: 110 });
      gsap.set(".hero-eyebrow, .hero-type, .hero-lede, .hero-cta > *", {
        opacity: 0,
        y: 14,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.5 })
        .to(".hero-line span", { yPercent: 0, duration: 0.9, stagger: 0.12 }, "-=0.25")
        .to(".hero-type", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(".hero-lede", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(".hero-cta > *", { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.25");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative pt-24 pb-18 overflow-hidden">
      <div className="max-w-[960px] mx-auto px-6">
      <div
        className="blob pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.16]"
        aria-hidden
      />
      <div className="relative z-[1]">
        <div className="hero-eyebrow flex items-center gap-2 text-sm font-mono text-green mb-6">
          <span>&gt;_</span>
          <span>~/leshi — main</span>
        </div>

        <h1 className="text-[44px] sm:text-[80px] font-[900] tracking-tight leading-[0.98]">
          <span className="hero-line block overflow-hidden">
            <span className="inline-block">Leshi Taiwo</span>
          </span>
          <span className="hero-line block overflow-hidden">
            <span className="inline-block">Oluwademilade</span>
          </span>
        </h1>

        <div className="hero-type font-mono text-[15px] sm:text-lg mt-6 min-h-[1.6em]">
          <span className="text-green">$</span> whoami
          <br />
          <span>{typed}</span>
          <span className="caret">▍</span>
        </div>

        <p className="hero-lede max-w-[560px] mt-5 text-ink/70 leading-relaxed">
          Frontend developer building production interfaces with React,
          Next.js, and TypeScript. Most recently shipped Chatter, a
          full-stack publishing platform, solo, in 10 days.
        </p>

        <div className="hero-cta flex flex-wrap items-center gap-3 mt-9">
          <a
            ref={btn1}
            href="#work"
            className="px-5 py-3 rounded-lg bg-ink text-paper text-sm font-semibold hover:bg-green transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
          >
            View work
          </a>
          <a
            ref={btn2}
            href="#"
            className="px-5 py-3 rounded-lg border border-line text-sm font-semibold hover:border-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green flex items-center gap-1.5"
          >
            <Github size={15} /> GitHub
          </a>
          <a
            ref={btn3}
            href="#"
            className="px-5 py-3 rounded-lg border border-line text-sm font-semibold hover:border-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green flex items-center gap-1.5"
          >
            <Linkedin size={15} /> LinkedIn
          </a>
        </div>
      </div>
      </div>
    </div>
  );
}
