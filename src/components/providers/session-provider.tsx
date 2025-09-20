'use client';

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/auth";
import { AuthLoading } from "@/components/auth/auth-loading";

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthStateSync({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const { setUser, setInitializing, isInitializing } = useAuthStore();

  useEffect(() => {
    if (status === 'loading') {
      setInitializing(true);
      return;
    }

    if (session?.user) {
      setUser({
        id: session.user.id || '',
        name: session.user.name || '',
        email: session.user.email || '',
        avatar: session.user.image || undefined,
        createdAt: new Date().toISOString(),
      });
    } else {
      setUser(null);
    }
  }, [session, status, setUser, setInitializing]);

  if (status === 'loading' || isInitializing) {
    return <AuthLoading />;
  }

  return <>{children}</>;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthStateSync>
        {children}
      </AuthStateSync>
    </SessionProvider>
  );
}