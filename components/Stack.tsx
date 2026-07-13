"use client";

import { useDotReveal, useRevealOnScroll } from "@/lib/scrollReveal";

export default function Stack() {
  const dotRef = useDotReveal<HTMLDivElement>();
  const blockRef = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="stack" className="max-w-[960px] mx-auto px-6 py-20">
      <div className="flex items-baseline justify-between mb-10 sm:pl-14">
        <h2 className="text-2xl font-[800] tracking-tight">Stack</h2>
        <span className="font-mono text-xs text-ink/50">package.json</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[56px_1fr]">
        <div className="hidden sm:flex justify-center pt-2">
          <div ref={dotRef} className="w-[13px] h-[13px] rounded-full bg-indigo ring-[5px] ring-paper" />
        </div>

        <div ref={blockRef} className="rounded-xl border border-line bg-ink text-[#E8E6DD] overflow-hidden">
          <div className="flex items-center gap-2 px-4.5 py-2.5 bg-white/[0.04] border-b border-white/10">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
            </div>
            <span className="font-mono text-xs text-[#E8E6DD]/60">package.json</span>
          </div>

          <pre className="font-mono text-[13px] leading-[1.85] px-6 py-5 overflow-x-auto whitespace-pre-wrap">
{`{
  `}<span className="text-[#E8E6DD]/35">{`// languages & frameworks`}</span>{`
  `}<span className="text-[#9FA6AE]">{`"dependencies"`}</span>{`: {
    `}<span className="text-[#9FA6AE]">{`"javascript"`}</span>{`: `}<span className="text-green">{`"^6.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"react"`}</span>{`: `}<span className="text-green">{`"^19.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"typescript"`}</span>{`: `}<span className="text-green">{`"^5.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"next"`}</span>{`: `}<span className="text-green">{`"^15.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"tailwindcss"`}</span>{`: `}<span className="text-green">{`"^4.1.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"chakra-ui"`}</span>{`: `}<span className="text-green">{`"^3.1.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"gsap"`}</span>{`: `}<span className="text-green">{`"^3.15.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"@supabase/supabase-js"`}</span>{`: `}<span className="text-green">{`"^2.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"@tiptap/react"`}</span>{`: `}<span className="text-green">{`"^2.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"recharts"`}</span>{`: `}<span className="text-green">{`"^2.0.0"`}</span>{`
  },
  `}<span className="text-[#E8E6DD]/35">{`// tools & workflow`}</span>{`
  `}<span className="text-[#9FA6AE]">{`"devDependencies"`}</span>{`: {
    `}<span className="text-[#9FA6AE]">{`"git"`}</span>{`: `}<span className="text-indigo">{`"daily driver"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"figma"`}</span>{`: `}<span className="text-indigo">{`"design handoff"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"vitest"`}</span>{`: `}<span className="text-indigo">{`"^2.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"playwright"`}</span>{`: `}<span className="text-indigo">{`"^1.0.0"`}</span>{`,
    `}<span className="text-[#9FA6AE]">{`"vercel"`}</span>{`: `}<span className="text-indigo">{`"deploy target"`}</span>{`
  }
}`}
          </pre>
        </div>
      </div>
    </section>
  );
}
