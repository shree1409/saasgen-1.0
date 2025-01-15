import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthForm from "@/components/auth/AuthForm";
import PasswordResetDialog from "@/components/auth/PasswordResetDialog";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Session check error:', error);
        toast({
          title: "Error",
          description: "Failed to check session status",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setErrorMessage("");
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        navigate('/sign-in');
      } else if (event === 'USER_UPDATED') {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setErrorMessage(error.message);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className="bg-card rounded-lg shadow-lg p-6">
            <AuthForm />
            <div className="mt-4 text-center">
              <button
                onClick={() => setResetPasswordOpen(true)}
                className="text-sm text-primary hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </div>

      <PasswordResetDialog 
        open={resetPasswordOpen}
        onOpenChange={setResetPasswordOpen}
      />
    </div>
  );
};

export default SignIn;