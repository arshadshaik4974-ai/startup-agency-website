import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LogOut, LayoutDashboard, Settings, Rocket, Menu, X } from 'lucide-react';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 font-semibold text-xl tracking-tight text-gray-900">
                <Rocket className="w-5 h-5 text-black" />
                <span>Admin.</span>
              </div>
              <nav className="hidden md:flex items-center gap-4">
                <Link to="/admin/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/admin/settings" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-black transition-colors"
                aria-label="Toggle admin menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-gray-100 pb-4 pt-2 flex flex-col gap-1">
              <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/admin/settings" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

