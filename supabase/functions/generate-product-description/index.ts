import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    // Input validation
    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ error: 'Content-Type must be application/json' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const body = await req.json();
    const { productName, category, price } = body;

    // Input validation
    if (!productName || typeof productName !== 'string' || productName.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'productName is required and must be a non-empty string' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (productName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'productName must be less than 100 characters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (category && (typeof category !== 'string' || category.length > 50)) {
      return new Response(
        JSON.stringify({ error: 'category must be a string with less than 50 characters' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (price && (typeof price !== 'number' || price < 0 || price > 1000000)) {
      return new Response(
        JSON.stringify({ error: 'price must be a positive number less than 1,000,000' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service temporarily unavailable' }),
        { 
          status: 503, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client for logging
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Log the API usage for security monitoring
    const authHeader = req.headers.get('authorization');
    if (authHeader) {
      try {
        const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
        if (user) {
          await supabase.rpc('log_security_event', {
            p_action: 'ai_description_generated',
            p_resource_type: 'ai_service',
            p_resource_id: productName.substring(0, 50)
          });
        }
      } catch (error) {
        console.warn('Could not log security event:', error);
      }
    }

    // Sanitize input for OpenAI prompt
    const sanitizedProductName = productName.replace(/[<>\"'&]/g, '');
    const sanitizedCategory = category ? category.replace(/[<>\"'&]/g, '') : '';

    let prompt = `Crie uma descrição profissional e atrativa para o produto "${sanitizedProductName}"`;
    
    if (sanitizedCategory) {
      prompt += ` da categoria "${sanitizedCategory}"`;
    }
    
    if (price) {
      prompt += ` com preço de R$ ${price.toFixed(2)}`;
    }
    
    prompt += `. A descrição deve ter entre 50 e 150 palavras, destacar os benefícios do produto e ser persuasiva para vendas. Use um tom profissional mas acessível.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'Você é um especialista em marketing e vendas que cria descrições de produtos atrativas e profissionais em português brasileiro.' 
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to generate description' }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenAI response format:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service' }),
        { 
          status: 502, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const generatedDescription = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ description: generatedDescription }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-product-description function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});