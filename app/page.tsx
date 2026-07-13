"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Log from "@/components/Log";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";
import ResumeModal from "@/components/ResumeModal";

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = () => setResumeOpen(true);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <CustomCursor />
      <ScrollProgress />
      <Nav onOpenResume={openResume} />
      <Hero />
      <Ticker />
      <Work />
      <Stack />
      <Log />
      <Footer />
      <CommandPalette onOpenResume={openResume} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}