import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { StorePage } from "./pages/Store";
import { CategoriesPage } from "./pages/Categories";
import { Products } from "./pages/Products";
import { SendPage } from "./pages/Send";
import { SettingsPage } from "./pages/Settings";
import { PlansPage } from "./pages/Plans";
import { PublicCatalogPage } from "./pages/PublicCatalog";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  // Create QueryClient inside the component to avoid initialization issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/store" element={
                <ProtectedRoute>
                  <StorePage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/categories" element={
                <ProtectedRoute>
                  <CategoriesPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/products" element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/send" element={
                <ProtectedRoute>
                  <SendPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/plans" element={
                <ProtectedRoute>
                  <PlansPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/catalog" element={<PublicCatalogPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
