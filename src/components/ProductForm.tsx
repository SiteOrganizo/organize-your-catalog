import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload, Wand2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id?: string;
  code: string;
  name: string;
  price: number | null;
  description: string | null;
  category_id: string | null;
  images: string[];
  custom_fields: Record<string, any>;
  is_public?: boolean;
}

interface ProductFormProps {
  product?: Product;
  onSave: () => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<Product>({
    code: product?.code || "",
    name: product?.name || "",
    price: product?.price || null,
    description: product?.description || "",
    category_id: product?.category_id || null,
    images: product?.images || [],
    custom_fields: product?.custom_fields || {},
    is_public: product?.is_public || false
  });

  useEffect(() => {
    fetchCategories();
    generateProductCode();
  }, []);

  useEffect(() => {
    if (product?.images) {
      setPreviewUrls(product.images);
    }
  }, [product]);

  // Sincronizar dados do produto quando ele mudar
  useEffect(() => {
    if (product) {
      setFormData({
        code: product.code || "",
        name: product.name || "",
        price: product.price || null,
        description: product.description || "",
        category_id: product.category_id || null,
        images: product.images || [],
        custom_fields: product.custom_fields || {},
        is_public: product.is_public || false
      });
    }
  }, [product]);

  const fetchCategories = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    if (error) {
      toast({
        title: "Erro ao carregar categorias",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setCategories(data || []);
  };

  const generateProductCode = () => {
    if (!product) {
      const code = `PRD${Date.now().toString().slice(-6)}`;
      setFormData(prev => ({ ...prev, code }));
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number | null) => {
    if (field === 'price') {
      setFormData(prev => ({ ...prev, [field]: value ? parseFloat(value as string) : null }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxImages = 15; // Limite pro
    
    if (files.length + selectedImages.length + formData.images.length > maxImages) {
      toast({
        title: "Limite de imagens excedido",
        description: `Máximo ${maxImages} imagens por produto`,
        variant: "destructive"
      });
      return;
    }

    setSelectedImages(prev => [...prev, ...files]);
    
    // Criar URLs de preview
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setPreviewUrls(prev => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    if (index < formData.images.length) {
      // Remover imagem existente
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } else {
      // Remover nova imagem
      const newImageIndex = index - formData.images.length;
      setSelectedImages(prev => prev.filter((_, i) => i !== newImageIndex));
    }
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of selectedImages) {
      const fileName = `${user!.id}/${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) {
        console.error('Erro no upload:', error);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(data.path);

      uploadedUrls.push(publicUrl);
    }

    return uploadedUrls;
  };

  const generateDescription = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Informe o nome do produto para gerar a descrição",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingDescription(true);

    try {
      const categoryName = categories.find(c => c.id === formData.category_id)?.name;
      
      const { data, error } = await supabase.functions.invoke('generate-product-description', {
        body: {
          productName: formData.name,
          category: categoryName,
          price: formData.price
        }
      });

      if (error) throw error;

      setFormData(prev => ({ ...prev, description: data.description }));
      
      toast({
        title: "Descrição gerada!",
        description: "Descrição criada com IA. Você pode editá-la se desejar.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar descrição",
        description: "Tente novamente ou escreva manualmente",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingDescription(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (!formData.name.trim() || !formData.code.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Nome e código são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Upload das novas imagens
      const newImageUrls = await uploadImages();
      const allImages = [...formData.images, ...newImageUrls];

      const productData = {
        ...formData,
        user_id: user.id,
        images: allImages,
        price: formData.price,
        category_id: formData.category_id || null
      };

      if (product?.id) {
        // Atualizar produto existente
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: "Produto atualizado!",
          description: "As alterações foram salvas com sucesso.",
        });
      } else {
        // Criar novo produto
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: "Produto criado!",
          description: "Produto adicionado ao seu catálogo.",
        });
      }

      onSave();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar produto",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="code">Código do Produto *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Ex: PRD001"
                required
              />
            </div>

            <div>
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Camiseta Básica"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price?.toString() || ""}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category_id || ""} onValueChange={(value) => handleInputChange('category_id', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="description">Descrição</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateDescription}
                disabled={isGeneratingDescription}
                className="gap-2"
              >
                {isGeneratingDescription ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Gerar com IA
              </Button>
            </div>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição detalhada do produto..."
              rows={4}
            />
          </div>

          <div>
            <Label>Imagens (até 15)</Label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
              >
                <Upload className="h-5 w-5" />
                Adicionar Imagens
              </label>
            </div>

            {previewUrls.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_public">Produto Público</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_public"
                checked={formData.is_public || false}
                onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="is_public" className="text-sm text-muted-foreground">
                Permitir que este produto seja visto no catálogo público
              </Label>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                product ? 'Atualizar Produto' : 'Criar Produto'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};