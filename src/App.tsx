import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { StorePage } from "./pages/Store";
import { CategoriesPage } from "./pages/Categories";
import { ProductsPage } from "./pages/Products";
import { SendPage } from "./pages/Send";
import { SettingsPage } from "./pages/Settings";
import { PlansPage } from "./pages/Plans";
import { PublicCatalogPage } from "./pages/PublicCatalog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/store" element={<StorePage />} />
          <Route path="/dashboard/categories" element={<CategoriesPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/send" element={<SendPage />} />
          <Route path="/dashboard/plans" element={<PlansPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/catalog" element={<PublicCatalogPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
