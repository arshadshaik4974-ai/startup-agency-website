import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { WhatCanWeBuild } from '../components/WhatCanWeBuild';
import { ProblemSection } from '../components/ProblemSection';
import { YoungFounderSection } from '../components/YoungFounderSection';
import { ProcessSection } from '../components/ProcessSection';
import { ShortLeadForm } from '../components/ShortLeadForm';
import { Footer } from '../components/Footer';

export const PublicHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <WhatCanWeBuild />
        <ProblemSection />
        <YoungFounderSection />
        <ProcessSection />
        <ShortLeadForm />
      </main>

      <Footer />
    </div>
  );
};
