"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initialize = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
  
      if (error) {
        // Ignore or quietly handle missing session errors for logged-out users
        if (error.name === 'AuthSessionMissingError' || error.message.includes('Auth session missing')) {
          setUser(null);
          return;
        }
  
        // Log genuine auth errors (e.g., network issues, expired refresh tokens)
        console.error('Auth initialization error:', error.message);
        setUser(null);
        return;
      }
  
      setUser(user);
    } catch (err) {
      console.error('Unexpected auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      if (nextUser && nextUser.is_anonymous === false) {
        setUser(nextUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        initialize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
