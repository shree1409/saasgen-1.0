import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePrices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('🔍 Starting price fetch...');
      
      const { data: prices, error: fetchError } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      console.log('📦 Raw Supabase response:', { prices, fetchError });

      if (fetchError) {
        console.error('❌ Error fetching prices:', fetchError);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again later.",
          variant: "destructive",
        });
        throw fetchError;
      }

      if (!prices || prices.length === 0) {
        console.warn('⚠️ No active prices found in the database');
        return [];
      }

      console.log('✅ Successfully fetched prices:', prices);
      return prices;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      onError: (error: Error) => {
        console.error('❌ Query error:', error);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });
};