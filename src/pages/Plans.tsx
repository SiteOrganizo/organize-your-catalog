import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Crown, Package, Camera, Sparkles, Check, Zap, Star } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const PlansPage = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("free");

  const plans: Plan[] = [
    {
      id: "free",
      name: "Gratuito",
      price: "R$ 0",
      period: "para sempre",
      features: [
        "Até 5 produtos cadastrados",
        "Até 3 fotos por produto",
        "Compartilhamento via link",
        "Compartilhamento por código",
        "Catálogo básico",
        "Suporte por email"
      ]
    },
    {
      id: "pro",
      name: "Profissional",
      price: "R$ 39",
      period: "/mês",
      highlighted: true,
      badge: "Mais Popular",
      features: [
        "Produtos ilimitados",
        "Até 15 fotos por produto",
        "Descrição gerada por IA",
        "Personalização visual avançada",
        "Destaque de produtos em links públicos",
        "Relatórios de visualização",
        "Suporte prioritário",
        "Sem marca do Organizo"
      ]
    }
  ];

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") {
      setCurrentPlan(planId);
      toast({
        title: "Plano alterado!",
        description: "Você está usando o plano gratuito.",
      });
    } else {
      toast({
        title: "Upgrade em breve!",
        description: "O sistema de pagamento será disponibilizado em breve.",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planos</h1>
          <p className="text-muted-foreground">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.highlighted 
                  ? "border-primary shadow-strong scale-105" 
                  : "border-border"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  {plan.id === "free" ? (
                    <Package className="h-8 w-8 text-secondary" />
                  ) : (
                    <Crown className="h-8 w-8 text-primary" />
                  )}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-primary">
                    {plan.price}
                    <span className="text-lg text-muted-foreground font-normal">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full ${
                    currentPlan === plan.id
                      ? "bg-muted text-muted-foreground"
                      : plan.highlighted
                      ? "bg-primary hover:bg-primary-hover"
                      : "bg-secondary hover:bg-secondary/90"
                  }`}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Plano Atual
                    </>
                  ) : plan.id === "free" ? (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      Continuar Gratuito
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Fazer Upgrade
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Recursos Exclusivos do Plano Profissional
            </CardTitle>
            <CardDescription>
              Desbloqueie todo o potencial do Organizo
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Camera className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Até 15 fotos por produto</h4>
                  <p className="text-sm text-muted-foreground">
                    Mostre todos os detalhes dos seus produtos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Descrição gerada por IA</h4>
                  <p className="text-sm text-muted-foreground">
                    Economize tempo com descrições automáticas
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Crown className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Personalização avançada</h4>
                  <p className="text-sm text-muted-foreground">
                    Customize cores, logos e layout do catálogo
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium">Produtos em destaque</h4>
                  <p className="text-sm text-muted-foreground">
                    Destaque seus melhores produtos nos links
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};