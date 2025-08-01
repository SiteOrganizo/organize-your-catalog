import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Package, Zap, Shield, Smartphone, Check, Store } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Catalogin
          </h1>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Marketplace Digital + Catálogo Personalizado
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Divulgue seus produtos no nosso marketplace público e crie catálogos 
            personalizados para enviar diretamente aos seus clientes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                <Package className="h-5 w-5" />
                Criar Minha Loja Grátis
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="secondary" size="lg" className="gap-2">
                <Store className="h-5 w-5" />
                Explorar Marketplace
              </Button>
            </Link>
          </div>
          
          <div className="flex justify-center">
            <Link to="/login">
              <Button variant="outline" size="sm">
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
                <CardTitle>Plano Gratuito</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comece agora sem custos e experimente todos os recursos essenciais para criar catálogos profissionais
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-accent">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-4">
            Escolha o plano ideal para sua loja
          </h3>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comece grátis e evolua conforme sua loja cresce
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Gratuito */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Gratuito</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 0</span>
                </div>
                <CardDescription className="text-base mt-2">
                  Para quem está começando
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Cadastro de até 5 produtos</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Upload de até 3 imagens por produto</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Geração de link de catálogo</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Descrição com IA</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Criação de categorias personalizadas</span>
                   </div>
                </div>
                <div className="pt-6">
                  <Link to="/register" className="w-full block">
                    <Button className="w-full" size="lg">
                      Começar Grátis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Plano Profissional */}
            <Card className="relative border-primary shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Mais Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl">Profissional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">R$ 29</span>
                  <span className="text-muted-foreground">/mês</span>
                </div>
                <CardDescription className="text-base mt-2">
                  Para quem quer mais controle e alcance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Produtos ilimitados</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Até 15 imagens por produto</span>
                  </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Logo da empresa e do Catalogin no link</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Campos adicionais customizados</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Check className="h-5 w-5 text-primary" />
                     <span>Dashboard com estatísticas</span>
                   </div>
                </div>
                <div className="pt-6">
                  <Link to="/register" className="w-full block">
                    <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                      Assinar Plano Pro
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Pronto para organizar seus produtos?
          </h3>
           <p className="text-lg text-muted-foreground mb-8">
             Crie sua conta gratuita e comece a usar o Catalogin hoje mesmo.
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
           <div className="text-xl font-bold text-primary mb-2">Catalogin</div>
           <p className="text-sm text-muted-foreground">
             © 2024 Catalogin - Sistema de catálogo digital versátil
           </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
