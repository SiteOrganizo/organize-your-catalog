import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { toast } from "@/hooks/use-toast";
import { Upload, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Register = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    logo: null as File | null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("Deve ter pelo menos 8 caracteres");
    if (!/[A-Z]/.test(password)) errors.push("Deve conter pelo menos uma letra maiúscula");
    if (!/[a-z]/.test(password)) errors.push("Deve conter pelo menos uma letra minúscula");
    if (!/[0-9]/.test(password)) errors.push("Deve conter pelo menos um número");
    return errors;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.storeName) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return;
    }

    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      toast({
        title: "Senha fraca",
        description: passwordErrors.join(", "),
        variant: "destructive"
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não conferem.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.storeName);
    
    if (error) {
      let errorMessage = "Erro ao criar conta. Tente novamente.";
      
      if (error.message.includes('User already registered')) {
        errorMessage = "Este email já está cadastrado. Tente fazer login ou use outro email.";
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMessage = "A senha deve ter pelo menos 6 caracteres.";
      }
      
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu email para confirmar a conta.",
      });
      navigate('/login');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'file') {
      setFormData(prev => ({
        ...prev,
        logo: e.target.files?.[0] || null
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Criar Conta</h2>
          <p className="text-muted-foreground">Configure sua loja no Organizo</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="storeName">Nome da Loja *</Label>
            <Input
              id="storeName"
              name="storeName"
              placeholder="Ex: Minha Loja Fashion"
              value={formData.storeName}
              onChange={handleChange}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Senha *</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Mínimo 8 caracteres, com maiúscula, minúscula e número
            </p>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="logo">Logo da Loja (opcional)</Label>
            <div className="mt-1 flex items-center gap-2">
              <Input
                id="logo"
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="flex-1"
              />
              <Upload className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Formatos aceitos: JPG, PNG, GIF
            </p>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Criando conta..." : "Criar Minha Loja"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary-hover font-medium"
            >
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};