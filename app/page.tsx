import { HeroSection } from "@/components/hero-section"
import { DocumentUpload } from "@/components/document-upload"
import { FeatureGrid } from "@/components/feature-grid"
import { TrustedBy } from "@/components/trusted-by"
import { NavigationHeader } from "@/components/navigation-header"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <NavigationHeader />
      <HeroSection />
      <DocumentUpload />
      <FeatureGrid />
      <TrustedBy />
    </main>
  )
}
