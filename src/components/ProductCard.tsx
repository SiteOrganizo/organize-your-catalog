import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye, Star } from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  price: number | null;
  description: string | null;
  images: string[];
  categories?: {
    name: string;
  } | null;
  profiles?: {
    display_name: string | null;
  } | null;
}

interface ProductCardProps {
  product: Product;
  onContact: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, onContact, viewMode = 'grid' }: ProductCardProps) => {
  return (
    <Card className={`group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border-white/10 hover:border-orange-400/50 ${
      viewMode === 'list' ? 'flex flex-row' : 'hover:transform hover:scale-105'
    }`}>
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
        
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className="bg-orange-500 text-white border-0">
            {product.code}
          </Badge>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-white group-hover:text-orange-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
            {product.price && (
              <span className="text-lg font-bold text-orange-400 ml-2 whitespace-nowrap">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {product.categories && (
              <Badge variant="outline" className="border-white/20 text-white/80 text-xs">
                {product.categories.name}
              </Badge>
            )}
            {product.profiles?.display_name && (
              <Badge variant="secondary" className="bg-white/10 text-white/90 text-xs">
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
        
        <div className="flex gap-2">
          <Button 
            onClick={() => onContact(product)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-0 text-sm"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Contatar
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="border-white/20 text-white/80 hover:bg-white/10"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};