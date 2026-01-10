import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, AppRole } from '@/stores/authStore';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: AppRole[];
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requiredRoles = [], 
  redirectTo = '/auth' 
}: AuthGuardProps) {
  const { user, roles, isLoading, isInitialized, initialize } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (!isLoading && isInitialized) {
      if (!user) {
        // Not logged in, redirect to auth
        navigate(redirectTo, { 
          state: { from: location.pathname },
          replace: true 
        });
      } else if (requiredRoles.length > 0) {
        // Check if user has at least one required role
        const hasRequiredRole = requiredRoles.some(role => roles.includes(role));
        if (!hasRequiredRole) {
          // User doesn't have required role, redirect to appropriate dashboard
          if (roles.includes('admin')) {
            navigate('/admin', { replace: true });
          } else if (roles.includes('faculty')) {
            navigate('/faculty', { replace: true });
          } else {
            navigate('/student', { replace: true });
          }
        }
      }
    }
  }, [user, roles, isLoading, isInitialized, requiredRoles, navigate, redirectTo, location.pathname]);

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => roles.includes(role));
    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
}
