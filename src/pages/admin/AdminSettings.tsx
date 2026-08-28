import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ShieldCheck, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export const AdminSettings = () => {
  const { session, isMfaEnrolled } = useAuth();
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const handleReEnroll = async () => {
    try {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors && factors.totp.length > 0) {
        const factorId = factors.totp[0].id;
        await supabase.auth.mfa.unenroll({ factorId });
      }
      navigate('/admin/setup-2fa');
    } catch (err) {
      console.error('Error re-enrolling:', err);
      alert('Could not re-enroll authenticator at this time.');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);

    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setShowPasswordModal(false), 1500);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Settings</h1>
      
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your administrator account details.</p>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-600 font-medium">
              {session?.user.email}
            </div>
          </div>
          <div>
            <button
              onClick={() => { setShowPasswordModal(true); setPasswordError(''); setPasswordSuccess(false); setNewPassword(''); setConfirmPassword(''); }}
              className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Security</h2>
          <p className="text-sm text-gray-500 mt-1">Two-factor authentication and session security.</p>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Two-factor authentication</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">2FA Status:</span> 
                {isMfaEnrolled ? (
                  <span className="inline-flex items-center gap-1 text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" /> Enabled
                  </span>
                ) : (
                  <span className="text-red-600 font-medium bg-red-50 px-2 py-0.5 rounded">Disabled</span>
                )}
              </div>
            </div>
            
            {isMfaEnrolled && (
              <button 
                onClick={handleReEnroll}
                className="px-4 py-2 border border-gray-200 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Re-enroll Authenticator
              </button>
            )}
          </div>
          
          <p className="text-xs text-gray-500 max-w-lg leading-relaxed">
            Protect your admin portal with an additional layer of security. We support any authenticator app using the TOTP standard, such as Google Authenticator or 1Password.
          </p>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-gray-900 mb-1">Change Password</h3>
            <p className="text-sm text-gray-500 mb-6">Enter your new password below.</p>

            {passwordSuccess ? (
              <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                ✓ Password updated successfully!
              </div>
            ) : (
              <form onSubmit={handleChangePassword} className="space-y-4">
                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                    {passwordError}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="w-full py-3 px-4 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  {changingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

