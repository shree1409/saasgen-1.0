import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePrices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('Fetching prices from Supabase...');
      
      const { data: prices, error: fetchError } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (fetchError) {
        console.error('Error fetching prices:', fetchError);
        throw new Error(`Failed to fetch prices: ${fetchError.message}`);
      }
      
      console.log('Received prices from Supabase:', prices);
      
      if (!prices || prices.length === 0) {
        console.warn('No active prices found in the database');
        return [];
      }
      
      return prices;
    },
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      errorMessage: "Failed to load pricing information",
      onError: (error: Error) => {
        console.error('Query error:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });
};