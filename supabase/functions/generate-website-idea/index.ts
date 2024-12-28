import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { noCodeKnowledge, codingKnowledge, targetMonths, revenue, niche, preferences } = await req.json();

    console.log('Received inputs:', { noCodeKnowledge, codingKnowledge, targetMonths, revenue, niche, preferences });

    const systemPrompt = `You are a website idea generator that creates unique, actionable website concepts based on user inputs. Generate ideas that are modern, profitable, and match the user's experience level and timeline. Your response must be valid JSON with this exact structure:
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
    - Target monthly revenue: $${revenue}
    - Preferred niche: ${niche || 'Open to suggestions'}
    - Additional preferences: ${preferences || 'None specified'}
    
    Consider the user's experience level when suggesting the tech stack and timeline. The idea should be realistic for their skills and timeline.`;

    console.log('Sending request to OpenAI...');

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

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI response format:', data);
      throw new Error('Invalid response format from OpenAI');
    }

    const generatedContent = data.choices[0].message.content;
    console.log('Generated content:', generatedContent);

    // Parse the JSON response and validate its structure
    let parsedIdea;
    try {
      parsedIdea = JSON.parse(generatedContent);
      
      // Validate required fields
      const requiredFields = ['websiteName', 'description', 'keyFeatures', 'monetizationStrategy', 'techStack', 'timelineBreakdown', 'marketPotential'];
      for (const field of requiredFields) {
        if (!parsedIdea[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }
    } catch (error) {
      console.error('Error parsing generated content:', error);
      throw new Error('Failed to parse generated website idea');
    }

    return new Response(JSON.stringify({ idea: parsedIdea }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-website-idea function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Check the function logs for more information'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});