// Edge Function: check-db
// Função para testar conexão com Supabase usando variáveis de ambiente seguras

import { serve } from "https://deno.land/std@0.192.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Carrega as variáveis de ambiente (serão pedidas no Lovable como secrets)
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Variáveis de ambiente ausentes (SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY).",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { data, error } = await supabase.from("categories").select("*").limit(5);

    if (error) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: error.message,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({
        ok: true,
        count: data.length,
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Erro inesperado",
        details: e.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});