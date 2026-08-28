import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminVerify2FA = () => {
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [factorId, setFactorId] = useState('');
  const navigate = useNavigate();
  const { aalLevel } = useAuth();

  useEffect(() => {
    if (aalLevel === 'aal2') {
      navigate('/admin/dashboard');
      return;
    }

    const fetchFactors = async () => {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        setError('Failed to fetch authentication factors.');
        return;
      }
      if (data.totp.length > 0) {
        setFactorId(data.totp[0].id);
      }
    };
    fetchFactors();
  }, [aalLevel, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factorId) {
      setError('No TOTP factor found for this account.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) throw challenge.error;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.data.id,
        code: verifyCode,
      });

      if (verify.error) throw verify.error;

      // Force session refresh to update AAL
      await supabase.auth.refreshSession();
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">🔐 Verify your identity</h2>
        <p className="text-center text-sm text-gray-500 mb-8">
          Enter the 6-digit code from your authenticator app.
        </p>

        {error && (
          <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <div className="mb-6">
            <input
              type="text"
              required
              maxLength={6}
              placeholder="000000"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-center tracking-[0.5em] font-mono text-2xl"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || verifyCode.length !== 6}
            className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all disabled:opacity-50 mb-4"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};
