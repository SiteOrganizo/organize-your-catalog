import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Search, Grid, Heart, Share2 } from 'lucide-react';

export default function Catalog() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const itemsPerPage = 10;

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      "Eletrônicos": "📱",
      "Casa e Jardim": "🏠",
      "Roupas": "👕",
      "Livros": "📚",
      "Esportes": "⚽",
      "Beleza": "💄",
      "Carros": "🚗",
      "Brinquedos": "🧸",
      "Música": "🎵",
      "Filmes": "🎬"
    };
    return icons[category] || "📦";
  };

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Calcular produtos da página atual
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset página quando filtros mudam
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleContactSeller = (product: any) => {
    const message = `Olá! Tenho interesse no produto: ${product.name} (${product.code})`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Catálogo Completo</h1>
              <p className="text-slate-400 mt-1">
                {filteredProducts.length} produtos encontrados
              </p>
            </div>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
            >
              Voltar ao Início
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Categorias */}
          <aside className="w-80 flex-shrink-0">
            <Card className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 sticky top-24">
              <h2 className="text-lg font-medium text-white mb-6">Filtros</h2>
              
              {/* Busca */}
              <div className="mb-6">
                <label className="text-sm text-slate-400 mb-2 block">Buscar produtos</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Digite aqui..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>

              {/* Categorias */}
              <div>
                <label className="text-sm text-slate-400 mb-4 block">Categorias</label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === '' 
                        ? 'bg-orange-400/20 text-orange-400' 
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="mr-2">🌟</span>
                    Todas as categorias
                  </button>
                  
                  {mockCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category 
                          ? 'bg-orange-400/20 text-orange-400' 
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="mr-2">{getCategoryIcon(category)}</span>
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1">
            {/* Grid de Produtos */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {currentProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group bg-white/3 backdrop-blur-xl border border-white/10 hover:border-orange-400/30 transition-all duration-300 hover:transform hover:scale-[1.02] rounded-2xl overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Adicionar aos favoritos
                            }}
                          >
                            <Heart className="h-4 w-4 text-white" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Compartilhar
                            }}
                          >
                            <Share2 className="h-4 w-4 text-white" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <Badge variant="secondary" className="mb-2 bg-orange-400/20 text-orange-400 border-0">
                          {product.category}
                        </Badge>
                        
                        <h3 className="font-medium text-white mb-2 line-clamp-2 group-hover:text-orange-400 transition-colors">
                          {product.name}
                        </h3>
                        
                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-orange-400">
                            R$ {product.price}
                          </div>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContactSeller(product);
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                          >
                            Contatar
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage > 1) setCurrentPage(currentPage - 1);
                            }}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                        
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const pageNumber = i + 1;
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCurrentPage(pageNumber);
                                }}
                                isActive={currentPage === pageNumber}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Grid className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Nenhum produto encontrado</h3>
                <p className="text-slate-400">
                  Tente ajustar os filtros ou buscar por outros termos.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}