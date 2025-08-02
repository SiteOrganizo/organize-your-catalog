import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, MessageCircle, User, LogIn, ArrowRight, Sparkles, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockProducts } from "@/data/mockData";

const Index = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categorias únicas dos produtos
  const mockCategories = Array.from(
    new Set(mockProducts.map(product => product.category))
  ).map(category => ({
    name: category,
    count: mockProducts.filter(product => product.category === category).length,
    icon: getCategoryIcon(category)
  }));

  function getCategoryIcon(category: string) {
    const icons: { [key: string]: string } = {
      "Technology": "💻",
      "Mobile": "📱", 
      "Audio": "🎧",
      "Photography": "📸",
      "Tablets": "📱",
      "Wearables": "⌚",
      "Automotive": "🚗",
      "Energy": "⚡"
    };
    return icons[category] || "📦";
  }

  // Função para embaralhar e selecionar produtos aleatórios
  const getRandomProducts = (products: any[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Produtos rotativos - 6 aleatórios a cada carregamento
  const [displayProducts] = useState(() => getRandomProducts(mockProducts, 6));

  // Filtrar produtos exibidos baseado na busca e categoria
  const filteredProducts = displayProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleContactSeller = (product: any) => {
    const message = `Olá! Tenho interesse no produto: ${product.name} (${product.code})`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleRefreshProducts = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header Navigation - Minimal & Elegant */}
      <nav className="bg-black/10 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="group flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-light text-white text-2xl tracking-wide">Catalogin</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/5 border-0">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg">
                  <User className="mr-2 h-4 w-4" />
                  Criar Loja
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimalist */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-extralight mb-8 text-white tracking-tight">
              Catalogin
            </h1>
            <p className="text-2xl font-light text-slate-300 mb-4 max-w-3xl mx-auto">
              Marketplace premium para produtos excepcionais
            </p>
            <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">
              Descubra itens únicos selecionados por curadores especializados
            </p>
          </div>

          {/* Elegant Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 animate-scale-in">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Buscar produtos exclusivos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-14 h-16 text-lg bg-white/5 border-white/10 backdrop-blur-xl text-white placeholder:text-slate-400 focus:border-orange-400/50 focus:ring-orange-400/20 rounded-2xl"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center mb-8">
            <div>
              <div className="text-3xl font-light text-white mb-2">6</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Produtos em destaque</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white mb-2">{mockCategories.length}</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Categorias</div>
            </div>
            <div>
              <div className="text-3xl font-light text-white mb-2">24h</div>
              <div className="text-sm text-slate-400 uppercase tracking-wide">Suporte</div>
            </div>
          </div>

          {/* Botão para novos produtos */}
          <div className="flex gap-4">
            <Button
              onClick={handleRefreshProducts}
              variant="outline"
              className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
            >
              Ver novos produtos
            </Button>
            <Button
              onClick={() => navigate('/catalog')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Ver catálogo completo
            </Button>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque - Sempre mostra os 6 rotativos */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-slate-400 mb-6">6 produtos selecionados especialmente para você</p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto"></div>
          </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group bg-white/3 backdrop-blur-xl border border-white/10 hover:border-orange-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] rounded-3xl overflow-hidden cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-black/20 backdrop-blur-sm text-white border border-white/20 rounded-full px-3 py-1">
                          {product.code}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-6">
                        <div className="flex items-center gap-1 text-white/80 text-sm">
                          <Eye className="h-3 w-3" />
                          <span>Ver detalhes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-medium text-xl text-white group-hover:text-orange-400 transition-colors leading-tight">
                          {product.name}
                        </h3>
                        <span className="text-2xl font-light text-orange-400 ml-4">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      <div className="flex gap-3 mb-6">
                        <Badge variant="outline" className="border-white/20 text-white/70 bg-white/5 rounded-full">
                          {product.category}
                        </Badge>
                        <Badge variant="secondary" className="bg-orange-400/10 text-orange-400 border-orange-400/20 rounded-full">
                          {product.seller}
                        </Badge>
                      </div>
                      
                      <p className="text-slate-300 text-sm mb-6 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactSeller(product);
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl h-12 group/btn"
                      >
                        <MessageCircle className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        Entrar em Contato
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* Categories Section - Refined */}
      <section className="py-24 px-6 bg-white/[0.02] backdrop-blur-3xl">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-4">
              Explore por Categoria
            </h2>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <button
              onClick={() => setSelectedCategory('')}
              className={`group p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                selectedCategory === '' 
                  ? 'border-orange-400/50 bg-orange-400/10 text-orange-400' 
                  : 'border-white/10 bg-white/5 text-white hover:border-orange-400/30 hover:bg-orange-400/5'
              }`}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🏪</div>
                <div className="font-medium text-lg mb-2">Todos</div>
                <div className="text-sm opacity-60">{mockProducts.length} itens</div>
              </div>
            </button>
            
            {mockCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`group p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.name 
                    ? 'border-orange-400/50 bg-orange-400/10 text-orange-400' 
                    : 'border-white/10 bg-white/5 text-white hover:border-orange-400/30 hover:bg-orange-400/5'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <div className="font-medium text-lg mb-2">{category.name}</div>
                  <div className="text-sm opacity-60">{category.count} itens</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-light text-white mb-2">
                {selectedCategory ? selectedCategory : 'Catálogo Completo'}
              </h2>
              <p className="text-slate-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'} {selectedCategory ? `em ${selectedCategory}` : 'disponíveis'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-orange-500 hover:bg-orange-600' : 'text-white/60 hover:text-white'}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-orange-500 hover:bg-orange-600' : 'text-white/60 hover:text-white'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id}
                  className={`group bg-white/3 backdrop-blur-xl border border-white/10 hover:border-orange-400/30 transition-all duration-500 hover:transform hover:scale-[1.02] rounded-3xl overflow-hidden cursor-pointer ${
                    viewMode === 'list' ? 'flex flex-row h-48' : ''
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <CardContent className={`p-0 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' 
                        ? 'w-64 h-48 flex-shrink-0' 
                        : 'h-64'
                    }`}>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black/20 backdrop-blur-sm text-white border border-white/20 rounded-full">
                          {product.code}
                        </Badge>
                      </div>
                      {viewMode === 'grid' && (
                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-1 text-white/80 text-sm">
                            <Eye className="h-3 w-3" />
                            <span>Ver detalhes</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-medium text-lg text-white group-hover:text-orange-400 transition-colors">
                            {product.name}
                          </h3>
                          <span className="text-xl font-light text-orange-400 ml-4">
                            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          <Badge variant="outline" className="border-white/20 text-white/70 bg-white/5 rounded-full text-xs">
                            {product.category}
                          </Badge>
                          <Badge variant="secondary" className="bg-orange-400/10 text-orange-400 border-orange-400/20 rounded-full text-xs">
                            {product.seller}
                          </Badge>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-4 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContactSeller(product);
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl h-11 group/btn"
                      >
                        <MessageCircle className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                        Contatar
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="text-8xl mb-8 opacity-20">🔍</div>
              <h3 className="text-3xl font-light text-white mb-4">Nenhum produto encontrado</h3>
              <p className="text-slate-400 text-lg">Tente ajustar sua busca ou explorar outras categorias</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-black/20 border-t border-white/5 py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-orange-400" />
            <h3 className="text-2xl font-light text-white">Catalogin</h3>
          </div>
          <p className="text-slate-400 mb-8 text-lg">Marketplace premium para produtos excepcionais</p>
          
          <div className="flex justify-center gap-8 text-slate-400 mb-8">
            <Link to="/sobre" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Sobre</Link>
            <Link to="/contato" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Contato</Link>
            <Link to="/termos" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Termos</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors text-sm uppercase tracking-wide">Privacidade</Link>
          </div>
          
          <div className="pt-8 border-t border-white/5 text-slate-500 text-sm">
            © 2024 Catalogin. Crafted with precision.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;