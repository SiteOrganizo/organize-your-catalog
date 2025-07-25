import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, Zap, Shield, Smartphone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Organizo
          </h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Crie catálogos profissionais para sua loja
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Organize seus produtos, crie categorias personalizadas e envie catálogos 
            elegantes para seus clientes em segundos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                <Package className="h-5 w-5" />
                Criar Minha Loja Grátis
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Já tenho uma conta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">
            Tudo que você precisa para organizar seus produtos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Organize Produtos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cadastre produtos com fotos, códigos e informações detalhadas
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Busca Rápida</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Encontre produtos por código e gere catálogos instantaneamente
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>100% Mobile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interface responsiva que funciona perfeitamente em qualquer dispositivo
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Totalmente Grátis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comece agora sem custos e crie catálogos profissionais
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Pronto para organizar seus produtos?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Crie sua conta gratuita e comece a usar o Organizo hoje mesmo.
          </p>
          
          <Link to="/register">
            <Button size="lg" className="gap-2">
              <Package className="h-5 w-5" />
              Começar Agora - É Grátis
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl font-bold text-primary mb-2">Organizo</div>
          <p className="text-sm text-muted-foreground">
            © 2024 Organizo - Organize seus produtos com facilidade
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
