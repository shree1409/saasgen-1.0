import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Logo from "@/components/landing/Logo";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Add a small delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 200));

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/generator`,
        },
      });

      if (error) {
        if (error.message === "User already registered") {
          toast({
            title: "Account already exists",
            description: "Please sign in instead or use a different email address.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error signing up",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data?.user) {
        toast({
          title: "Welcome to SaasGen!",
          description: "Your account has been created successfully.",
        });
        navigate("/generator");
      }
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-2xl font-bold mt-4 animate-fade-in">Join SaasGen</h1>
          <p className="text-muted-foreground text-center mt-2 animate-fade-in">
            Create an account to start generating unique SaaS ideas
          </p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-4">
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
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-semibold hover:text-primary transition-colors"
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </Button>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;