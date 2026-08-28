

const steps = [
  {
    num: "01",
    title: "Share Your Idea",
    desc: "Tell us about your startup and vision."
  },
  {
    num: "02",
    title: "Our Team Reviews",
    desc: "Our team reviews your submission and looks for potential."
  },
  {
    num: "03",
    title: "We Contact You",
    desc: "If your idea is a good fit, our agency will contact you within 48 hours."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
          How It Works
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gray-200 -z-10" />
        
        {steps.map((step, idx) => (
          <div key={idx} className="relative bg-white pt-4 md:pt-0">
            <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-500 mb-6 mx-auto md:mx-0">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 text-center md:text-left">{step.title}</h3>
            <p className="text-gray-500 text-center md:text-left leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
