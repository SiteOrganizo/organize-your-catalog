import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, Plus, Trash2, Edit } from "lucide-react";

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export const CategoriesPage = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory,
      subcategories: []
    };
    
    setCategories([...categories, category]);
    setNewCategory("");
    
    toast({
      title: "Categoria criada!",
      description: `A categoria "${newCategory}" foi adicionada.`,
    });
  };

  const handleAddSubcategory = (categoryId: string) => {
    if (!newSubcategory.trim()) return;
    
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subcategories: [...cat.subcategories, newSubcategory] }
        : cat
    ));
    
    setNewSubcategory("");
    toast({
      title: "Subcategoria adicionada!",
      description: `"${newSubcategory}" foi adicionada à categoria.`,
    });
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    toast({
      title: "Categoria removida",
      description: "A categoria foi excluída com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
          <p className="text-muted-foreground">
            Organize seus produtos em categorias personalizadas
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Nova Categoria
            </CardTitle>
            <CardDescription>
              Crie categorias principais para organizar seus produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="categoryName">Nome da Categoria</Label>
                <Input
                  id="categoryName"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Ex: Roupas Femininas, Calçados, Eletrônicos..."
                  className="mt-1"
                />
              </div>
              <Button onClick={handleAddCategory} className="self-end">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {categories.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground">Nenhuma categoria criada</h3>
                <p className="text-muted-foreground text-center">
                  Comece criando sua primeira categoria para organizar seus produtos.
                </p>
              </CardContent>
            </Card>
          ) : (
            categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      {category.name}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label>Nova Subcategoria</Label>
                        <Input
                          value={selectedCategory === category.id ? newSubcategory : ""}
                          onChange={(e) => {
                            setSelectedCategory(category.id);
                            setNewSubcategory(e.target.value);
                          }}
                          placeholder="Ex: Blusas, Calças, Vestidos..."
                          className="mt-1"
                        />
                      </div>
                      <Button 
                        onClick={() => handleAddSubcategory(category.id)}
                        size="sm"
                        className="self-end"
                      >
                        Adicionar
                      </Button>
                    </div>
                    
                    {category.subcategories.length > 0 && (
                      <div>
                        <Label>Subcategorias:</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {category.subcategories.map((sub, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};