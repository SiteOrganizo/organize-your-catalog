import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export default function TestDB() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testDatabase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-db');
      
      if (error) {
        setResult({ ok: false, error: error.message });
      } else {
        setResult(data);
      }
    } catch (err) {
      setResult({ ok: false, error: 'Erro na chamada da função' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Conexão com Database</CardTitle>
          <CardDescription>
            Testa a edge function check-db para verificar a conexão com Supabase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testDatabase} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Testando..." : "Testar Conexão"}
          </Button>

          {result && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Resultado
                  <Badge variant={result.ok ? "default" : "destructive"}>
                    {result.ok ? "Sucesso" : "Erro"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}