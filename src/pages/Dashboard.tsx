import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  FolderOpen, 
  Search, 
  TrendingUp,
  Plus,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    catalogs: 0,
    views: 0
  });

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      // Buscar produtos
      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('user_id', user?.id);

      // Buscar categorias
      const { data: categories } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', user?.id);

      setStats({
        products: products?.length || 0,
        categories: categories?.length || 0,
        catalogs: 0, // Implementar quando houver tabela de catálogos
        views: 0     // Implementar quando houver analytics
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da sua loja e catálogos
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Produtos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.products}</div>
              <p className="text-xs text-muted-foreground">
                {stats.products === 0 ? 'Nenhum produto cadastrado ainda' : 'produtos cadastrados'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorias
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.categories}</div>
              <p className="text-xs text-muted-foreground">
                {stats.categories === 0 ? 'Configure suas categorias' : 'categorias criadas'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Catálogos Enviados
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0</div>
              <p className="text-xs text-muted-foreground">
                Começe enviando catálogos
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Visualizações
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">0</div>
              <p className="text-xs text-muted-foreground">
                Acompanhe o engajamento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Comece configurando sua loja e produtos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/dashboard/categories">
                <Button variant="soft" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Primeira Categoria
                </Button>
              </Link>
              
              <Link to="/dashboard/products">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Package className="h-4 w-4" />
                  Cadastrar Produto
                </Button>
              </Link>
              
              <Link to="/dashboard/search">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Search className="h-4 w-4" />
                  Buscar por Código
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
              <CardDescription>
                Configure sua loja para começar a vender
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium text-sm">Configure sua loja</p>
                  <p className="text-xs text-muted-foreground">
                    Adicione logo e informações
                  </p>
                </div>
                <Link to="/dashboard/store">
                  <Button size="sm">Configurar</Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">Crie categorias</p>
                  <p className="text-xs text-muted-foreground">
                    Organize seus produtos
                  </p>
                </div>
                <Link to="/dashboard/categories">
                  <Button size="sm" variant="outline">Criar</Button>
                </Link>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">Adicione produtos</p>
                  <p className="text-xs text-muted-foreground">
                    Monte seu catálogo
                  </p>
                </div>
                <Link to="/dashboard/products">
                  <Button size="sm" variant="outline">Adicionar</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};