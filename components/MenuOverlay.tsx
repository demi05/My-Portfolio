"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail } from "lucide-react";

const LINKS = [
  { label: "Work", href: "#work", color: "#1F8A5F" },
  { label: "Stack", href: "#stack", color: "#5B5BD6" },
  { label: "Log", href: "#log", color: "#C98A00" },
  { label: "Contact", href: "#contact", color: "#E0567C" },
];

const DEFAULT_BG = "#17181A";

export default function MenuOverlay({
  open,
  onClose,
  onOpenResume,
}: {
  open: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const [rendered, setRendered] = useState(open);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (open) {
        setRendered(true);
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.set(panelRef.current, { backgroundColor: DEFAULT_BG });
        const tl = gsap.timeline();
        tl.fromTo(
          overlayRef.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.65, ease: "power4.inOut" }
        ).fromTo(
          linksRef.current,
          { yPercent: 130, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
          "-=0.25"
        );
      } else if (rendered) {
        gsap.to(overlayRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(overlayRef.current, { display: "none" });
            setRendered(false);
          },
        });
      }
    });
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useLayoutEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleHover = (color: string | null) => {
    gsap.to(panelRef.current, {
      backgroundColor: color ?? DEFAULT_BG,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 hidden flex-col justify-between"
      style={{ display: "none" }}
      aria-hidden={!open}
    >
      <div ref={panelRef} className="absolute inset-0 -z-10" />
      <nav className="flex-1 flex flex-col justify-center px-6 sm:px-14">
        <ul className="space-y-1 sm:space-y-2">
          {LINKS.map((link, i) => (
            <li key={link.label} className="overflow-hidden">
              <a
                ref={(el) => {
                  if (el) linksRef.current[i] = el;
                }}
                href={link.href}
                onClick={onClose}
                onMouseEnter={() => handleHover(link.color)}
                onMouseLeave={() => handleHover(null)}
                className="block text-[15vw] sm:text-[7vw] font-[900] tracking-tight leading-[0.95] text-[#F3F1E9] hover:text-[#F3F1E9] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F3F1E9]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-6 sm:px-14 pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-[#F3F1E9]/70 font-mono text-sm">
        <div className="flex items-center gap-5">
          <a
            href="mailto:demiladeleshi@gmail.com"
            className="hover:text-[#F3F1E9] transition-colors inline-flex items-center gap-2"
          >
            <Mail size={15} /> demiladeleshi@gmail.com
          </a>
          <button
            onClick={() => {
              onOpenResume();
              onClose();
            }}
            className="hover:text-[#F3F1E9] transition-colors"
          >
            resume
          </button>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-[#F3F1E9] transition-colors inline-flex items-center gap-2">
            <Github size={15} /> github.com/demi05
          </a>
          <a href="#" className="hover:text-[#F3F1E9] transition-colors inline-flex items-center gap-2">
            <Linkedin size={15} /> linkedin
          </a>
        </div>
      </div>
    </div>
  );
}