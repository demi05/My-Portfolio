"use client";

import { useEffect, useState } from "react";

const BASE_ITEMS = [
  "building Chatter",
  "Frontend Intern @ De-Cloud23",
  "AIESEC National Program Manager",
];

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/** Pulls the most recent public push event from GitHub's public API.
 *  No auth needed for this endpoint, but it's rate-limited (60/hr per IP),
 *  so this fails silently and just falls back to the static items below —
 *  a live ticker item is a nice-to-have, not something worth a broken UI over. */
function useLatestGithubActivity(username: string) {
  const [item, setItem] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((events: any[]) => {
        if (cancelled) return;
        const push = events.find((e) => e.type === "PushEvent");
        if (!push) return;
        const repo = push.repo?.name?.split("/")?.[1] ?? push.repo?.name;
        setItem(`last commit → ${repo} · ${timeAgo(push.created_at)}`);
      })
      .catch(() => {
        /* rate-limited, offline, or no recent public activity — fine, just skip it */
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return item;
}

export default function Ticker() {
  const liveItem = useLatestGithubActivity("demi05");
  const items = liveItem ? [liveItem, ...BASE_ITEMS] : BASE_ITEMS;
  const content = [...items, ...items]; // duplicated for seamless loop

  return (
    <div className="border-y border-line bg-ink/[0.03] overflow-hidden print:hidden">
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