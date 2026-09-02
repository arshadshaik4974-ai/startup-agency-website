import { motion } from 'framer-motion';

const steps = [
  { icon: "1️⃣", title: "TELL US", desc: "Tell us your idea." },
  { icon: "2️⃣", title: "WE BUILD", desc: "We turn the idea into a real product." },
  { icon: "3️⃣", title: "YOU LAUNCH 🚀", desc: "Your website, app or business goes live." }
];

export const ProcessSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          How It Works
        </h2>
      </div>

      <div className="relative">
        {/* Connecting Line for Desktop */}
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-10" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center bg-white"
            >
              <div className="w-24 h-24 bg-gray-50 border-2 border-gray-100 rounded-full flex items-center justify-center text-4xl shadow-sm mb-6 z-10">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-500 text-lg">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
