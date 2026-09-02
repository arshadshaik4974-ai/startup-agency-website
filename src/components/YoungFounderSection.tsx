import { motion } from 'framer-motion';

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
          HAVE AN IDEA?
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-2xl text-gray-400 mb-12 leading-relaxed"
        >
          Don't worry if you don't know how to build it.<br />
          Just tell us what you have in mind.<br />
          We'll help you figure out the rest.
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
            START MY IDEA
          </a>
        </motion.div>
      </div>
    </section>
  );
};
