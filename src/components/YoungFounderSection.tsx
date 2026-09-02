import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const YoungFounderSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white text-center">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
        >
          YOUR AGE DOESN'T MATTER.<br className="hidden md:block" /> YOUR IDEA DOES.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-2xl text-gray-400 mb-12 leading-relaxed"
        >
          Whether you're a student, first-time founder, creator, or business owner, your idea deserves a chance. Tell us what you're thinking and we'll help you figure out what to build next.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a 
            href="#form"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 group"
          >
            TELL US YOUR IDEA — FREE
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
