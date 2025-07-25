import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, ExternalLink } from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  customFields: Record<string, any>;
  images: string[];
}

export const PublicCatalogPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [storeInfo] = useState({
    name: "Loja Exemplo",
    logo: "",
    greeting: "Bem-vindo ao nosso catálogo! Confira nossos produtos selecionados especialmente para você."
  });

  useEffect(() => {
    const codes = searchParams.get('codes')?.split(',') || [];
    
    // Simular busca de produtos por códigos
    // Em produção, seria uma consulta real ao banco de dados
    const mockProducts: Product[] = [
      {
        id: "1",
        code: "ORG123456",
        name: "Apartamento Cobertura",
        description: "Cobertura duplex com vista para o mar, 3 quartos, 2 vagas, área gourmet completa.",
        price: 850000,
        category: "Imóveis",
        customFields: {
          property_type: "Cobertura",
          purpose: "Venda",
          bedrooms: "3",
          bathrooms: "2",
          parking_spots: "2",
          area: "120"
        },
        images: ["/placeholder.svg"]
      }
    ];

    // Filtrar produtos pelos códigos solicitados
    const filteredProducts = mockProducts.filter(product => 
      codes.some(code => product.code.includes(code))
    );
    
    setProducts(filteredProducts);
  }, [searchParams]);

  const formatCustomField = (key: string, value: any) => {
    const fieldLabels: Record<string, string> = {
      property_type: "Tipo",
      purpose: "Finalidade", 
      bedrooms: "Quartos",
      bathrooms: "Banheiros",
      parking_spots: "Vagas",
      area: "Área (m²)",
      brand: "Marca",
      model: "Modelo",
      year: "Ano",
      condition: "Estado",
      size: "Tamanho",
      color: "Cor",
      material: "Material"
    };

    return {
      label: fieldLabels[key] || key,
      value: value
    };
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header da Loja */}
      <div className="bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              {storeInfo.logo ? (
                <img src={storeInfo.logo} alt="Logo" className="h-16 w-16 rounded-lg" />
              ) : (
                <Package className="h-16 w-16 text-primary" />
              )}
              <h1 className="text-3xl font-bold text-foreground">{storeInfo.name}</h1>
            </div>
            {storeInfo.greeting && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {storeInfo.greeting}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground">
              Verifique se os códigos estão corretos ou entre em contato conosco.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Produtos Selecionados ({products.length})
            </h2>
            
            <div className="grid gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden shadow-medium">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-3 gap-0">
                      {/* Imagem */}
                      <div className="md:col-span-1">
                        <div className="aspect-square bg-muted flex items-center justify-center">
                          {product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="h-12 w-12 text-muted-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Informações */}
                      <div className="md:col-span-2 p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <Badge variant="secondary" className="mb-2">
                                {product.category}
                              </Badge>
                              <h3 className="text-xl font-bold text-foreground">
                                {product.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Código: {product.code}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">
                                R$ {product.price.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {product.description && (
                            <p className="text-muted-foreground">
                              {product.description}
                            </p>
                          )}

                          {/* Campos personalizados */}
                          {Object.keys(product.customFields).length > 0 && (
                            <div>
                              <Separator className="mb-3" />
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {Object.entries(product.customFields).map(([key, value]) => {
                                  if (!value) return null;
                                  const field = formatCustomField(key, value);
                                  return (
                                    <div key={key} className="text-sm">
                                      <span className="font-medium text-foreground">
                                        {field.label}:
                                      </span>
                                      <span className="text-muted-foreground ml-1">
                                        {field.value}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Rodapé do Organizo */}
      <div className="bg-muted/50 border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-primary">Organizo</span>
            </div>
            <p className="text-muted-foreground">
              Catálogo gerado com Organizo – Crie o seu gratuitamente.
            </p>
            <Button 
              className="bg-primary hover:bg-primary-hover"
              onClick={() => window.open('/', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Quero criar meu catálogo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};