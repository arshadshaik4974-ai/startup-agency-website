import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { supabase } from '../../lib/supabase';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const AdminSetup2FA = () => {
  const [qrCodeData, setQrCodeData] = useState('');
  const [factorId, setFactorId] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const { session, isMfaEnrolled } = useAuth();

  useEffect(() => {
    if (isMfaEnrolled) {
      navigate('/admin/verify-2fa');
      return;
    }

    if (!session) {
      setPageLoading(false);
      return;
    }

    let cancelled = false;

    const setupMFA = async () => {
      try {
        // Step 1: Get all existing factors
        const { data: factors } = await supabase.auth.mfa.listFactors();

        if (factors && factors.totp) {
          // Step 2: Unenroll ALL unverified factors one by one
          for (const factor of factors.totp) {
            if ((factor.status as string) === 'unverified') {
              await supabase.auth.mfa.unenroll({ factorId: factor.id });
            }
          }
        }

        // Step 3: Enroll a brand new TOTP factor
        const { data, error: enrollError } = await supabase.auth.mfa.enroll({
          factorType: 'totp',
          friendlyName: `admin-${Date.now()}`
        });

        if (enrollError) throw enrollError;

        if (!cancelled) {
          setFactorId(data.id);
          // The totp.uri is the otpauth:// URI that QR code libraries need
          setQrCodeData(data.totp.uri);
        }
      } catch (err: any) {
        console.error('MFA Setup Error:', err);
        if (!cancelled) {
          setError(err.message || 'Failed to initialize MFA setup. Please try logging out and back in.');
        }
      } finally {
        if (!cancelled) {
          setPageLoading(false);
        }
      }
    };

    setupMFA();

    return () => {
      cancelled = true;
    };
  }, [session, isMfaEnrolled, navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
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

      await supabase.auth.refreshSession();
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
        <h2 className="text-center text-2xl font-bold text-white mb-2">Secure your admin account</h2>
        <p className="text-center text-sm text-gray-400 mb-8">
          Your admin account requires two-factor authentication to protect sensitive founder and startup information.
        </p>

        {error && (
          <div className="p-3 mb-6 bg-red-500/10 text-red-400 rounded-lg text-sm font-medium border border-red-500/20">
            {error}
          </div>
        )}

        {pageLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : qrCodeData ? (
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 border border-gray-200 rounded-xl mb-4">
              <QRCodeSVG value={qrCodeData} size={200} />
            </div>
            <p className="text-xs text-gray-400 mb-6 text-center max-w-[250px]">
              Scan this QR code with Google Authenticator, Authy, or 1Password.
            </p>

            <form onSubmit={handleVerify} className="w-full">
              <label className="block text-sm font-medium text-gray-300 mb-1">Enter the 6-digit code</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="000000"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all text-center tracking-[0.5em] font-mono text-lg mb-6 placeholder:text-gray-600"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
              />
              <button
                type="submit"
                disabled={loading || verifyCode.length !== 6}
                className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 transition-all disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Enable 2FA'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm mb-4">Could not generate QR code. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 rounded-xl text-sm font-medium text-black bg-white hover:bg-gray-100 transition-all"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
