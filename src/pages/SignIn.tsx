import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-lg rounded-lg shadow-xl p-8 animate-fadeIn">
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-center mb-8">
              Sign in to your account to continue
            </p>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: 'rgb(147, 51, 234)',
                      brandAccent: 'rgb(126, 34, 206)',
                    },
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full px-4 py-2 rounded-lg',
                  input: 'rounded-lg px-4 py-2 bg-white/50',
                  label: 'text-sm font-medium text-gray-700',
                  message: 'text-sm text-red-600',
                },
              }}
              theme="light"
              providers={[]}
              redirectTo={`${window.location.origin}/`}
              view="sign_in"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email address',
                    password_label: 'Password',
                    button_label: 'Sign in',
                    loading_button_label: 'Signing in...',
                    social_provider_text: 'Sign in with {{provider}}',
                    link_text: "Don't have an account? Sign up",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;