import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  MessageCircle, 
  Star, 
  MapPin, 
  Calendar, 
  Package, 
  TrendingUp, 
  Shield, 
  Clock,
  Search,
  Grid,
  List,
  Eye,
  Sparkles
} from "lucide-react";
import { mockProducts, mockSellers } from "@/data/mockData";

const SellerPage = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (sellerId && mockSellers[sellerId as keyof typeof mockSellers]) {
      const sellerData = mockSellers[sellerId as keyof typeof mockSellers];
      setSeller(sellerData);
      
      // Filtrar produtos do vendedor
      const sellerProducts = mockProducts.filter(product => product.sellerId === sellerId);
      setProducts(sellerProducts);
    } else {
      navigate('/');
    }
  }, [sellerId, navigate]);

  const filteredProducts = products.filter(product =>
    searchTerm === '' || 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSeller = () => {
    const message = `Olá ${seller.name}! Tenho interesse em seus produtos.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!seller) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-white/60">Carregando vendedor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <nav className="bg-black/10 backdrop-blur-xl border-b border-white/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-white/80 hover:text-white hover:bg-white/5"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Link to="/" className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-orange-400" />
                <span className="font-light text-white text-xl">Catalogin</span>
              </Link>
            </div>
            
            <Button
              onClick={handleContactSeller}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Contatar Vendedor
            </Button>
          </div>
        </div>
      </nav>

      {/* Banner do Vendedor */}
      <section className="relative h-80 overflow-hidden">
        <img
          src={seller.banner}
          alt={seller.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-end gap-6">
              <img
                src={seller.logo}
                alt={seller.name}
                className="w-24 h-24 rounded-2xl border-4 border-white/20 shadow-xl"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-light text-white">{seller.name}</h1>
                  {seller.verified && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Verificado
                    </Badge>
                  )}
                </div>
                
                <p className="text-xl text-white/80 mb-4">{seller.description}</p>
                
                <div className="flex items-center gap-6 text-white/70">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-white">{seller.rating}</span>
                    <span>({seller.totalReviews.toLocaleString()} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Desde {new Date(seller.joinedDate).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar com informações do vendedor */}
          <div className="lg:col-span-1 space-y-6">
            {/* Estatísticas */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Estatísticas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Produtos</span>
                    <span className="text-white font-medium">{seller.totalProducts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Vendas</span>
                    <span className="text-white font-medium">{seller.totalSales.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Resposta</span>
                    <span className="text-white font-medium">{seller.responseTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sobre o Vendedor */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Sobre</h3>
                <p className="text-white/70 text-sm leading-relaxed">{seller.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Categorias */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Categorias</h3>
                <div className="flex flex-wrap gap-2">
                  {seller.categories.map((category: string) => (
                    <Badge 
                      key={category}
                      variant="outline" 
                      className="border-white/20 text-white/70 bg-white/5"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Políticas */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-white mb-4">Políticas</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-white/60 mb-1">Entrega</div>
                    <div className="text-white/80">{seller.policies.shipping}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Devolução</div>
                    <div className="text-white/80">{seller.policies.returns}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">Garantia</div>
                    <div className="text-white/80">{seller.policies.warranty}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Produtos do Vendedor */}
          <div className="lg:col-span-3 space-y-8">
            {/* Busca e Controles */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-orange-400/50"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-white/60 text-sm">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
                </span>
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
            </div>

            {/* Grid de Produtos */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
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
                            <Badge className="bg-green-400/10 text-green-400 border-green-400/20 rounded-full text-xs">
                              {product.condition}
                            </Badge>
                          </div>
                          
                          <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${product.id}`);
                            }}
                            variant="outline"
                            className="flex-1 border-white/20 text-white hover:bg-white/5 rounded-xl"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </Button>
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const message = `Olá! Tenho interesse no produto: ${product.name} (${product.code})`;
                              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl"
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Contatar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-8xl mb-8 opacity-20">📦</div>
                <h3 className="text-3xl font-light text-white mb-4">Nenhum produto encontrado</h3>
                <p className="text-white/60 text-lg">
                  {searchTerm ? 'Tente ajustar sua busca' : 'Este vendedor ainda não possui produtos'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;