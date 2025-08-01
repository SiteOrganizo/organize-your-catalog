import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FolderOpen, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
}

export const CategoriesPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (categoriesError) throw categoriesError;

      // Fetch subcategories
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (subcategoriesError) throw subcategoriesError;

      // Combine categories with their subcategories
      const categoriesWithSub = categoriesData.map(cat => ({
        id: cat.id,
        name: cat.name,
        subcategories: subcategoriesData
          .filter(sub => sub.category_id === cat.id)
          .map(sub => ({ id: sub.id, name: sub.name }))
      }));

      setCategories(categoriesWithSub);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Erro ao carregar categorias",
        description: "Não foi possível carregar as categorias.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    console.log('Adding category, user:', user);
    console.log('Current categories:', categories);
    
    const newCat: Category = {
      id: `temp-${Date.now()}`,
      name: newCategory,
      subcategories: []
    };
    
    setCategories([...categories, newCat]);
    setNewCategory("");
    setHasUnsavedChanges(true);
    
    console.log('hasUnsavedChanges set to true');
    
    toast({
      title: "Categoria criada!",
      description: `A categoria "${newCategory}" foi adicionada.`,
    });
  };

  const handleAddSubcategory = (categoryId: string) => {
    if (!newSubcategory.trim()) return;
    
    const newSub: Subcategory = {
      id: `temp-${Date.now()}`,
      name: newSubcategory
    };

    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, subcategories: [...cat.subcategories, newSub] }
        : cat
    ));
    
    setNewSubcategory("");
    setSelectedCategory(null);
    setHasUnsavedChanges(true);
    
    toast({
      title: "Subcategoria adicionada!",
      description: `"${newSubcategory}" foi adicionada. Clique em "Salvar" para persistir.`,
    });
  };

  const handleSaveAll = async () => {
    if (!user || saving) return;
    
    setSaving(true);
    
    try {
      // Filter categories that need to be saved (temp IDs)
      const categoriesToSave = categories.filter(cat => cat.id.startsWith('temp-'));
      
      for (const category of categoriesToSave) {
        // Save category
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .insert([{ 
            name: category.name, 
            user_id: user.id 
          }])
          .select()
          .single();

        if (categoryError) throw categoryError;

        // Save subcategories for this category
        if (category.subcategories.length > 0) {
          const subcategoriesToInsert = category.subcategories.map(sub => ({
            name: sub.name,
            category_id: categoryData.id,
            user_id: user.id
          }));

          const { error: subError } = await supabase
            .from('subcategories')
            .insert(subcategoriesToInsert);

          if (subError) throw subError;
        }
      }

      // Refresh the data from database
      await fetchCategories();
      setHasUnsavedChanges(false);
      
      toast({
        title: "Categorias salvas!",
        description: "Todas as categorias foram salvas com sucesso.",
      });
    } catch (error) {
      console.error('Error saving categories:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as categorias.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!user) return;
    
    try {
      // First delete all subcategories
      const { error: subError } = await supabase
        .from('subcategories')
        .delete()
        .eq('category_id', categoryId)
        .eq('user_id', user.id);

      if (subError) throw subError;

      // Then delete the category
      const { error: catError } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)
        .eq('user_id', user.id);

      if (catError) throw catError;

      setCategories(categories.filter(cat => cat.id !== categoryId));
      
      toast({
        title: "Categoria removida",
        description: "A categoria foi excluída com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "Erro ao excluir categoria",
        description: "Não foi possível excluir a categoria.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string, categoryId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcategoryId)
        .eq('user_id', user.id);

      if (error) throw error;

      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId) }
          : cat
      ));
      
      toast({
        title: "Subcategoria removida",
        description: "A subcategoria foi excluída com sucesso.",
      });
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      toast({
        title: "Erro ao excluir subcategoria",
        description: "Não foi possível excluir a subcategoria.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Faça login para gerenciar suas categorias.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
            <p className="text-muted-foreground">
              Organize seus produtos em categorias personalizadas
            </p>
          </div>
          
          {hasUnsavedChanges && (
            <Button 
              onClick={handleSaveAll}
              disabled={saving}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          )}
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
          {loading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Carregando categorias...</p>
              </CardContent>
            </Card>
          ) : categories.length === 0 ? (
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
                          {category.subcategories.map((sub) => (
                            <span
                              key={sub.id}
                              className="inline-flex items-center px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm gap-2"
                            >
                              {sub.name}
                              <button
                                onClick={() => handleDeleteSubcategory(sub.id, category.id)}
                                className="hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
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