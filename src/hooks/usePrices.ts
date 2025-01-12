import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePrices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('🔍 Fetching prices...');
      
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

      console.log('✅ Fetched prices:', prices);
      
      if (!prices || prices.length === 0) {
        console.warn('⚠️ No prices found in database');
        return [];
      }

      return prices;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
    retry: 3,
  });
};