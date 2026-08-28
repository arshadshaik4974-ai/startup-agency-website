import { useState } from 'react';
import { Rocket, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full py-6 px-6 md:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-xl tracking-tight text-gray-900">
          <Rocket className="w-6 h-6 text-black" />
          <span>Agency.</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#how-it-works" className="hover:text-black transition-colors">How It Works</a>
          <a href="#form" className="hover:text-black transition-colors">Submit Idea</a>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="#form"
            className="hidden sm:inline-flex px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all active:scale-95"
          >
            Share Your Idea
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-2 border-t border-gray-100 pt-4 flex flex-col gap-3">
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-2">
            How It Works
          </a>
          <a href="#form" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-600 hover:text-black transition-colors py-2">
            Submit Idea
          </a>
          <a 
            href="#form"
            onClick={() => setMobileOpen(false)}
            className="sm:hidden text-center px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all active:scale-95 mt-1"
          >
            Share Your Idea
          </a>
        </div>
      )}
    </nav>
  );
};

