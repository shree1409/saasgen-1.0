import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Logo from "@/components/landing/Logo";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle successful sign in/up
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome to SaasGen!",
          description: "Your account has been created successfully.",
        });
        navigate("/");
      }
    });

    // Set up error listener
    const {
      data: { subscription: errorSubscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const error = session?.error;
      if (error?.message?.includes("User already registered")) {
        toast({
          title: "Account already exists",
          description: "Please sign in instead",
          variant: "destructive",
        });
        navigate("/sign-in");
      } else if (error) {
        toast({
          title: "Error signing up",
          description: error.message,
          variant: "destructive",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-secondary/20 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold mt-4">Join SaasGen</h1>
          <p className="text-muted-foreground text-center mt-2">
            Create an account to start generating unique SaaS ideas
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#6366f1',
                  brandAccent: '#4f46e5',
                }
              }
            }
          }}
          providers={[]}
          theme="light"
          view="sign_up"
        />
      </Card>
    </div>
  );
};

export default SignUp;