import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useHeaderState = () => {
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
            await supabase.auth.signOut();
            setSession(null);
          } else {
            throw error;
          }
        } else {
          setSession(currentSession);

          if (currentSession) {
            const { data: subscription, error: subError } = await supabase
              .from('subscriptions')
              .select('*')
              .eq('user_id', currentSession.user.id)
              .eq('is_active', true)
              .maybeSingle();

            if (subError) {
              throw subError;
            }
            setHasActiveSubscription(!!subscription);
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
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', currentSession.user.id)
          .eq('is_active', true)
          .maybeSingle();
        
        setHasActiveSubscription(!!subscription);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  return {
    session,
    loading,
    hasActiveSubscription,
    setSession,
    setHasActiveSubscription
  };
};