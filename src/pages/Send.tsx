import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Link, FileText, MessageCircle, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const SendPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [catalogData, setCatalogData] = useState({
    title: "Catálogo da Minha Loja",
    message: "Confira nossos produtos em destaque!",
    selectedProducts: "",
    customerName: "",
    customerPhone: ""
  });

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_public', true);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleGenerateLink = () => {
    const codes = catalogData.selectedProducts.split(',').map(code => code.trim()).filter(code => code);
    
    if (codes.length === 0) {
      toast({
        title: "Erro",
        description: "Informe os códigos dos produtos para gerar o link.",
        variant: "destructive"
      });
      return;
    }

    const baseUrl = window.location.origin;
    const catalogUrl = `${baseUrl}/catalog?codes=${codes.join(',')}`;
    
    navigator.clipboard.writeText(catalogUrl);
    
    toast({
      title: "Link gerado!",
      description: "Link do catálogo copiado para a área de transferência.",
    });
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF gerado!",
      description: "O catálogo em PDF foi criado com sucesso.",
    });
  };

  const handleSendWhatsApp = () => {
    if (!catalogData.customerPhone) {
      toast({
        title: "Erro",
        description: "Informe o número do WhatsApp do cliente.",
        variant: "destructive"
      });
      return;
    }

    const codes = catalogData.selectedProducts.split(',').map(code => code.trim()).filter(code => code);
    
    if (codes.length === 0) {
      toast({
        title: "Erro",
        description: "Informe os códigos dos produtos para enviar.",
        variant: "destructive"
      });
      return;
    }

    const baseUrl = window.location.origin;
    const catalogUrl = `${baseUrl}/catalog?codes=${codes.join(',')}`;
    const message = `${catalogData.message}\n\nConfira nosso catálogo: ${catalogUrl}`;
    const whatsappUrl = `https://wa.me/${catalogData.customerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp aberto!",
      description: `Mensagem preparada para ${catalogData.customerName || catalogData.customerPhone}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Enviar Catálogo</h1>
          <p className="text-muted-foreground">
            Gere e compartilhe catálogos personalizados com seus clientes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Configurar Catálogo
                </CardTitle>
                <CardDescription>
                  Personalize as informações do seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título do Catálogo</Label>
                  <Input
                    id="title"
                    value={catalogData.title}
                    onChange={(e) => setCatalogData({ ...catalogData, title: e.target.value })}
                    placeholder="Ex: Catálogo Primavera 2024"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Mensagem de Apresentação</Label>
                  <Textarea
                    id="message"
                    value={catalogData.message}
                    onChange={(e) => setCatalogData({ ...catalogData, message: e.target.value })}
                    placeholder="Digite uma mensagem para acompanhar o catálogo..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="products">Códigos dos Produtos</Label>
                  <Textarea
                    id="products"
                    value={catalogData.selectedProducts}
                    onChange={(e) => setCatalogData({ ...catalogData, selectedProducts: e.target.value })}
                    placeholder="Digite os códigos dos produtos separados por vírgula"
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Ex: {products.slice(0, 3).map(p => p.code).join(', ')}
                  </p>
                  
                  {products.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Produtos disponíveis:</p>
                      <div className="flex flex-wrap gap-2">
                        {products.map((product) => (
                          <Button
                            key={product.id}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const codes = catalogData.selectedProducts.split(',').map(c => c.trim()).filter(c => c);
                              if (!codes.includes(product.code)) {
                                setCatalogData({
                                  ...catalogData,
                                  selectedProducts: codes.length > 0 ? `${catalogData.selectedProducts}, ${product.code}` : product.code
                                });
                              }
                            }}
                          >
                            {product.code} - {product.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
                <CardDescription>
                  Para envio direto por WhatsApp (opcional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Nome do Cliente</Label>
                  <Input
                    id="customerName"
                    value={catalogData.customerName}
                    onChange={(e) => setCatalogData({ ...catalogData, customerName: e.target.value })}
                    placeholder="Digite o nome do cliente"
                  />
                </div>

                <div>
                  <Label htmlFor="customerPhone">WhatsApp do Cliente</Label>
                  <Input
                    id="customerPhone"
                    value={catalogData.customerPhone}
                    onChange={(e) => setCatalogData({ ...catalogData, customerPhone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Prévia do Catálogo
                </CardTitle>
                <CardDescription>
                  Visualize como ficará o catálogo para o cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border border-muted rounded-lg p-6 space-y-4 bg-card">
                  <div className="text-center border-b pb-4">
                    <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-2"></div>
                    <h3 className="font-bold text-lg">Minha Loja</h3>
                    <p className="text-muted-foreground text-sm">{catalogData.title}</p>
                  </div>

                  {catalogData.message && (
                    <div className="bg-accent p-3 rounded-lg">
                      <p className="text-sm">{catalogData.message}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="border border-muted rounded p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded"></div>
                        <div>
                          <h4 className="font-medium text-sm">Produto Exemplo</h4>
                          <p className="text-xs text-muted-foreground">Código: ORG123456</p>
                          <p className="text-sm font-bold text-primary">R$ 99,90</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Catálogo gerado com <span className="font-medium text-primary">Catalogin</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações do Catálogo</CardTitle>
                <CardDescription>
                  Escolha como compartilhar seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleGenerateLink} variant="outline" className="w-full gap-2">
                  <Link className="h-4 w-4" />
                  Gerar Link Compartilhável
                </Button>

                <Button onClick={handleGeneratePDF} variant="outline" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Baixar PDF
                </Button>

                <Button onClick={handleSendWhatsApp} className="w-full gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Enviar por WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};