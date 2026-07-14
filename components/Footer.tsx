import { Github, GitCommit, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="max-w-[960px] mx-auto px-6 py-24 border-t border-line mt-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-9">
        <div>
          <h2 className="text-2xl font-[800] tracking-tight mb-3">Let&apos;s talk</h2>
          <p className="max-w-[360px] text-ink/70 leading-relaxed text-[14.5px]">
            Open to frontend developer and internship roles. Feel free to reach out!
          </p>
        </div>
        <div className="font-mono text-sm flex flex-col gap-2.5">
          <a
            href="mailto:demiladeleshi@gmail.com"
            className="flex items-center gap-2 hover:text-green transition-colors w-fit"
          >
            <Mail size={14} /> demiladeleshi@gmail.com
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-green transition-colors w-fit">
            <Github size={14} /> github.com/demi05
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-green transition-colors w-fit">
            <Linkedin size={14} /> linkedin.com/in/demiladeleshi276
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-16 text-[11px] text-ink/35 font-mono">
        <GitCommit size={12} /> built with Next.js — last deploy just now
      </div>
    </footer>
  );
}
