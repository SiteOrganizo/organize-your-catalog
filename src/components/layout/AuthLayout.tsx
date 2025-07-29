import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Catalogin</h1>
          <p className="text-muted-foreground">Crie catálogos profissionais para sua loja</p>
        </div>
        
        <div className="bg-card rounded-xl shadow-medium p-8 border">
          {children}
        </div>
        
        <div className="text-center mt-6 text-sm text-muted-foreground">
          © 2024 Organizo - Organize seus produtos com facilidade
        </div>
      </div>
    </div>
  );
};