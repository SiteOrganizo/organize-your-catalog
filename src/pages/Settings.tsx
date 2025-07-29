import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Settings, Bell, Shield, Download, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const handleChangePassword = async () => {
    if (accountData.newPassword !== accountData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (accountData.newPassword.length < 8) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 8 caracteres.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: accountData.newPassword
      });

      if (error) throw error;

      // Log security event
      await supabase.rpc('log_security_event', {
        p_action: 'password_change',
        p_resource_type: 'auth',
        p_resource_id: null
      });

      toast({
        title: "Senha alterada!",
        description: "Sua senha foi atualizada com sucesso.",
      });
      
      // Clear password fields
      setAccountData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível alterar a senha."
      });
    }
  };

  const handleExportData = async () => {
    try {
      // Export user data
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (productsError || categoriesError || profileError) {
        throw new Error('Erro ao buscar dados para exportação');
      }

      const exportData = {
        profile,
        products,
        categories,
        exportedAt: new Date().toISOString()
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `catalogin-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Log security event
      await supabase.rpc('log_security_event', {
        p_action: 'data_export',
        p_resource_type: 'user_data',
        p_resource_id: null
      });

      toast({
        title: "Dados exportados",
        description: "Seus dados foram baixados com sucesso."
      });
    } catch (error: any) {
      console.error('Erro ao exportar dados:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível exportar os dados."
      });
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "ATENÇÃO: Esta ação é IRREVERSÍVEL! Todos os seus dados serão perdidos permanentemente. Digite 'EXCLUIR' para confirmar:"
    );
    
    if (!confirmed) return;

    const confirmText = window.prompt("Digite 'EXCLUIR' para confirmar a exclusão da conta:");
    if (confirmText !== 'EXCLUIR') {
      toast({
        variant: "destructive",
        title: "Cancelado",
        description: "A exclusão da conta foi cancelada."
      });
      return;
    }

    try {
      // Log security event before deletion
      await supabase.rpc('log_security_event', {
        p_action: 'account_deletion_attempt',
        p_resource_type: 'auth',
        p_resource_id: null
      });

      // Delete user data first (due to RLS, this will only delete their own data)
      await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('profiles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      toast({
        title: "Dados excluídos",
        description: "Seus dados foram excluídos. Você será desconectado."
      });

      // Sign out user
      await supabase.auth.signOut();
      
    } catch (error: any) {
      console.error('Erro ao excluir conta:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir a conta. Tente novamente."
      });
    }
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