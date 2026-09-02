import { motion } from 'framer-motion';

const services = [
  { icon: "🌐", title: "WEBSITE", desc: "Build your business online" },
  { icon: "📱", title: "APP", desc: "Turn your idea into an app" },
  { icon: "🛒", title: "ONLINE STORE", desc: "Start selling online" },
  { icon: "🚀", title: "STARTUP", desc: "Build your startup idea" },
  { icon: "⚙️", title: "CUSTOM", desc: "Something different? Let's build it." }
];

export const WhatCanWeBuild = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 uppercase">SOLUTIONS WE BUILD</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group text-center flex flex-col items-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
