import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Multi-select helper
const toggleArrayItem = (arr: string[], item: string) => 
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

export const ShortLeadForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '+91 ',
    role: '',
    location: '',
    
    problem: '',
    problemAudience: [] as string[],
    problemLocation: '',
    currentSolution: '',
    solutionGap: '',
    seriousness: '',
    arePeoplePaying: '',
    
    solution: '',
    endUsers: '',
    payers: '',
    monetization: '',
    marketing: '',
    supportNeeded: [] as string[],
    extraNotes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formattedAdditionalMessage = `[PROBLEM DISCOVERY]
Who has this problem: ${formData.problemAudience.join(', ') || 'Not specified'}
Where it happens: ${formData.problemLocation || 'Not specified'}
Current solutions: ${formData.currentSolution || 'Not specified'}
Why current solutions fail: ${formData.solutionGap || 'Not specified'}
Seriousness: ${formData.seriousness || 'Not specified'}
Are people paying for a solution: ${formData.arePeoplePaying || 'Not specified'}

[SOLUTION & BUSINESS MODEL]
End users: ${formData.endUsers || 'Not specified'}
Who pays for it: ${formData.payers || 'Not specified'}
Monetization strategy: ${formData.monetization || 'Not specified'}
Marketing channel: ${formData.marketing || 'Not specified'}

[ADDITIONAL NOTES]
${formData.extraNotes || 'None'}`;

    const payload = {
      full_name: formData.name,
      email: 'no-email@qr-visitor.com',
      phone: formData.whatsapp,
      country: formData.location || 'Not provided',
      startup_name: 'Not provided',
      industry: 'Idea Submission',
      startup_stage: formData.role || 'Not specified',
      problem: formData.problem || 'Not provided',
      idea: formData.solution || 'Not provided',
      solution_difference: formData.solutionGap || 'Not provided',
      support_needed: formData.supportNeeded,
      additional_message: formattedAdditionalMessage,
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

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const isStep1Valid = formData.name.trim() !== '' && formData.whatsapp.trim().length > 4;

  return (
    <section id="form" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100 overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress UI */}
              <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -z-10 -translate-y-1/2 rounded-full"></div>
                
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center bg-white px-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-colors ${
                      step === s ? 'bg-black text-white' : step > s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {s}
                    </div>
                    <span className={`text-xs font-bold tracking-wider uppercase ${step === s ? 'text-black' : 'text-gray-400'}`}>
                      {s === 1 ? 'YOU' : s === 2 ? 'PROBLEM' : 'SOLUTION'}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">LET'S START WITH YOU 👋</h2>
                        <p className="text-gray-500 text-lg">Tell us a little about yourself. This helps us understand your idea better.</p>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">1. Your Name *</label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">2. WhatsApp Number *</label>
                          <div className="flex relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500 font-bold text-lg pointer-events-none">
                              +91
                            </span>
                            <input
                              required
                              type="tel"
                              value={formData.whatsapp.replace(/^\+91\s*/, '')}
                              onChange={(e) => setFormData({ ...formData, whatsapp: '+91 ' + e.target.value })}
                              className="w-full pl-16 pr-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg"
                              placeholder="98765 43210"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">3. What best describes you?</label>
                          <div className="flex flex-wrap gap-3">
                            {['Student 🎓', 'Business Owner 💼', 'Founder 🚀', 'Creator 🎨', 'Freelancer 💻', 'Other'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, role: opt })}
                                className={`px-5 py-3 rounded-xl text-sm font-bold border transition-all ${
                                  formData.role === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">4. Where are you from?</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg"
                            placeholder="City / State / Country"
                          />
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!isStep1Valid}
                          className="w-full py-5 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          CONTINUE <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">WHAT PROBLEM ARE YOU TRYING TO SOLVE? 💡</h2>
                        <p className="text-gray-500 text-lg">Great ideas usually start with a real problem. Tell us what you have noticed.</p>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">1. What problem have you noticed?</label>
                          <textarea
                            value={formData.problem}
                            onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg min-h-[120px] resize-none"
                            placeholder="Example: Small local shops struggle to get customers online..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">2. Who has this problem? (Select multiple)</label>
                          <div className="flex flex-wrap gap-2">
                            {['Students', 'Customers', 'Small Businesses', 'Shops', 'Restaurants', 'Schools', 'Companies', 'Creators', 'Other'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, problemAudience: toggleArrayItem(formData.problemAudience, opt) })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.problemAudience.includes(opt) ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">3. Where does this problem happen?</label>
                          <div className="flex flex-wrap gap-2">
                            {['My City / Local Area', 'My State', 'Across India 🇮🇳', 'Worldwide 🌎', "I'm not sure"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, problemLocation: opt })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.problemLocation === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">4. How do people solve this problem today?</label>
                          <textarea
                            value={formData.currentSolution}
                            onChange={(e) => setFormData({ ...formData, currentSolution: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg min-h-[100px] resize-none"
                            placeholder="What are people currently doing instead?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">5. Why isn't the current solution good enough?</label>
                          <textarea
                            value={formData.solutionGap}
                            onChange={(e) => setFormData({ ...formData, solutionGap: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg min-h-[100px] resize-none"
                            placeholder="What is missing, expensive, slow, difficult, or frustrating?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">6. How serious is this problem?</label>
                          <div className="flex flex-wrap gap-2">
                            {['Small problem', 'Important problem', 'Very frustrating problem', 'People are already paying to solve it', "I'm not sure"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, seriousness: opt })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.seriousness === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">7. Are people already paying for a solution?</label>
                          <div className="flex flex-wrap gap-2">
                            {['Yes', 'No', "I'm not sure"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, arePeoplePaying: opt })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.arePeoplePaying === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 flex gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-5 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          <ArrowLeft className="w-5 h-5" /> BACK
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex-1 py-5 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          CONTINUE <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900">HOW CAN WE HELP YOU BUILD IT? 🚀</h2>
                        <p className="text-gray-500 text-lg">Now tell us what you're thinking and where you want to take it.</p>
                      </div>

                      <div className="space-y-8">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">1. What solution are you imagining?</label>
                          <textarea
                            value={formData.solution}
                            onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg min-h-[120px] resize-none"
                            placeholder="Tell us what you want to build..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">2. Who would use your solution?</label>
                          <input
                            type="text"
                            value={formData.endUsers}
                            onChange={(e) => setFormData({ ...formData, endUsers: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg"
                            placeholder="e.g. Students, Local shops, Online creators"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">3. Who would pay for it?</label>
                          <div className="flex flex-wrap gap-2">
                            {['Customers', 'Businesses', 'Both', 'Advertisers', 'Subscription users', 'Commission', "I'm not sure"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, payers: opt })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.payers === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">4. How would you like to make money?</label>
                          <div className="flex flex-wrap gap-2">
                            {['One-time payment', 'Subscription', 'Commission', 'Advertising', 'Freemium', 'Not sure yet'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, monetization: opt })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.monetization === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">5. How do you plan to reach your customers?</label>
                          <div className="flex flex-wrap gap-2">
                            {['Instagram / Social Media', 'WhatsApp', 'Google / SEO', 'Local Marketing', 'Ads', 'Friends / Network', 'Partnerships', "I'm not sure"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, marketing: opt })}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                  formData.marketing === opt ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-3">6. What do you need from us? (Select multiple)</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {['💡 Validate my idea', '🔎 Research the market', '🎨 Design my product', '🌐 Build a website', '📱 Build a mobile app', '⚙️ Build custom software', '📈 Marketing', '🚀 Launch my product', '🤝 I need complete guidance'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData({ ...formData, supportNeeded: toggleArrayItem(formData.supportNeeded, opt) })}
                                className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all text-left ${
                                  formData.supportNeeded.includes(opt) ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">7. Anything else you want us to know?</label>
                          <textarea
                            value={formData.extraNotes}
                            onChange={(e) => setFormData({ ...formData, extraNotes: e.target.value })}
                            className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-lg min-h-[100px] resize-none"
                            placeholder="Anything about your idea, customers, competition, budget, or goals..."
                          />
                        </div>
                      </div>

                      {error && <p className="text-red-500 font-bold text-center mt-4">{error}</p>}

                      <div className="pt-6 flex gap-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-5 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                          <ArrowLeft className="w-5 h-5" /> BACK
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-5 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                        >
                          {isSubmitting ? 'SUBMITTING...' : 'SUBMIT MY IDEA 🚀'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-12 h-12" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 uppercase">WE GOT YOUR IDEA! 🚀</h2>
              <p className="text-gray-500 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Thanks for sharing it with us. We'll look through your idea, understand the problem you're trying to solve, and get back to you.
              </p>

              <div className="bg-gray-50 rounded-3xl p-8 mb-12 text-left max-w-lg mx-auto border border-gray-100">
                <h3 className="font-bold text-xl mb-6 text-gray-900 uppercase tracking-tight">WHAT HAPPENS NEXT?</h3>
                <ol className="space-y-4">
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</span>
                    <span className="text-gray-700 text-lg pt-1">We understand your idea</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</span>
                    <span className="text-gray-700 text-lg pt-1">We look at the problem and market</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</span>
                    <span className="text-gray-700 text-lg pt-1">We discuss possible solutions</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">4</span>
                    <span className="text-gray-700 text-lg pt-1">We help you decide what to build</span>
                  </li>
                </ol>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
