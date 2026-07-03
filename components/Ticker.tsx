"use client";

const ITEMS = [
  "building Chatter",
  "Frontend Intern @ De-Cloud23",
  "AIESEC National Program Manager",
];

export default function Ticker() {
  const content = [...ITEMS, ...ITEMS]; // duplicated for seamless loop

  return (
    <div className="border-y border-line bg-ink/[0.03] overflow-hidden">
      <div className="flex gap-2.5 whitespace-nowrap py-2.5 font-mono text-xs text-ink/70 animate-[ticker_22s_linear_infinite] w-max motion-reduce:animate-none">
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-2.5">
            {item}
            <span className="text-ink/30">·</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
