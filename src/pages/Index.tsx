import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, MessageCircle, User, LogIn, ArrowRight, Sparkles, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select(`
        *,
        categories (name),
        profiles (display_name)
      `)
      .eq('is_public', true);
    
    if (data) {
      setProducts(data);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*');
    
    if (data) {
      setCategories(data.map(cat => ({
        name: cat.name,
        count: products.filter(p => p.categories?.name === cat.name).length,
        icon: getCategoryIcon(cat.name)
      })));
    }
  };

  function getCategoryIcon(category: string) {
    const icons: { [key: string]: string } = {
      "Technology": "💻",
      "Mobile": "📱", 
      "Audio": "🎧",
      "Photography": "📸",
      "Tablets": "📱",
      "Wearables": "⌚",
      "Automotive": "🚗",
      "Energy": "⚡",
      "Imóveis": "🏠"
    };
    return icons[category] || "📦";
  }

  // Produtos filtrados
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.categories?.name === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleContactSeller = (userId: string, productName: string) => {
    const message = `Olá! Tenho interesse no produto: ${productName}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const ProductCard = ({ product, onContact }: { product: any; onContact?: (userId: string, productName: string) => void }) => (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-slate-50 rounded-lg">
          <img 
            src={product.images?.[0] || "/placeholder.svg"} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-black/10 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye className="h-4 w-4 text-white" />
          </div>
          {product.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white">
                <Sparkles className="h-3 w-3 mr-1" />
                Destaque
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
            <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {product.categories?.name || "Sem categoria"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-slate-900">
                R$ {Number(product.price).toFixed(2)}
              </div>
              <div className="text-xs text-slate-500">
                por {product.profiles?.display_name || "Vendedor"}
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-lg"
              onClick={() => onContact?.(product.user_id, product.name)}
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Marketplace Inteligente
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Encontre os melhores
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  produtos locais
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Conecte-se diretamente com vendedores da sua região e descubra produtos únicos com qualidade garantida.
              </p>
            </div>
            
            <div className="flex items-center gap-4 justify-center">
              <div className="text-center">
                <div className="text-3xl font-light text-white mb-2">{filteredProducts.length}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">Produtos em destaque</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">{categories.length}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">Categorias</div>
              </div>
              <div>
                <div className="text-3xl font-light text-white mb-2">5+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wide">Cidades</div>
              </div>
            </div>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Buscar produtos, categorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-slate-300 rounded-xl"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                💻 Technology
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                📱 Mobile
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                🎧 Audio
              </Button>
              <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                🏠 Imóveis
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Busca Avançada</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-4">Categorias</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-emerald-50 text-emerald-600 font-medium' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Todas as categorias</span>
                    <span className="text-sm text-slate-400">{products.length}</span>
                  </div>
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.name 
                        ? 'bg-emerald-50 text-emerald-600 font-medium' 
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.name}
                      </span>
                      <span className="text-sm text-slate-400">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <h4 className="font-semibold text-slate-900">Contato Direto</h4>
                <p className="text-sm text-slate-600">
                  Entre em contato diretamente com os vendedores via WhatsApp
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Categorias em Destaque</h2>
                <p className="text-slate-600">Explore nossos produtos por categoria</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`group p-6 rounded-xl border-2 transition-all ${
                  selectedCategory === 'all'
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-200 hover:border-emerald-200 bg-white hover:shadow-lg'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🏪</div>
                  <div className="font-medium text-lg mb-2">Todos</div>
                  <div className="text-sm opacity-60">{products.length} itens</div>
                </div>
              </button>
              
              {categories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`group p-6 rounded-xl border-2 transition-all ${
                    selectedCategory === category.name
                      ? 'border-emerald-200 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-200 bg-white hover:shadow-lg'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <div className="font-medium text-lg mb-2">{category.name}</div>
                    <div className="text-sm opacity-60">{category.count} itens</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                {selectedCategory === 'all' ? 'Todos os Produtos' : selectedCategory}
              </h3>
              <div className="text-sm text-slate-500">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onContact={handleContactSeller}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-slate-600 mb-6">
                  Tente ajustar sua busca ou selecionar uma categoria diferente
                </p>
                <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-xl">Catalogin</h4>
              <p className="text-slate-300">
                Conectando compradores e vendedores locais através de catálogos digitais inteligentes.
              </p>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Navegação</h5>
              <div className="space-y-2">
                <Link to="/" className="block text-slate-300 hover:text-white transition-colors">
                  Início
                </Link>
                <Link to="/marketplace" className="block text-slate-300 hover:text-white transition-colors">
                  Marketplace
                </Link>
                <Link to="/dashboard" className="block text-slate-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Para Vendedores</h5>
              <div className="space-y-2">
                <Link to="/dashboard/products" className="block text-slate-300 hover:text-white transition-colors">
                  Meus Produtos
                </Link>
                <Link to="/dashboard/send" className="block text-slate-300 hover:text-white transition-colors">
                  Enviar Catálogo
                </Link>
                <Link to="/dashboard/store" className="block text-slate-300 hover:text-white transition-colors">
                  Minha Loja
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h5 className="font-semibold">Suporte</h5>
              <div className="space-y-2">
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Central de Ajuda
                </a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Contato
                </a>
                <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Catalogin. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;