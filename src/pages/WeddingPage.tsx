import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { ShortLeadForm } from '../components/ShortLeadForm';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const WeddingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Wedding Specific Hero */}
        <section className="pt-32 pb-16 px-6 max-w-lg mx-auto flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-6 leading-tight uppercase"
          >
            YOU SCANNED IT.<br />
            NOW LET'S BUILD SOMETHING. 🚀
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 mb-8 font-medium"
          >
            Got an idea you've always wanted to build?
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col w-full gap-3 mb-10"
          >
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-base font-bold text-gray-800 flex items-center justify-center gap-3">
              💡 BUSINESS IDEA
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-base font-bold text-gray-800 flex items-center justify-center gap-3">
              📱 APP IDEA
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-base font-bold text-gray-800 flex items-center justify-center gap-3">
              🌐 WEBSITE IDEA
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-base font-bold text-gray-800 flex items-center justify-center gap-3">
              🚀 STARTUP IDEA
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-base font-bold text-gray-800 flex items-center justify-center gap-3">
              ❓ I'M NOT SURE YET
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col w-full gap-4"
          >
            <a 
              href="#form"
              className="w-full inline-flex items-center justify-center px-8 py-5 bg-black text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform"
            >
              START MY IDEA 🚀
            </a>
            <a 
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#25D366] text-white rounded-2xl font-bold text-lg active:scale-95 transition-transform"
            >
              <MessageCircle className="w-6 h-6" />
              CHAT WITH US ON WHATSAPP
            </a>
          </motion.div>
        </section>
        
        <ShortLeadForm />
      </main>

      <Footer />
    </div>
  );
};
