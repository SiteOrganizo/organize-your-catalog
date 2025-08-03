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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-slate-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Catalogin</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar produtos, marcas e muito mais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-96 bg-white text-black"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="flex items-center gap-2 hover:text-gray-300">
              <User className="h-4 w-4" />
              Entre
            </Link>
          </div>
        </div>
      </div>

      {/* Main Hero Banner */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-4">
                Até 40% off em milhares de produtos
              </h2>
              <Badge className="bg-white/20 text-white border-white/30">
                <Sparkles className="h-3 w-3 mr-1" />
                Frete GRÁTIS Prime
              </Badge>
            </div>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Ofertas melhores avaliadas</h3>
              <div className="grid grid-cols-2 gap-2">
                {filteredProducts.slice(0, 2).map((product) => (
                  <div key={product.id} className="text-center">
                    <img 
                      src={product.images?.[0] || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-16 object-cover rounded mb-1"
                    />
                    <Badge variant="destructive" className="text-xs">40% OFF</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Ofertas do Dia</h3>
              <div className="text-center">
                <div className="w-full h-20 bg-orange-200 rounded mb-2 flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <p className="text-sm">Até 40% de desconto</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <h3 className="text-lg font-semibold mb-4">Navegue pelas categorias, de A a Z</h3>
        <div className="grid grid-cols-7 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:shadow-md transition-shadow">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <span className="text-sm text-center font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Mais Vendidos em Eletrônicos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-lg p-4 mb-2 group-hover:shadow-md transition-shadow">
                  <img 
                    src={product.images?.[0] || "/placeholder.svg"} 
                    alt={product.name}
                    className="w-full h-24 object-cover rounded"
                  />
                </div>
                <h4 className="text-sm font-medium line-clamp-2 mb-1">{product.name}</h4>
                <p className="text-lg font-bold text-orange-600">R$ {Number(product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Colorful Categories Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Mais amados por categoria</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { name: "Todos em casa arrumada", icon: "🏠", color: "bg-green-400" },
              { name: "Beleza", icon: "💄", color: "bg-pink-400" },
              { name: "Casa", icon: "🏡", color: "bg-blue-400" },
              { name: "Cozinha", icon: "🍳", color: "bg-purple-400" },
              { name: "Moda", icon: "👕", color: "bg-indigo-400" },
              { name: "Eletrodomésticos", icon: "🔌", color: "bg-gray-400" },
              { name: "Esporte", icon: "⚽", color: "bg-orange-400" }
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`${cat.color} rounded-lg p-6 text-white text-center hover:opacity-90 transition-opacity`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="text-sm font-medium">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom promotional sections */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Navegue por Ambiente</h3>
              <div className="space-y-2">
                <img src="/placeholder.svg" alt="Room" className="w-full h-20 object-cover rounded" />
                <p className="text-sm">Quarto, sala, cozinha e mais</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Papelaria com Frete GRÁTIS Prime</h3>
              <div className="space-y-2">
                <img src="/placeholder.svg" alt="Stationery" className="w-full h-20 object-cover rounded" />
                <p className="text-sm">Material escolar e escritório</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Beleza com Frete GRÁTIS Prime</h3>
              <div className="space-y-2">
                <img src="/placeholder.svg" alt="Beauty" className="w-full h-20 object-cover rounded" />
                <p className="text-sm">Cuidados pessoais</p>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4">Confira Kits de Produto</h3>
              <div className="space-y-2">
                <img src="/placeholder.svg" alt="Kits" className="w-full h-20 object-cover rounded" />
                <p className="text-sm">Combos especiais</p>
              </div>
            </Card>
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