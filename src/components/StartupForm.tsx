import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { SuccessScreen } from './SuccessScreen';
import { supabase } from '../lib/supabase';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  startupName: string;
  industry: string;
  startupStage: string;
  idea: string;
  problem: string;
  solutionDifference: string;
  supportNeeded: string[];
  additionalMessage: string;
}

const initialData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  startupName: '',
  industry: '',
  startupStage: '',
  idea: '',
  problem: '',
  solutionDifference: '',
  supportNeeded: [],
  additionalMessage: '',
};

const industries = ["AI", "SaaS", "FinTech", "HealthTech", "EdTech", "E-commerce", "Agriculture", "Travel", "Gaming", "Media", "Other"];
const stages = ["Just an Idea", "Research", "Prototype", "MVP", "Early Customers", "Growing"];
const supportOptions = ["Funding Opportunities", "Business Guidance", "Product Development", "Branding & Marketing", "Technology Support", "Mentorship", "Other"];

export const StartupForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Map formData to database columns
    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone || null,
      country: formData.country || null,
      startup_name: formData.startupName,
      industry: formData.industry,
      startup_stage: formData.startupStage,
      idea: formData.idea,
      problem: formData.problem,
      solution_difference: formData.solutionDifference,
      support_needed: formData.supportNeeded,
      additional_message: formData.additionalMessage || null,
      pitch_deck_url: null, // Skipping file upload for now as requested
      status: 'new'
    };

    const { error } = await supabase
      .from('startup_submissions')
      .insert([payload]);

    setIsSubmitting(false);

    if (error) {
      console.error('Supabase Error:', error);
      setError(`Error: ${error.message || 'Something went wrong while submitting your idea.'}`);
    } else {
      setIsSuccess(true);
    }
  };

  const handleSupportToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      supportNeeded: prev.supportNeeded.includes(option)
        ? prev.supportNeeded.filter(item => item !== option)
        : [...prev.supportNeeded, option]
    }));
  };

  if (isSuccess) {
    return <SuccessScreen onReset={() => {
      setFormData(initialData);
      setStep(1);
      setIsSuccess(false);
    }} />;
  }

  return (
    <section id="form" className="py-24 px-6 md:px-12 bg-white max-w-4xl mx-auto">
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Tell us about your vision</h2>
          <div className="text-sm font-medium text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            Step {step} / {totalSteps}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={step === totalSteps ? handleSubmit : handleNext}>
              
              {/* Step 1: About You */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">About You</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input 
                        required
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input 
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                        value={formData.country}
                        onChange={e => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Your Startup */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Your Startup</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Startup Name *</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                        value={formData.startupName}
                        onChange={e => setFormData({...formData, startupName: e.target.value})}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                        <select 
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                          value={formData.industry}
                          onChange={e => setFormData({...formData, industry: e.target.value})}
                        >
                          <option value="" disabled>Select industry</option>
                          {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Startup Stage *</label>
                        <select 
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                          value={formData.startupStage}
                          onChange={e => setFormData({...formData, startupStage: e.target.value})}
                        >
                          <option value="" disabled>Select stage</option>
                          {stages.map(stage => <option key={stage} value={stage}>{stage}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Your Idea */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-2">Your Idea</h3>
                  <p className="text-sm text-gray-500 mb-6">Don't worry about making it perfect. Explain it in your own words.</p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your startup idea *</label>
                      <textarea 
                        required
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                        value={formData.idea}
                        onChange={e => setFormData({...formData, idea: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">What problem are you solving? *</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                        value={formData.problem}
                        onChange={e => setFormData({...formData, problem: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">What makes your solution different? *</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                        value={formData.solutionDifference}
                        onChange={e => setFormData({...formData, solutionDifference: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Support */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-6">Support & Final Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">What kind of support are you looking for?</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {supportOptions.map(option => (
                        <label 
                          key={option} 
                          className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                            formData.supportNeeded.includes(option) ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={(e) => { e.preventDefault(); handleSupportToggle(option); }}
                        >
                          <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                            formData.supportNeeded.includes(option) ? 'bg-black border-black text-white' : 'border-gray-300'
                          }`}>
                            {formData.supportNeeded.includes(option) && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-sm font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Anything else you'd like us to know? (Optional)</label>
                    <textarea 
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-none"
                      value={formData.additionalMessage}
                      onChange={e => setFormData({...formData, additionalMessage: e.target.value})}
                    />
                  </div>



                  <div className="pt-6 border-t border-gray-100 mt-8">
                    <div className="flex items-start gap-3 mb-6 bg-gray-50 p-4 rounded-xl">
                      <Lock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Your information is safe with us.</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Your submission will be treated confidentially and reviewed only for evaluating your startup and potential opportunities with our agency. By submitting this form, you agree that our team may contact you regarding your submission.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-black transition-colors ${step === 1 ? 'invisible' : ''}`}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                
                {step < totalSteps ? (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all active:scale-95"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit My Idea 🚀'}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
