import { motion } from 'framer-motion';

const steps = [
  { icon: "1️⃣", title: "UNDERSTAND", desc: "We understand your idea and problem." },
  { icon: "2️⃣", title: "RESEARCH", desc: "We look at customers, competitors and the real market." },
  { icon: "3️⃣", title: "PLAN", desc: "We help decide what should actually be built." },
  { icon: "4️⃣", title: "BUILD", desc: "We design and develop the product." },
  { icon: "5️⃣", title: "LAUNCH", desc: "We help you take it to real users." }
];

export const ProcessSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 uppercase">
          How We Help
        </h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We don't just write code. We solve business problems and help you build something that actually works in the real market.
        </p>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center bg-white"
            >
              <div className="w-20 h-20 bg-gray-50 border-2 border-gray-100 rounded-full flex items-center justify-center text-3xl shadow-sm mb-6 z-10">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
