import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus, Search, Edit, Trash2, Eye } from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

export const ProductsPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchCodes, setSearchCodes] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  
  const [newProduct, setNewProduct] = useState({
    code: `ORG${Date.now().toString().slice(-6)}`,
    name: "",
    description: "",
    price: "",
    category: "",
    image: null as File | null
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "Erro",
        description: "Nome e preço são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      code: newProduct.code,
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category || "Geral"
    };

    setProducts([...products, product]);
    setNewProduct({
      code: `ORG${Date.now().toString().slice(-6)}`,
      name: "",
      description: "",
      price: "",
      category: "",
      image: null
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi cadastrado com o código ${product.code}.`,
    });
  };

  const handleSearchCodes = () => {
    const codes = searchCodes.split(/[,\s]+/).filter(code => code.trim());
    const results = products.filter(product => 
      codes.some(code => product.code.toLowerCase().includes(code.toLowerCase()))
    );
    setSearchResults(results);
    
    toast({
      title: "Busca realizada",
      description: `${results.length} produto(s) encontrado(s).`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Produto removido",
      description: "O produto foi excluído com sucesso.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e busque por códigos
          </p>
        </div>

        <Tabs defaultValue="add" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">Cadastrar Produto</TabsTrigger>
            <TabsTrigger value="search">Buscar por Código</TabsTrigger>
            <TabsTrigger value="list">Lista de Produtos</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Novo Produto
                </CardTitle>
                <CardDescription>
                  Adicione um novo produto ao seu catálogo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="code">Código do Produto</Label>
                    <Input
                      id="code"
                      value={newProduct.code}
                      onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                      placeholder="ORG123456"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Input
                      id="category"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="Ex: Roupas Femininas"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Ex: Blusa Estampada Floral"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Descreva as características do produto..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="0,00"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image">Imagem do Produto</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setNewProduct({ ...newProduct, image: e.target.files[0] });
                        }
                      }}
                    />
                  </div>
                </div>

                <Button onClick={handleAddProduct} className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  Salvar Produto
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Buscar por Código
                </CardTitle>
                <CardDescription>
                  Digite os códigos dos produtos separados por vírgula ou espaço
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="searchCodes">Códigos dos Produtos</Label>
                  <Textarea
                    id="searchCodes"
                    value={searchCodes}
                    onChange={(e) => setSearchCodes(e.target.value)}
                    placeholder="Ex: ORG123456, ORG789012, ORG345678"
                    rows={3}
                  />
                </div>
                <Button onClick={handleSearchCodes} className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Produtos
                </Button>

                {searchResults.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">Resultados da Busca ({searchResults.length})</h3>
                    <div className="grid gap-4">
                      {searchResults.map((product) => (
                        <Card key={product.id} className="border border-accent">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">Código: {product.code}</p>
                                <p className="text-sm">Categoria: {product.category}</p>
                                <p className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1">
                        Gerar Link Compartilhável
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Gerar PDF
                      </Button>
                      <Button className="flex-1">
                        Enviar por WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Todos os Produtos ({products.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Nenhum produto cadastrado</h3>
                    <p className="text-muted-foreground">Comece adicionando seu primeiro produto.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {products.map((product) => (
                      <Card key={product.id} className="border border-muted">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">Código: {product.code}</p>
                              <p className="text-sm">Categoria: {product.category}</p>
                              <p className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</p>
                              {product.description && (
                                <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};