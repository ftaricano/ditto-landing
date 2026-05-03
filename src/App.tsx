import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import PillarRow from './components/sections/PillarRow';
import FeatureSection from './components/sections/FeatureSection';
import UseCaseCarousel from './components/sections/UseCaseCarousel';
import SocialProof from './components/sections/SocialProof';
import PricingTeaser from './components/sections/PricingTeaser';
import DarkCTABanner from './components/sections/DarkCTABanner';
import { features } from './content/copy';

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <PillarRow />
        {features.map((feature) => (
          <FeatureSection key={feature.id} feature={feature} reversed={feature.reversed} />
        ))}
        <UseCaseCarousel />
        <SocialProof />
        <PricingTeaser />
        <DarkCTABanner />
      </main>
      <Footer />
    </>
  );
}

export default App;
