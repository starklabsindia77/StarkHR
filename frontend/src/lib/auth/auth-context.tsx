import { createContext, useContext, useState, useEffect } from 'react';
import {
  AuthUser,
  // signIn as authSignIn,
  // signOut as authSignOut,
} from './auth-service';
import { useToast } from '@/components/ui/use-toast';
import { authService, RegisterData } from '@/lib/api/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signOut: () => Promise<boolean>;
  register: (data: RegisterData) => Promise<AuthUser>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state
  useEffect(() => {
    const initializeAuthState = async () => {
      try {
        setLoading(true);
        const existingUser = await authService.getCurrentUser();
        if (existingUser) {
          setUser(existingUser);
        }
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuthState();
  }, []);

  const handleSignIn = async (
    email: string,
    password: string
  ): Promise<AuthUser> => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      setUser(response.user);
      return response.user;
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Authentication failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      return true;
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData): Promise<AuthUser> => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      setUser(response.user);
      return response.user;
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Registration failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        register: handleRegister,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}