import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Logo from "./Logo";
import Navigation from "./header/Navigation";
import AuthButtons from "./header/AuthButtons";
import { useHeaderState } from "./header/useHeaderState";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { session, loading, hasActiveSubscription } = useHeaderState();
  
  const scrollToFeatures = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToFeatures: true } });
    } else {
      const featuresSection = document.getElementById('features');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerateIdea = () => {
    if (session) {
      navigate('/generator');
    } else {
      navigate('/sign-in');
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return null;
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo />
          <span className="font-semibold text-lg">saasgen</span>
        </div>
        
        <Navigation 
          session={session} 
          scrollToFeatures={scrollToFeatures} 
        />
        
        <div className="flex items-center gap-4">
          <AuthButtons 
            session={session}
            handleGenerateIdea={handleGenerateIdea}
            handleSignOut={handleSignOut}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;