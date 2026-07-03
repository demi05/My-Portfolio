import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import Log from "@/components/Log";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Ticker />
      <Work />
      <Stack />
      <Log />
      <Footer />
    </main>
  );
}