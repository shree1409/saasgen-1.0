import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Logo from "@/components/landing/Logo";
import { toast } from "@/hooks/use-toast";
import { AuthError } from "@supabase/supabase-js";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate("/");
      } else if (event === "SIGNED_OUT") {
        toast({
          title: "Signed out",
          description: "You've been signed out successfully.",
        });
      } else if (event === "USER_UPDATED") {
        // Handle user updates
        if (session) {
          toast({
            title: "Profile updated",
            description: "Your profile has been updated successfully.",
          });
        }
      }
    });

    // Set up error listener
    const {
      data: { subscription: errorSubscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        const { error: authError } = await supabase.auth.getUser();
        if (authError) {
          toast({
            title: "Error signing in",
            description: authError.message,
            variant: "destructive",
          });
        }
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
          <h1 className="text-2xl font-bold mt-4">Welcome to SaasGen</h1>
          <p className="text-muted-foreground text-center mt-2">
            Sign in to access your account and generate unique SaaS ideas
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
          showLinks={true}
          redirectTo={window.location.origin}
        />
      </Card>
    </div>
  );
};

export default SignIn;