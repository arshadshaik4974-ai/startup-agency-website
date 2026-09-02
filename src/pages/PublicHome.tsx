import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { WhatCanWeBuild } from '../components/WhatCanWeBuild';
import { ProcessSection } from '../components/ProcessSection';
import { YoungFounderSection } from '../components/YoungFounderSection';
import { StartupForm } from '../components/StartupForm';
import { Footer } from '../components/Footer';

export const PublicHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <TrustSection />
        <div id="services">
          <WhatCanWeBuild />
        </div>
        <YoungFounderSection />
        <ProcessSection />
        <StartupForm />
      </main>

      <Footer />
    </div>
  );
};
