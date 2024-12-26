import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
      if (event === "SIGNED_OUT") {
        navigate("/signin");
      }
      if (event === "USER_UPDATED") {
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
              button: {
                background: 'rgb(var(--primary))',
                color: 'white',
                borderRadius: '0.5rem',
              },
              anchor: {
                color: 'rgb(var(--primary))',
              },
            },
          }}
          theme="light"
          providers={[]}
          onError={(error) => {
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: error.message,
            });
          }}
        />
      </div>
    </div>
  );
};

export default SignIn;