import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export const RequireAuth = () => {
  const { session, loading, isMfaEnrolled, aalLevel } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!session) {
        setCheckingRole(false);
        return;
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || !data || data.role !== 'admin') {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
      setCheckingRole(false);
    };

    if (session) {
      checkAdminRole();
    } else {
      setCheckingRole(false);
    }
  }, [session]);

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  // Not logged in at all
  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Not an admin
  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-6">You don't have admin privileges to access this area.</p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Need MFA setup
  if (!isMfaEnrolled && location.pathname !== '/admin/setup-2fa') {
    return <Navigate to="/admin/setup-2fa" replace />;
  }

  // Enrolled but not verified for this session
  if (isMfaEnrolled && aalLevel !== 'aal2' && location.pathname !== '/admin/verify-2fa') {
    return <Navigate to="/admin/verify-2fa" replace />;
  }

  // Fully authenticated, or they are on the exact page they need to be on
  return <Outlet />;
};
