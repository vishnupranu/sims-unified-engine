import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/stores/authStore';
import { Loader2, GraduationCap, Mail, Lock, User } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, roles, signIn, signUp, isLoading, initialize, isInitialized } = useAuthStore();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  useEffect(() => {
    if (user && isInitialized) {
      // Redirect based on role
      const from = (location.state as { from?: string })?.from;
      
      if (from && from !== '/auth') {
        navigate(from, { replace: true });
      } else if (roles.includes('admin')) {
        navigate('/admin', { replace: true });
      } else if (roles.includes('faculty')) {
        navigate('/faculty', { replace: true });
      } else {
        navigate('/student', { replace: true });
      }
    }
  }, [user, roles, isInitialized, navigate, location.state]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      loginSchema.parse(loginForm);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    const { error } = await signIn(loginForm.email, loginForm.password);
    
    if (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      signupSchema.parse(signupForm);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
    }

    const { error } = await signUp(
      signupForm.email, 
      signupForm.password, 
      signupForm.fullName
    );
    
    if (error) {
      toast({
        title: 'Registration Failed',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Account Created!',
        description: 'You can now log in with your credentials.',
      });
      setSignupForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | SIMS Group of Institutions</title>
        <meta name="description" content="Login to access your student or faculty portal at SIMS Group of Institutions." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center py-16 bg-muted/30">
          <div className="container max-w-md">
            <Card className="shadow-elegant">
              <CardHeader className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full gradient-hero flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl font-display">Welcome to SIMS Portal</CardTitle>
                <CardDescription>
                  Access your student or faculty dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4 mt-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          />
                        </div>
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          />
                        </div>
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                      </div>
                      
                      <Button type="submit" className="w-full gradient-hero" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="signup" className="space-y-4 mt-6">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            value={signupForm.fullName}
                            onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                          />
                        </div>
                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            className="pl-10"
                            value={signupForm.email}
                            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                          />
                        </div>
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                          />
                        </div>
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-confirm">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signup-confirm"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={signupForm.confirmPassword}
                            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                          />
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                      </div>
                      
                      <Button type="submit" className="w-full gradient-hero" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="justify-center">
                <p className="text-sm text-muted-foreground text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
