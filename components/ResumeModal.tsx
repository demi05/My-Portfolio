"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { X, Download } from "lucide-react";

export default function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"checking" | "ok" | "missing">("checking");
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("checking");
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => setStatus(res.ok ? "ok" : "missing"))
      .catch(() => setStatus("missing"));
  }, [open]);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (open) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(
        panelRef.current,
        { y: 24, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        },
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[80] hidden items-center justify-center bg-ink/50 backdrop-blur-sm p-6"
      style={{ display: "none" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="bg-paper rounded-xl border border-line w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-line">
          <span className="font-mono text-sm font-medium">resume.pdf</span>
          <div className="flex items-center gap-1">
            <a
              href="/resume.pdf"
              download
              className="p-2 rounded hover:bg-ink/5 transition-colors"
              aria-label="Download resume"
            >
              <Download size={16} />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-ink/5 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-ink/5">
          {status === "ok" && (
            <iframe src="/resume.pdf" className="w-full h-full" title="Resume preview" />
          )}
          {status === "checking" && (
            <div className="w-full h-full flex items-center justify-center font-mono text-sm text-ink/50">
              loading…
            </div>
          )}
          {status === "missing" && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 font-mono text-sm text-ink/50 px-8 text-center">
              <span>resume.pdf not found</span>
              <span className="text-xs">export your resume as a PDF and add it to /public/resume.pdf</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}