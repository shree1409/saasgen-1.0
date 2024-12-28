import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { noCodeKnowledge, codingKnowledge, targetMonths, revenue, niche, preferences } = await req.json();

    const systemPrompt = `You are a website idea generator that creates unique, actionable website concepts based on user inputs. Focus on modern, profitable ideas that match the user's experience level and timeline. Format your response in JSON with the following structure:
    {
      "websiteName": "Name of the website",
      "description": "2-3 sentence description",
      "keyFeatures": ["feature1", "feature2", "feature3"],
      "monetizationStrategy": ["strategy1", "strategy2"],
      "techStack": "Recommended technology stack based on user's experience",
      "timelineBreakdown": "Month-by-month breakdown of development",
      "marketPotential": "Brief market analysis"
    }`;

    const userPrompt = `Generate a website idea with these parameters:
    - No-code experience: ${noCodeKnowledge}
    - Coding experience: ${codingKnowledge}
    - Timeline: ${targetMonths} months
    - Target monthly revenue: ${revenue}
    - Preferred niche: ${niche || 'Open to suggestions'}
    - Additional preferences: ${preferences || 'None specified'}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const generatedIdea = data.choices[0].message.content;

    return new Response(JSON.stringify({ idea: JSON.parse(generatedIdea) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-website-idea function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});