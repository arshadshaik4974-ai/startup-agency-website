import { motion } from 'framer-motion';
import { Rocket, ArrowLeft } from 'lucide-react';

export const SuccessScreen = ({ onReset }: { onReset: () => void }) => {
  return (
    <section className="py-32 px-6 md:px-12 flex items-center justify-center bg-white min-h-[600px]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <Rocket className="w-10 h-10" />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
          Your idea is now with us. 🚀
        </h2>
        
        <p className="text-gray-500 mb-10 leading-relaxed">
          Thank you for trusting us with your idea. Our team will review your submission, and if we see potential, we'll contact you within 48 hours.
        </p>

        <button
          onClick={() => {
            onReset();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-900 font-medium rounded-full hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </motion.div>
    </section>
  );
};

