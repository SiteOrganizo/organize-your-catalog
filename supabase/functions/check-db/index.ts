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

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ⚠️ Teste se a service_role está funcionando de verdade
  try {
    const { users, error: authError } = await supabase.auth.admin.listUsers({ limit: 1 });
    if (authError) throw new Error("Service role não tem permissão admin: " + authError.message);
  } catch (e) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Permissão inválida (service role?) → " + e.message,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }

  // Agora tente buscar as categorias
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .limit(5);

  if (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      ok: true,
      data,
      count: data?.length || 0,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    }
  );
});