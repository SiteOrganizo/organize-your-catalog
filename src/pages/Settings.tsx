import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Shield, Download, Trash2 } from "lucide-react";

export const SettingsPage = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    autoBackup: false,
    publicCatalog: true,
    emailNotifications: true
  });

  const [accountData, setAccountData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas.",
    });
  };

  const handleChangePassword = () => {
    if (accountData.newPassword !== accountData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Senha alterada!",
      description: "Sua senha foi atualizada com sucesso.",
    });

    setAccountData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Seus dados estão sendo preparados para download.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Conta excluída",
      description: "Sua conta foi removida permanentemente.",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notificações do Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre atividades da sua loja
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, notifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba atualizações importantes por email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveSettings}>
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Configurações avançadas da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup">Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Faça backup automático dos seus dados
                  </p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, autoBackup: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="publicCatalog">Catálogo Público</Label>
                  <p className="text-sm text-muted-foreground">
                    Permitir que catálogos sejam acessados publicamente
                  </p>
                </div>
                <Switch
                  id="publicCatalog"
                  checked={settings.publicCatalog}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, publicCatalog: checked })
                  }
                />
              </div>

              <Button onClick={handleSaveSettings}>
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Segurança
              </CardTitle>
              <CardDescription>
                Altere sua senha e gerencie a segurança da conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Senha Atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={accountData.currentPassword}
                  onChange={(e) => setAccountData({ ...accountData, currentPassword: e.target.value })}
                  placeholder="Digite sua senha atual"
                />
              </div>

              <div>
                <Label htmlFor="newPassword">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={accountData.newPassword}
                  onChange={(e) => setAccountData({ ...accountData, newPassword: e.target.value })}
                  placeholder="Digite sua nova senha"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={accountData.confirmPassword}
                  onChange={(e) => setAccountData({ ...accountData, confirmPassword: e.target.value })}
                  placeholder="Confirme sua nova senha"
                />
              </div>

              <Button onClick={handleChangePassword}>
                Alterar Senha
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Dados da Conta
              </CardTitle>
              <CardDescription>
                Exporte ou exclua seus dados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleExportData} variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Exportar Dados
                </Button>
                
                <Button 
                  onClick={handleDeleteAccount} 
                  variant="destructive" 
                  className="flex-1 gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Excluir Conta
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                <strong>Atenção:</strong> A exclusão da conta é permanente e não pode ser desfeita.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};