import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm font-medium text-gray-800 mb-8"
      >
        <Sparkles className="w-4 h-4" />
        <span>🚀 For Founders & Dreamers</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-6 leading-tight"
      >
        GOT AN IDEA?<br />
        LET'S BUILD IT. 🚀
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed"
      >
        Website, app, online business or startup idea? Tell us what you're thinking. We'll help you turn it into something real.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-4 mb-4"
      >
        <a 
          href="#form"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 group"
        >
          TELL US YOUR IDEA 🚀
        </a>
        <a 
          href="#services"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black border border-gray-200 rounded-full font-medium text-lg hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 group"
        >
          SEE WHAT WE BUILD
        </a>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-sm text-gray-400 font-medium"
      >
        Your idea is safe & confidential.
      </motion.p>
    </section>
  );
};
