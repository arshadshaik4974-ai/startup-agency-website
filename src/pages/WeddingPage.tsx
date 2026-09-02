import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WhatCanWeBuild } from '../components/WhatCanWeBuild';
import { ProcessSection } from '../components/ProcessSection';
import { ShortLeadForm } from '../components/ShortLeadForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const WeddingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Wedding Specific Hero */}
        <section className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-sm font-medium mb-8"
          >
            <span>📱 Thanks for scanning!</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6 leading-tight"
          >
            YOU SCANNED IT. NOW<br />
            LET'S BUILD SOMETHING. 🚀
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-500 max-w-2xl mb-10 leading-relaxed"
          >
            Have a business idea? Want to build an app? Want to start something online? Tell us your idea and let's see what we can build.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col w-full sm:flex-row items-center justify-center gap-4 mb-4"
          >
            <a 
              href="#form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all active:scale-95 group"
            >
              START MY IDEA 🚀
            </a>
            <a 
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full font-medium text-lg hover:bg-[#20bd5a] transition-all active:scale-95 group"
            >
              <MessageCircle className="w-5 h-5" />
              CHAT ON WHATSAPP
            </a>
          </motion.div>
        </section>

        <div id="services">
          <WhatCanWeBuild />
        </div>
        
        <ProcessSection />
        
        <ShortLeadForm />
      </main>

      <Footer />
    </div>
  );
};
