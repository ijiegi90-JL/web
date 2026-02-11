import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NowPlaying from "@/app/about/components/Nowplaying";
import Allmovie from "@/app/about/components/Allmovie";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Server components */}
        <NowPlaying />
        <Allmovie />
      </main>

      <Footer />
    </div>
  );
}