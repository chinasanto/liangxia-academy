import type { Metadata } from 'next'

import { JsonLd } from '@/components/json-ld'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AdoptionSection } from "@/components/adoption-section"
import { AcademySection } from "@/components/academy-section"
import { CustomLobsterSection } from "@/components/custom-lobster-section"
import { ProductsSection } from "@/components/products-section"
import { ExchangeSection } from "@/components/exchange-section"
import { Footer } from "@/components/footer"
import { getPublishedCourses } from '@/lib/course-store'
import { buildHomeMetadata } from '@/lib/seo'
import { buildHomeJsonLd } from '@/lib/structured-data'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = buildHomeMetadata()

export default async function Home() {
  const courses = await getPublishedCourses()

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={buildHomeJsonLd(courses)} />
      <Header />
      <HeroSection />
      <AdoptionSection />
      <CustomLobsterSection />
      <ProductsSection />
      <AcademySection courses={courses} />
      <ExchangeSection />
      <Footer />
    </main>
  )
}
