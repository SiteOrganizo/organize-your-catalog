import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List, MessageCircle, User, LogIn } from "lucide-react";

// Dados mockados para demonstração
const mockProducts = [
  {
    id: "1",
    code: "PROD001",
    name: "Smartphone Galaxy S24",
    price: 2899.99,
    description: "Último modelo com câmera profissional e 5G",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"],
    category: "Eletrônicos",
    seller: "TechStore"
  },
  {
    id: "2", 
    code: "PROD002",
    name: "Notebook Dell Inspiron",
    price: 3499.99,
    description: "Intel i7, 16GB RAM, SSD 512GB",
    images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"],
    category: "Informática",
    seller: "CompuWorld"
  },
  {
    id: "3",
    code: "PROD003", 
    name: "Smart TV 55\" 4K",
    price: 2199.99,
    description: "Android TV com HDR e Dolby Vision",
    images: ["https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop"],
    category: "Eletrônicos",
    seller: "ElectroMax"
  },
  {
    id: "4",
    code: "PROD004",
    name: "Fone Bluetooth Premium",
    price: 299.99,
    description: "Cancelamento de ruído ativo",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"],
    category: "Áudio",
    seller: "SoundTech"
  },
  {
    id: "5",
    code: "PROD005",
    name: "Câmera DSLR Canon",
    price: 4599.99,
    description: "24MP com lente 18-55mm incluída",
    images: ["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop"],
    category: "Fotografia",
    seller: "FotoPlus"
  },
  {
    id: "6",
    code: "PROD006",
    name: "Tablet iPad Air",
    price: 3899.99,
    description: "Chip M1, 256GB, Wi-Fi + Cellular",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"],
    category: "Tablets",
    seller: "AppleStore"
  }
];

const mockCategories = [
  { name: "Eletrônicos", count: 15 },
  { name: "Informática", count: 8 },
  { name: "Áudio", count: 12 },
  { name: "Fotografia", count: 6 },
  { name: "Tablets", count: 4 },
  { name: "Celulares", count: 20 }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar produtos baseado na busca e categoria
  const filteredProducts = mockProducts.filter(product => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Navigation */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-bold text-orange-400 text-2xl">Catalogin</span>
              <span className="text-white/80 text-sm">Marketplace</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <User className="mr-2 h-4 w-4" />
                  Criar Loja
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 text-white">
            Catalogin
            <span className="block text-3xl font-normal text-orange-400 mt-2 italic">
              Marketplace Digital
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
                <div className="text-xs opacity-70">{mockProducts.length}</div>
              </div>
            </button>
            
            {mockCategories.map((category) => (
              <button
                key={category.name}
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
                  <div className="text-xs opacity-70">{category.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory ? `${selectedCategory}` : 'Todos os Produtos'}
              <span className="text-lg font-normal text-gray-400 ml-2">
                ({filteredProducts.length} produtos)
              </span>
            </h2>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="border-white/20"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="border-white/20"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <Card 
                  key={product.id}
                  className="group bg-white/5 border-white/10 hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-orange-500 text-white border-0">
                          {product.code}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-xl font-bold text-orange-400">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="border-white/20 text-white/80">
                          {product.category}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/10 text-white/90">
                          {product.seller}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <Button 
                        onClick={() => handleContactSeller(product)}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Entrar em Contato
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-400">Tente ajustar sua busca ou filtros</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 py-12 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Catalogin</h3>
          <p className="text-gray-400 mb-6">Conectando vendedores e compradores</p>
          
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <Link to="/sobre" className="hover:text-white transition-colors">Sobre</Link>
            <Link to="/contato" className="hover:text-white transition-colors">Contato</Link>
            <Link to="/termos" className="hover:text-white transition-colors">Termos</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-gray-500 text-sm">
            © 2024 Catalogin. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;