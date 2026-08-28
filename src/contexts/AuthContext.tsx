import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isMfaEnrolled: boolean;
  aalLevel: string | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  isMfaEnrolled: false,
  aalLevel: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMfaEnrolled, setIsMfaEnrolled] = useState(false);
  const [aalLevel, setAalLevel] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getSession() {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
      }

      if (mounted) {
        setSession(session);
        if (session) {
          await checkMfa();
        } else {
          setLoading(false);
        }
      }
    }

    async function checkMfa() {
      try {
        const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (error) throw error;
        
        setAalLevel(data.currentLevel);

        // Check if TOTP is enrolled
        const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
        if (factorsError) throw factorsError;
        
        const totpEnrolled = factors.totp.some((f: any) => f.status === 'verified');
        setIsMfaEnrolled(totpEnrolled);
      } catch (err) {
        console.error('Error checking MFA status:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (mounted) {
        setSession(newSession);
        if (newSession) {
          await checkMfa();
        } else {
          setAalLevel(null);
          setIsMfaEnrolled(false);
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, isMfaEnrolled, aalLevel }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
