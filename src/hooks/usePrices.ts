import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePrices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('🔍 Fetching prices from Supabase...');
      
      const { data: prices, error } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (error) {
        console.error('❌ Error fetching prices:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing information",
          variant: "destructive",
        });
        throw error;
      }

      if (!prices || prices.length === 0) {
        console.warn('⚠️ No active prices found');
        return [];
      }

      console.log('✅ Successfully fetched prices:', prices);
      return prices;
    },
    retry: 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};