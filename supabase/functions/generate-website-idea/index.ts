import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const { noCodeKnowledge, codingKnowledge, targetMonths, revenue, niche, preferences, subscriptionTier } = await req.json();

    console.log('Received inputs:', { noCodeKnowledge, codingKnowledge, targetMonths, revenue, niche, preferences, subscriptionTier });

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
    - Subscription tier: ${subscriptionTier}
    
    Consider the user's experience level when suggesting the tech stack and timeline. The idea should be realistic for their skills and timeline.
    ${subscriptionTier === 'basic' ? 'Focus on basic features and monetization strategies.' : ''}
    ${subscriptionTier === 'advanced' ? 'Include detailed technical implementation and development timeline.' : ''}
    ${subscriptionTier === 'pro' ? 'Include comprehensive market analysis and detailed technical implementation.' : ''}`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
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

    let parsedIdea;
    try {
      parsedIdea = JSON.parse(generatedContent);
      
      const requiredFields = ['websiteName', 'description', 'keyFeatures', 'monetizationStrategy', 'techStack', 'timelineBreakdown', 'marketPotential'];
      for (const field of requiredFields) {
        if (!parsedIdea[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Create Supabase client
      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Get user from authorization header
      const authHeader = req.headers.get('Authorization')!;
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabaseClient.auth.getUser(token);

      if (!user) {
        throw new Error('User not authenticated');
      }

      // Save the generated idea to the database
      const { error: insertError } = await supabaseClient
        .from('generated_ideas')
        .insert({
          user_id: user.id,
          title: parsedIdea.websiteName,
          description: parsedIdea.description,
          features: parsedIdea.keyFeatures,
          tech_stack: parsedIdea.techStack,
          timeline_breakdown: parsedIdea.timelineBreakdown,
          market_potential: parsedIdea.marketPotential,
          monetization_strategies: parsedIdea.monetizationStrategy,
          subscription_tier: subscriptionTier
        });

      if (insertError) {
        console.error('Error saving idea:', insertError);
        throw new Error('Failed to save generated idea');
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