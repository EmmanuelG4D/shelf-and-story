import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="max-w-[1600px] mx-auto flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Hero />
          <Categories />
          <BestSellers />
        </div>
      </div>
      <TrustBadges />
      <Footer />
    </main>
  );
}