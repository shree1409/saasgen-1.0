import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useSubscriptionCheck = (setError: (value: string | null) => void, setHasSubscription: (value: boolean) => void) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/sign-in');
          return;
        }

        console.log('Checking subscription for user:', session.user.email);

        // Check for active subscription
        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .eq('is_active', true)
          .maybeSingle();

        if (subError) {
          console.error('Error checking subscription:', subError);
          setError('Failed to verify subscription status. Please try again.');
          setHasSubscription(false);
          return;
        }

        if (!subscription) {
          console.log('No active subscription found');
          setHasSubscription(false);
          navigate('/pricing');
          return;
        }

        console.log('Active subscription found:', subscription);
        setHasSubscription(true);
        setError(null);
      } catch (error) {
        console.error('Error in checkAuth:', error);
        setError('An unexpected error occurred. Please try again.');
        setHasSubscription(false);
      }
    };

    checkAuth();
  }, [navigate, setError, setHasSubscription]);
};