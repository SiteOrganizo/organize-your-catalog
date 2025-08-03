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
import { supabase } from "@/integrations/supabase/client";

const SellerPage = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchSellerData();
  }, [sellerId]);

  const fetchSellerData = async () => {
    if (!sellerId) return;
    
    // Buscar perfil do vendedor
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', sellerId)
      .single();
    
    if (profile) {
      setSeller(profile);
      
      // Buscar produtos do vendedor
      const { data: products } = await supabase
        .from('products')
        .select(`
          *,
          categories (name),
          profiles (display_name)
        `)
        .eq('user_id', sellerId)
        .eq('is_public', true);
      
      if (products) {
        setProducts(products);
      }
    } else {
      navigate('/');
    }
  };

  const filteredProducts = products.filter(product =>
    searchTerm === '' || 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSeller = (productName: string) => {
    const message = `Olá! Tenho interesse no produto: ${productName}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!seller) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando vendedor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {seller.display_name?.charAt(0) || 'V'}
                </span>
              </div>
              <div>
                <h1 className="font-semibold text-slate-900">{seller.display_name || 'Vendedor'}</h1>
                <p className="text-sm text-slate-500">{products.length} produtos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Seller Info Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-3xl font-bold">
                {seller.display_name?.charAt(0) || 'V'}
              </span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{seller.display_name || 'Vendedor'}</h1>
                <div className="flex flex-wrap items-center gap-4 text-emerald-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>São Paulo, SP</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Membro desde 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>{products.length} produtos</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-emerald-100">(124 avaliações)</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">98%</span>
                    <span className="text-emerald-100">satisfação</span>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-semibold">2h</span>
                    <span className="text-emerald-100">resposta média</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold shadow-lg"
              onClick={() => handleContactSeller('informações gerais')}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Entrar em Contato
            </Button>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Produtos</h2>
              <p className="text-slate-600">{filteredProducts.length} de {products.length} produtos</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
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
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-lg"
                          onClick={() => handleContactSeller(product.name)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-slate-600 mb-6">
                Tente ajustar sua busca ou volte mais tarde
              </p>
              <Button onClick={() => setSearchTerm('')}>
                Limpar busca
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPage;