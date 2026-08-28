import { motion } from 'framer-motion';
import { Lightbulb, Handshake, TrendingUp } from 'lucide-react';

const cards = [
  {
    title: "Idea",
    description: "Share your vision, even if it's still just an idea.",
    icon: Lightbulb,
  },
  {
    title: "Support",
    description: "We can help with business guidance, development, branding and growth.",
    icon: Handshake,
  },
  {
    title: "Opportunities",
    description: "We can help explore suitable funding and investment opportunities.",
    icon: TrendingUp,
  }
];

export const TrustSection = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Your idea deserves a chance.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Every great startup starts somewhere. Tell us what you're building, what problem you're solving, and where you want to go.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <card.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{card.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
