import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePrices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('Starting price fetch...');
      
      const { data: prices, error: fetchError } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (fetchError) {
        console.error('Error fetching prices:', fetchError);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again later.",
          variant: "destructive",
        });
        throw new Error(`Failed to fetch prices: ${fetchError.message}`);
      }

      console.log('Raw response from Supabase:', { prices, error: fetchError });
      
      if (!prices || prices.length === 0) {
        console.warn('No active prices found in the database');
        toast({
          title: "No Prices Available",
          description: "Currently there are no active pricing plans.",
          variant: "destructive",
        });
        return [];
      }

      console.log('Successfully fetched prices:', prices);
      return prices;
    },
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};