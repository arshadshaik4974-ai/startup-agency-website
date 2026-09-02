import { motion } from 'framer-motion';
import { Layout, Smartphone, ShoppingCart, Rocket, CalendarCheck, GraduationCap, Code } from 'lucide-react';

const services = [
  { icon: Layout, title: "Business Websites", desc: "Professional landing pages and corporate sites." },
  { icon: Smartphone, title: "Mobile Apps", desc: "iOS and Android applications for your users." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Online stores built to convert visitors to buyers." },
  { icon: Rocket, title: "Startup Platforms", desc: "Custom MVPs and full-scale SaaS platforms." },
  { icon: CalendarCheck, title: "Booking Systems", desc: "Automated scheduling and appointment tools." },
  { icon: GraduationCap, title: "School/College Systems", desc: "Management platforms for educational institutions." },
  { icon: Code, title: "Custom Digital Solutions", desc: "Tailor-made software for your unique needs." }
];

export const WhatCanWeBuild = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            What Can We Build?
          </h2>
          <p className="text-gray-500 text-lg">From simple websites to complex applications, we've got you covered.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
              >
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
