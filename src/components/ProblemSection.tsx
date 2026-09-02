import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ProblemSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 mb-8 uppercase"
        >
          YOU DON'T NEED TO KNOW EXACTLY WHAT TO BUILD.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 text-xl text-gray-600 mb-10 font-medium"
        >
          <p>Maybe you have a problem you've noticed.</p>
          <p>Maybe you have a business idea.</p>
          <p>Maybe you have an idea but don't know where to start.</p>
          <p className="text-gray-900 font-bold mt-8 text-2xl">That's where we can help.</p>
        </motion.div>

        <motion.a 
          href="#form"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-8 py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95"
        >
          LET'S TALK ABOUT IT <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
};
