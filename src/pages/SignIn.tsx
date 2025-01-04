import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Logo from "@/components/landing/Logo";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/generator");
      }
      setMounted(true);
    });
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Add a small delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (data?.user) {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      navigate("/generator");
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsResettingPassword(true);
    
    // Add a small delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setIsResettingPassword(false);
      return;
    }

    toast({
      title: "Password reset email sent",
      description: "Check your email for the password reset link.",
    });
    setIsResettingPassword(false);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-secondary/20 p-4">
      <Card className="w-full max-w-md p-6 animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="animate-fade-in">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold mt-4 animate-fade-in">Welcome to SaasGen</h1>
          <p className="text-muted-foreground text-center mt-2 animate-fade-in">
            Sign in to access your account and generate unique SaaS ideas
          </p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="transition-all duration-200"
            />
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className="transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            className="w-full animate-fade-in relative"
            style={{ animationDelay: "300ms" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="flex justify-between items-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm hover:text-primary transition-colors"
              onClick={handleResetPassword}
              disabled={isResettingPassword || !email}
            >
              {isResettingPassword ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  Sending...
                </>
              ) : (
                "Forgot password?"
              )}
            </Button>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm hover:text-primary transition-colors"
              onClick={() => navigate("/sign-up")}
            >
              Don't have an account? Sign up
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;