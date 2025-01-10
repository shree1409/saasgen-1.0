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

    // Enhanced system prompt to ensure detailed tech stack and timeline
    const systemPrompt = `You are a website idea generator that creates unique, actionable website concepts based on user inputs. You must ALWAYS provide detailed technical specifications and timelines, even for no-code solutions. Your response must be valid JSON with this exact structure:
    {
      "websiteName": "Name of the website",
      "description": "2-3 sentence description",
      "keyFeatures": ["feature1", "feature2", "feature3"],
      "monetizationStrategy": [
        "Detailed monetization strategy 1 with implementation approach",
        "Detailed monetization strategy 2 with pricing suggestions",
        "Detailed monetization strategy 3 with market validation"
      ],
      "techStack": "Detailed, comma-separated list of specific technologies. For no-code, list specific no-code platforms and tools. For code, list frontend, backend, database technologies.",
      "timelineBreakdown": "Detailed week-by-week breakdown of development phases with specific milestones and deliverables. Must include at least 3 distinct phases.",
      "marketPotential": "Comprehensive market analysis with target audience, competition, and growth potential"
    }

    Rules:
    1. NEVER return empty or "not specified" values
    2. For no-code users, recommend specific no-code platforms (e.g., Webflow, Bubble, Airtable)
    3. For developers, recommend specific frameworks and tools
    4. Always provide a detailed timeline with concrete milestones
    5. Timeline must match the user's target completion time`;

    const userPrompt = `Generate a detailed website idea with these parameters:
    - No-code experience: ${noCodeKnowledge}
    - Coding experience: ${codingKnowledge}
    - Timeline: ${targetMonths} months
    - Target monthly revenue: $${revenue}
    - Preferred niche: ${niche || 'Open to suggestions'}
    - Additional preferences: ${preferences || 'None specified'}
    
    Requirements:
    1. For techStack: ${codingKnowledge === 'None' ? 
      'Provide specific no-code tools and platforms that match the project needs' : 
      'Provide specific coding technologies that match the user\'s experience level'}
    2. For timelineBreakdown: Create a detailed ${targetMonths}-month plan with weekly milestones
    3. For monetizationStrategy: Include 3 detailed strategies with implementation details
    4. Ensure all suggestions are realistic for the user's skill level and timeline
    
    The response must be immediately actionable with no placeholder or "not specified" values.`;

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

    let parsedIdea;
    try {
      parsedIdea = JSON.parse(generatedContent);
      
      // Validate that no fields are empty or contain "not specified"
      const requiredFields = ['websiteName', 'description', 'keyFeatures', 'monetizationStrategy', 'techStack', 'timelineBreakdown', 'marketPotential'];
      for (const field of requiredFields) {
        if (!parsedIdea[field] || 
            parsedIdea[field] === '' || 
            parsedIdea[field].includes('not specified') ||
            (Array.isArray(parsedIdea[field]) && parsedIdea[field].length === 0)) {
          throw new Error(`Invalid or empty field: ${field}`);
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