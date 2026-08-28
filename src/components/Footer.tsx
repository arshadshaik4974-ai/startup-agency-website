import { Rocket } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-6 md:px-12 mt-20">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 font-semibold text-xl tracking-tight text-white">
            <Rocket className="w-5 h-5 text-white" />
            <span>Agency.</span>
          </div>
          <p className="text-sm text-gray-500">Helping ideas become real businesses.</p>
        </div>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#form" className="hover:text-white transition-colors">Submit Idea</a>
          <a href="mailto:contact@agency.com" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center">
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Agency. All rights reserved.</p>
      </div>
    </footer>
  );
};

