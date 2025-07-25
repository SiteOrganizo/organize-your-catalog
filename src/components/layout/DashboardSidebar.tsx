import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen, 
  Search, 
  Send, 
  Settings,
  Store,
  Crown
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Minha Loja', href: '/dashboard/store', icon: Store },
  { name: 'Categorias', href: '/dashboard/categories', icon: FolderOpen },
  { name: 'Produtos', href: '/dashboard/products', icon: Package },
  { name: 'Enviar Catálogo', href: '/dashboard/send', icon: Send },
  { name: 'Planos', href: '/dashboard/plans', icon: Crown },
  { name: 'Configurações', href: '/dashboard/settings', icon: Settings },
];

export const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card border-r shadow-soft flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-primary">Organizo</h2>
        <p className="text-sm text-muted-foreground mt-1">Painel Administrativo</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-soft"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};