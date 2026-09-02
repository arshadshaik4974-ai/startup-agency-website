import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

const buildOptions = [
  "Website",
  "Mobile App",
  "E-commerce",
  "Online Business",
  "Startup",
  "Other"
];

export const ShortLeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    whatToBuild: '',
    idea: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      full_name: formData.name,
      email: 'no-email@qr-visitor.com', // Dummy email if required
      phone: formData.whatsapp,
      industry: formData.whatToBuild,
      idea: formData.idea,
      startup_name: 'Not provided',
      startup_stage: 'Just an Idea',
      status: 'new'
    };

    const { error: submitError } = await supabase
      .from('startup_submissions')
      .insert([payload]);

    setIsSubmitting(false);

    if (submitError) {
      console.error('Supabase Error:', submitError);
      setError('Something went wrong. Please try again.');
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <section id="form" className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Tell us your idea</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
                  <input
                    required
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="+1 (234) 567-8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">What do you want to build?</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {buildOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, whatToBuild: option })}
                        className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                          formData.whatToBuild === option 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your idea</label>
                  <textarea
                    required
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all min-h-[120px] resize-none"
                    placeholder="I want to build a platform that..."
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.whatToBuild}
                  className="w-full py-4 bg-black text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'SEND MY IDEA 🚀'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Idea Received!</h2>
              <p className="text-gray-500 text-lg mb-8">
                We're excited about your idea. Our team will reach out to you on WhatsApp soon.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', whatsapp: '', whatToBuild: '', idea: '' });
                }}
                className="px-8 py-3 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Submit another idea
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
