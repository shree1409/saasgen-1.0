import { ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        if (error) {
          if (error.message.includes('refresh_token_not_found')) {
            // Clear the invalid session state
            await supabase.auth.signOut();
            setSession(null);
          } else {
            throw error;
          }
        } else {
          setSession(currentSession);

          if (currentSession) {
            // Check for active subscription
            const { data: subscriptions, error: subError } = await supabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', currentSession.user.id)
              .eq('is_active', true)
              .single();

            if (subError && !subError.message.includes('No rows found')) {
              throw subError;
            }
            setHasActiveSubscription(!!subscriptions);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        toast({
          title: "Session Error",
          description: "Please sign in again",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth event:', event);
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        setSession(null);
        setHasActiveSubscription(false);
      } else if (event === 'SIGNED_IN' && currentSession) {
        setSession(currentSession);
        // Check subscription status on sign in
        const { data: subscriptions } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', currentSession.user.id)
          .eq('is_active', true)
          .single();
        
        setHasActiveSubscription(!!subscriptions);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);
  
  const scrollToFeatures = () => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToFeatures: true } });
    } else {
      const featuresSection = document.getElementById('features');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
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

  const handleGenerateIdea = () => {
    if (session) {
      navigate('/generator');
    } else {
      navigate('/sign-in');
    }
  };

  if (loading) {
    return null;
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Logo />
          <span className="font-semibold text-lg">saasgen</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Button 
            variant="ghost"
            onClick={scrollToFeatures}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Features
          </Button>
          <Button 
            variant="ghost"
            onClick={() => navigate('/how-it-works')}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            How it Works
          </Button>
          {!session ? (
            <Button 
              variant="ghost"
              onClick={() => navigate('/pricing')}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Pricing
            </Button>
          ) : null}
        </nav>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Button 
                variant="default" 
                size="sm"
                className="text-white"
                onClick={handleGenerateIdea}
              >
                Generate Idea
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              className="text-white"
              onClick={() => navigate('/sign-in')}
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;