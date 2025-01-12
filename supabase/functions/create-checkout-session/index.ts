import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  try {
    const { priceId, returnUrl } = await req.json()
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)

    if (userError || !user?.email) {
      throw new Error('Authentication required')
    }

    console.log('Creating checkout session for user:', user.email)

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    })

    const { data: customers } = await stripe.customers.list({
      email: user.email,
      limit: 1
    })

    let customerId = undefined
    if (customers.length > 0) {
      customerId = customers[0].id
      // Check if already subscribed to this price
      const { data: subscriptions } = await stripe.subscriptions.list({
        customer: customers[0].id,
        price: priceId,
        status: 'active',
        limit: 1
      })

      if (subscriptions.length > 0) {
        throw new Error("You are already subscribed to this plan")
      }
    }

    console.log('Creating checkout session...')
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: returnUrl || `${req.headers.get('origin')}/generator`,
      cancel_url: `${req.headers.get('origin')}/pricing`,
      allow_promotion_codes: true,
    })

    console.log('Checkout session created:', session.id)
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})