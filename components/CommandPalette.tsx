"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import {
  Search,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  FileText,
  Folder,
  Terminal as TerminalIcon,
} from "lucide-react";
import { useLenis } from "@/lib/lenisContent";

interface Command {
  id: string;
  label: string;
  icon: ReactNode;
  action: () => void;
  keywords?: string;
  keepOpen?: boolean;
}

export default function CommandPalette({ onOpenResume }: { onOpenResume: () => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();

  const close = () => setOpen(false);

  const scrollTo = (hash: string) => {
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -16 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const commands: Command[] = [
    { id: "work", label: "Go to Work", icon: <Folder size={15} />, action: () => scrollTo("#work"), keywords: "projects chatter zheeta aiesec" },
    { id: "stack", label: "Go to Stack", icon: <TerminalIcon size={15} />, action: () => scrollTo("#stack"), keywords: "tech technologies" },
    { id: "log", label: "Go to Log", icon: <ArrowRight size={15} />, action: () => scrollTo("#log"), keywords: "experience history commits" },
    { id: "contact", label: "Go to Contact", icon: <Mail size={15} />, action: () => scrollTo("#contact"), keywords: "email reach" },
    { id: "resume", label: "View resume", icon: <FileText size={15} />, action: onOpenResume, keywords: "cv pdf" },
    {
      id: "copy-email",
      label: copied ? "Email copied!" : "Copy email address",
      icon: <Mail size={15} />,
      keepOpen: true,
      action: () => {
        navigator.clipboard.writeText("demiladeleshi@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      keywords: "contact demiladeleshi@gmail.com",
    },
    { id: "github", label: "Open GitHub", icon: <Github size={15} />, action: () => window.open("https://github.com/demi05", "_blank"), keywords: "code repo" },
    { id: "linkedin", label: "Open LinkedIn", icon: <Linkedin size={15} />, action: () => window.open("https://linkedin.com/in/demiladeleshi276", "_blank"), keywords: "profile" },
  ];

  const filtered = commands.filter((c) =>
    (c.label + " " + (c.keywords ?? "")).toLowerCase().includes(query.toLowerCase())
  );

  const run = (cmd: Command) => {
    cmd.action();
    if (!cmd.keepOpen) close();
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (open) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(
        panelRef.current,
        { y: -12, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        },
      });
    }
  }, [open]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) run(filtered[activeIndex]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex fixed bottom-5 right-5 z-40 items-center gap-2 px-3 py-2 rounded-lg border border-line bg-paper/90 backdrop-blur font-mono text-xs text-ink/60 hover:text-ink hover:border-ink transition-colors print:hidden"
      >
        <Search size={13} />
        <span>⌘K</span>
      </button>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] hidden items-start justify-center bg-ink/40 backdrop-blur-sm pt-[14vh] px-6"
        style={{ display: "none" }}
        onClick={(e) => {
          if (e.target === overlayRef.current) close();
        }}
      >
        <div ref={panelRef} className="w-full max-w-lg bg-paper rounded-xl border border-line shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line">
            <Search size={16} className="text-ink/40" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Type a command…"
              className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:text-ink/35"
            />
            <span className="font-mono text-[10px] text-ink/35 border border-line rounded px-1.5 py-0.5">esc</span>
          </div>
          <div className="max-h-[320px] overflow-y-auto py-2">
            {filtered.length === 0 && (
              <div className="px-4 py-6 text-center font-mono text-xs text-ink/40">no matches</div>
            )}
            {filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => run(cmd)}
                onMouseEnter={() => setActiveIndex(i)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left font-mono text-[13px] transition-colors ${
                  i === activeIndex ? "bg-ink text-paper" : "text-ink hover:bg-ink/5"
                }`}
              >
                {cmd.icon}
                {cmd.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}