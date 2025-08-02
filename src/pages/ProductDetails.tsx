import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Heart, Share, Sparkles, Star, Eye, MapPin, Clock, Shield } from "lucide-react";

// Dados mockados (mesmo do Index)
const mockProducts = [
  {
    id: "1",
    code: "PRO001",
    name: "MacBook Pro M3",
    price: 12999.99,
    description: "Performance revolucionária com chip M3 e design premium em alumínio",
    fullDescription: "O MacBook Pro M3 oferece performance excepcional para profissionais criativos. Com o revolucionário chip M3, você tem poder computacional incomparável para edição de vídeo, desenvolvimento e design. A tela Liquid Retina XDR de 14 polegadas oferece cores vibrantes e contraste infinito. Bateria que dura o dia todo e conectividade Thunderbolt 4 para todos os seus periféricos.",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80"
    ],
    category: "Technology",
    seller: "Apple Premium",
    sellerRating: 4.9,
    sellerReviews: 1250,
    location: "São Paulo, SP",
    postedAt: "2024-01-15",
    views: 2847,
    likes: 156,
    specifications: {
      "Processador": "Apple M3 Pro 12-core",
      "Memória": "18GB RAM unificada",
      "Armazenamento": "512GB SSD",
      "Tela": "14\" Liquid Retina XDR",
      "Gráficos": "GPU 18-core",
      "Conectividade": "3x Thunderbolt 4, HDMI, MagSafe 3"
    },
    condition: "Novo",
    warranty: "12 meses Apple",
    featured: true
  },
  {
    id: "2", 
    code: "PRO002",
    name: "iPhone 15 Pro Max",
    price: 8999.99,
    description: "Câmera profissional 48MP, titanium design e A17 Pro chip",
    fullDescription: "O iPhone 15 Pro Max redefine o que um smartphone pode fazer. Construído em titânio aeroespacial, é incrivelmente leve e resistente. O sistema de câmera Pro com lente telefoto 5x permite fotos e vídeos profissionais. O chip A17 Pro oferece performance de console em suas mãos.",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop&q=80"
    ],
    category: "Mobile",
    seller: "TechLux",
    sellerRating: 4.8,
    sellerReviews: 890,
    location: "Rio de Janeiro, RJ",
    postedAt: "2024-01-10",
    views: 3241,
    likes: 203,
    specifications: {
      "Tela": "6.7\" Super Retina XDR",
      "Chip": "A17 Pro",
      "Câmera": "48MP Principal + 12MP Ultra Wide + 12MP Telefoto",
      "Armazenamento": "256GB",
      "Material": "Titânio",
      "Resistência": "IP68"
    },
    condition: "Novo lacrado",
    warranty: "12 meses Apple",
    featured: true
  },
  {
    id: "3",
    code: "PRO003", 
    name: "Sony WH-1000XM5",
    price: 1899.99,
    description: "Cancelamento de ruído líder da indústria com qualidade Hi-Res",
    fullDescription: "Os Sony WH-1000XM5 oferecem a melhor experiência de áudio sem fio. Com cancelamento de ruído adaptativo e qualidade de som Hi-Res, você experimenta cada detalhe da sua música. Bateria de 30 horas e carregamento rápido para uso o dia todo.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80"
    ],
    category: "Audio",
    seller: "SoundMaster",
    sellerRating: 4.7,
    sellerReviews: 445,
    location: "Belo Horizonte, MG",
    postedAt: "2024-01-08",
    views: 1523,
    likes: 89,
    specifications: {
      "Driver": "30mm",
      "Cancelamento": "Dual Noise Sensor",
      "Bateria": "30 horas",
      "Conectividade": "Bluetooth 5.2, NFC",
      "Codecs": "LDAC, AAC, SBC",
      "Peso": "250g"
    },
    condition: "Novo",
    warranty: "12 meses Sony",
    featured: false
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleContactSeller = () => {
    if (!product) return;
    const message = `Olá! Tenho interesse no produto: ${product.name} (${product.code})`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-white/60">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Header simples */}
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
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`${isLiked ? 'text-red-400 hover:text-red-300' : 'text-white/60 hover:text-white'}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-white/60 hover:text-white"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Galeria de Imagens */}
          <div className="space-y-6">
            <Card className="bg-white/5 border-white/10 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-96 lg:h-[500px]">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/40 backdrop-blur-sm text-white border border-white/20 rounded-full">
                      {product.code}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-orange-400' 
                        : 'border-white/20 hover:border-orange-400/50'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-light text-white mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {product.views.toLocaleString()} visualizações
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(product.postedAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-light text-orange-400 mb-1">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <Badge variant="outline" className="border-green-400/30 text-green-400 bg-green-400/10">
                    {product.condition}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <Badge variant="outline" className="border-white/20 text-white/70 bg-white/5 rounded-full">
                  {product.category}
                </Badge>
                <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20 rounded-full">
                  {product.seller}
                </Badge>
              </div>

              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {product.fullDescription}
              </p>
            </div>

            {/* Especificações */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-medium text-white mb-4">Especificações</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-white/10 last:border-0">
                      <span className="text-white/60">{key}</span>
                      <span className="text-white font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informações do Vendedor */}
            <Card className="bg-white/5 border-white/10 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium text-white">Vendedor</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{product.sellerRating}</span>
                    <span className="text-white/60">({product.sellerReviews} avaliações)</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{product.seller}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <Shield className="h-4 w-4" />
                    <span>Vendedor verificado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="space-y-4">
              <Button 
                onClick={handleContactSeller}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 rounded-xl h-14 text-lg group"
              >
                <MessageCircle className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Entrar em Contato via WhatsApp
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 rounded-xl h-12"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current text-red-400' : ''}`} />
                  {isLiked ? 'Salvo' : 'Salvar'}
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 rounded-xl h-12"
                  onClick={handleShare}
                >
                  <Share className="mr-2 h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Garantia */}
            <div className="bg-orange-400/10 border border-orange-400/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 text-orange-400">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Garantia: {product.warranty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;