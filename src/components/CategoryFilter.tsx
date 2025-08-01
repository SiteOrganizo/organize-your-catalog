import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description?: string;
  _count?: {
    products: number;
  };
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalProducts: number;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  totalProducts 
}: CategoryFilterProps) => {
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('imóv') || name.includes('casa') || name.includes('apart')) return '🏠';
    if (name.includes('veíc') || name.includes('carro') || name.includes('auto')) return '🚗';
    if (name.includes('roupa') || name.includes('moda') || name.includes('vestuário')) return '👕';
    if (name.includes('eletrôn') || name.includes('tecnolog') || name.includes('comput')) return '📱';
    if (name.includes('aliment') || name.includes('comida') || name.includes('bebida')) return '🍽️';
    if (name.includes('saúde') || name.includes('méd') || name.includes('farmá')) return '💊';
    if (name.includes('beleza') || name.includes('cosmétic') || name.includes('estétic')) return '💄';
    if (name.includes('esporte') || name.includes('fitness') || name.includes('academia')) return '⚽';
    if (name.includes('livro') || name.includes('educação') || name.includes('curso')) return '📚';
    if (name.includes('jardim') || name.includes('planta') || name.includes('jardinag')) return '🌱';
    return '📦';
  };

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-max px-4">
        <Button
          onClick={() => onCategoryChange('')}
          variant={selectedCategory === '' ? 'default' : 'outline'}
          className={`flex-shrink-0 h-auto p-4 rounded-xl border-2 transition-all duration-200 ${
            selectedCategory === '' 
              ? 'border-orange-400 bg-orange-400/20 text-orange-400' 
              : 'border-white/20 bg-white/5 text-white hover:border-orange-400/50'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl mb-1">🏪</div>
            <div className="font-medium text-sm whitespace-nowrap">Todos</div>
            <div className="text-xs opacity-70">{totalProducts}</div>
          </div>
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.name)}
            variant={selectedCategory === category.name ? 'default' : 'outline'}
            className={`flex-shrink-0 h-auto p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedCategory === category.name 
                ? 'border-orange-400 bg-orange-400/20 text-orange-400' 
                : 'border-white/20 bg-white/5 text-white hover:border-orange-400/50'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">{getCategoryIcon(category.name)}</div>
              <div className="font-medium text-sm whitespace-nowrap max-w-20 truncate">
                {category.name}
              </div>
              <div className="text-xs opacity-70">{category._count?.products || 0}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};