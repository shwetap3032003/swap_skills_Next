import FooterPage from "@/components/footer";
import CardPage from "@/components/HomePage/card";
import FeaturedSwappers from "@/components/HomePage/featurepage";
import Hero from "@/components/HomePage/Hero";
import StatsSearch from "@/components/HomePage/StateSearch";

export default function HomePage() {
  return (
    <>
      <div className="bg-[#1a1a2e]">
        <Hero />
        <StatsSearch />
        <CardPage />
        <FeaturedSwappers />
        <FooterPage />
      </div>
    </>
  );
}
