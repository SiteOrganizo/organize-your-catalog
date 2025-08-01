import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid, List, Phone, MessageCircle, Star, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";

interface Product {
  id: string;
  code: string;
  name: string;
  price: number | null;
  description: string | null;
  images: string[];
  user_id: string;
  category_id: string | null;
  categories?: {
    name: string;
  } | null;
  profiles?: {
    display_name: string | null;
  } | null;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  _count?: {
    products: number;
  };
}

export const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, description')
        .order('name');

      if (error) throw error;
      
      // Get product count for each category
      const categoriesWithCount = await Promise.all(
        (data || []).map(async (category) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id)
            .eq('is_public', true);
          
          return {
            ...category,
            _count: { products: count || 0 }
          };
        })
      );
      
      setCategories(categoriesWithCount);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar categorias",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id, code, name, price, description, images, user_id, category_id,
          categories (name)
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      const productsWithProfiles = await Promise.all(
        (data || []).map(async (product) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('user_id', product.user_id)
            .single();
          
          return {
            ...product,
            profiles: profile
          };
        })
      );
      
      setFeaturedProducts(productsWithProfiles);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos em destaque",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('products')
        .select(`
          id, code, name, price, description, images, user_id, category_id,
          categories (name)
        `)
        .eq('is_public', true);

      if (selectedCategory) {
        const category = categories.find(c => c.name === selectedCategory);
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      
      const productsWithProfiles = await Promise.all(
        (data || []).map(async (product) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name')
            .eq('user_id', product.user_id)
            .single();
          
          return {
            ...product,
            profiles: profile
          };
        })
      );
      
      setProducts(productsWithProfiles);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, categories]);

  const handleContactSeller = (product: Product) => {
    const message = `Olá! Tenho interesse no produto: ${product.name} (${product.code})`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="h-12 bg-white/10 rounded w-80 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="h-48 bg-white/10 rounded mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-white/10 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-white">
            Catalogin
            <span className="block text-3xl font-normal text-orange-400 mt-2 italic">
              Online Marketplace
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Descubra produtos únicos de vendedores verificados.<br />
            Conectamos você aos melhores catálogos digitais do Brasil.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar produtos, categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/90 border-white/20 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Categorias de Produtos
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedCategory === '' 
                  ? 'border-orange-400 bg-orange-400/20 text-orange-400' 
                  : 'border-white/20 bg-white/5 text-white hover:border-orange-400/50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🏪</div>
                <div className="font-medium text-sm">Todos</div>
                <div className="text-xs opacity-70">{products.length}</div>
              </div>
            </button>
            
            {categories.slice(0, 11).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedCategory === category.name 
                    ? 'border-orange-400 bg-orange-400/20 text-orange-400' 
                    : 'border-white/20 bg-white/5 text-white hover:border-orange-400/50'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-medium text-sm truncate">{category.name}</div>
                  <div className="text-xs opacity-70">{category._count?.products || 0}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && !selectedCategory && !searchTerm && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Produtos em Destaque
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative h-64 overflow-hidden">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                        <span className="text-white/60 text-lg">📦</span>
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-orange-500 text-white border-0">
                        {product.code}
                      </Badge>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                        {product.name}
                      </h3>
                      {product.price && (
                        <span className="text-xl font-bold text-orange-400">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {product.categories && (
                        <Badge variant="outline" className="border-white/20 text-white/80">
                          {product.categories.name}
                        </Badge>
                      )}
                      {product.profiles?.display_name && (
                        <Badge variant="secondary" className="bg-white/10 text-white/90">
                          {product.profiles.display_name}
                        </Badge>
                      )}
                    </div>
                    
                    {product.description && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    <Button 
                      onClick={() => handleContactSeller(product)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Entrar em Contato
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory ? `${selectedCategory}` : 'Todos os Produtos'}
              <span className="text-lg font-normal text-gray-400 ml-2">
                ({products.length} produtos)
              </span>
            </h2>
            
            <div className="flex items-center gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name} ({category._count?.products || 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="bg-white/10 border-white/20"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="bg-white/10 border-white/20"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-400 text-lg">
                Tente ajustar seus filtros de busca ou explore outras categorias
              </p>
              {selectedCategory && (
                <Button 
                  onClick={() => setSelectedCategory('')}
                  variant="outline"
                  className="mt-4 border-orange-400 text-orange-400 hover:bg-orange-400/20"
                >
                  Ver todos os produtos
                </Button>
              )}
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-orange-400/50 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-row' : 'hover:transform hover:scale-105'
                  }`}
                >
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : 'relative'}>
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`object-cover group-hover:scale-110 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
                        }`}
                      />
                    ) : (
                      <div className={`bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center ${
                        viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'
                      }`}>
                        <span className="text-white/60 text-lg">📦</span>
                      </div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-orange-500 text-white border-0">
                      {product.code}
                    </Badge>
                  </div>
                  
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-white group-hover:text-orange-400 transition-colors">
                          {product.name}
                        </h3>
                        {product.price && (
                          <span className="text-lg font-bold text-orange-400 ml-2">
                            R$ {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.categories && (
                          <Badge variant="outline" className="border-white/20 text-white/80">
                            {product.categories.name}
                          </Badge>
                        )}
                        {product.profiles?.display_name && (
                          <Badge variant="secondary" className="bg-white/10 text-white/90">
                            {product.profiles.display_name}
                          </Badge>
                        )}
                      </div>
                      
                      {product.description && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => handleContactSeller(product)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Entrar em Contato
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="font-bold text-orange-400 text-3xl">Catalogin</span>
              <span className="text-white/80 text-lg">Marketplace</span>
            </div>
            <p className="text-gray-400 text-lg mb-8">
              Conectando vendedores e compradores em todo o Brasil
            </p>
            
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <a href="/" className="hover:text-orange-400 transition-colors">Início</a>
              <a href="/login" className="hover:text-orange-400 transition-colors">Login</a>
              <a href="/register" className="hover:text-orange-400 transition-colors">Cadastrar Loja</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};