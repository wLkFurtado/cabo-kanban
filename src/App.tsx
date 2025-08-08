import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SectorsPage from "./pages/Sectors";
import BoardPage from "./pages/Board";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import VerifyPhonePage from "./pages/VerifyPhone";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<AppLayout><LoginPage /></AppLayout>} />
          <Route path="/register" element={<AppLayout><RegisterPage /></AppLayout>} />
          <Route path="/verify" element={<AppLayout><VerifyPhonePage /></AppLayout>} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/sectors" element={<ProtectedRoute><AppLayout><SectorsPage /></AppLayout></ProtectedRoute>} />
          <Route path="/boards/:boardId" element={<ProtectedRoute><AppLayout><BoardPage /></AppLayout></ProtectedRoute>} />
          <Route path="/kanban-basic" element={<ProtectedRoute><AppLayout><KanbanBoard /></AppLayout></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
