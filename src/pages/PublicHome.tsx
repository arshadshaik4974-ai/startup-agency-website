import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { HowItWorks } from '../components/HowItWorks';
import { StartupForm } from '../components/StartupForm';
import { Footer } from '../components/Footer';

export const PublicHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <Hero />
        <TrustSection />
        <HowItWorks />
        <StartupForm />
      </main>

      <Footer />
    </div>
  );
};
