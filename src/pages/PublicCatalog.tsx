import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  code: string;
  name: string;
  price: number | null;
  description: string | null;
  images: string[];
  categories?: {
    name: string;
  };
}

interface Profile {
  display_name: string;
}

export const PublicCatalog = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const codes = searchParams.get('codes');
    if (codes) {
      fetchProducts(codes.split(','));
    }
  }, [searchParams]);

  const fetchProducts = async (codes: string[]) => {
    setIsLoading(true);

    try {
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            name
          )
        `)
        .in('code', codes);

      if (productsError) throw productsError;

      if (products && products.length > 0) {
        setProducts(products);

        // Buscar informações do perfil do dono dos produtos
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('user_id', products[0].user_id)
          .single();

        if (!profileError && profile) {
          setProfile(profile);
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro ao carregar catálogo",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-48 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-40 bg-muted rounded mb-4"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Catálogo não encontrado
          </h1>
          <p className="text-muted-foreground">
            Os produtos solicitados não foram encontrados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            {profile?.display_name || 'Catálogo'} - Produtos Selecionados
          </h1>
          <p className="text-muted-foreground">
            Confira nossa seleção especial de produtos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-medium hover:shadow-lg transition-shadow">
              <div className="relative">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Sem imagem</span>
                  </div>
                )}
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {product.code}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                
                {product.categories && (
                  <Badge variant="outline" className="mb-2">
                    {product.categories.name}
                  </Badge>
                )}
                
                {product.price && (
                  <p className="text-xl font-bold text-primary mb-3">
                    R$ {product.price.toFixed(2)}
                  </p>
                )}
                
                {product.description && (
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">Catálogo criado com</p>
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-primary text-lg">Catalogin</span>
            <span>- Sistema de catálogo digital versátil</span>
          </div>
          <p className="mt-2">
            Crie seu próprio catálogo em{' '}
            <a href="/" className="text-primary hover:underline">
              catalogin.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};