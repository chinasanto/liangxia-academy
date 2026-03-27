import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AdoptionSection } from "@/components/adoption-section"
import { AcademySection } from "@/components/academy-section"
import { CustomLobsterSection } from "@/components/custom-lobster-section"
import { ProductsSection } from "@/components/products-section"
import { ExchangeSection } from "@/components/exchange-section"
import { Footer } from "@/components/footer"

export const dynamic = 'force-dynamic'

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AdoptionSection />
      <CustomLobsterSection />
      <ProductsSection />
      <AcademySection />
      <ExchangeSection />
      <Footer />
    </main>
  )
}
