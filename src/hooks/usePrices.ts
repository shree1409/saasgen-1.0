import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePrices = () => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['prices'],
    queryFn: async () => {
      console.log('Fetching prices...');
      const { data, error: fetchError } = await supabase
        .from('prices')
        .select('*')
        .eq('active', true)
        .order('unit_amount');
      
      if (fetchError) {
        console.error('Error fetching prices:', fetchError);
        throw fetchError;
      }
      
      if (!data || data.length === 0) {
        console.error('No prices found');
        throw new Error('No prices found');
      }
      
      console.log('Fetched prices:', data);
      return data;
    },
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    meta: {
      errorMessage: "Failed to load pricing information. Please try again later.",
      onError: (err: Error) => {
        console.error('Query error:', err);
        toast({
          title: "Error",
          description: "Failed to load pricing information. Please try again later.",
          variant: "destructive",
        });
      }
    }
  });
};