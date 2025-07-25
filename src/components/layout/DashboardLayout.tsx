import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        
        <main className="flex-1 p-6">
          {children}
        </main>
        
        <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <span className="font-medium text-primary">Organizo</span>
            - Catálogos profissionais para sua loja
          </div>
        </footer>
      </div>
    </div>
  );
};