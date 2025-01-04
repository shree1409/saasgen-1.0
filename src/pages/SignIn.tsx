import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Logo from "@/components/landing/Logo";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-secondary/20 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold mt-4">Welcome to SaasGen</h1>
          <p className="text-muted-foreground text-center mt-2">
            Sign in to access your account and generate unique SaaS ideas
          </p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="space-y-2">
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
            />
          </div>
          <div className="space-y-2">
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
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="flex justify-between items-center">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={handleResetPassword}
              disabled={isResettingPassword || !email}
            >
              {isResettingPassword ? "Sending reset link..." : "Forgot password?"}
            </Button>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm"
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