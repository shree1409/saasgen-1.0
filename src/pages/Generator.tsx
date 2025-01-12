import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/landing/Header";
import GeneratorForm from "@/components/GeneratorForm";

const Generator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to access the generator.",
          });
          navigate('/sign-in');
        }
      } catch (error) {
        console.error('Session check error:', error);
        toast({
          title: "Error",
          description: "Failed to check authentication status",
          variant: "destructive",
        });
        navigate('/sign-in');
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/sign-in');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-white to-secondary/20">
        <div className="container px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <GeneratorForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;