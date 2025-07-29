import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginForm } from "./components/auth/LoginForm";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Patients } from "./pages/Patients";
import { RegisterPatient } from "./pages/RegisterPatient";
import { CreateBill } from "./pages/CreateBill";
import { Invoices } from "./pages/Invoices";
import { Payments } from "./pages/Payments";
import { Services } from "./pages/Services";
import { Reports } from "./pages/Reports";
import { Search } from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/patients"
        element={
          <DashboardLayout>
            <Patients />
          </DashboardLayout>
        }
      />
      <Route
        path="/patients/register"
        element={
          <DashboardLayout>
            <RegisterPatient />
          </DashboardLayout>
        }
      />
      <Route
        path="/billing/create"
        element={
          <DashboardLayout>
            <CreateBill />
          </DashboardLayout>
        }
      />
      <Route
        path="/invoices"
        element={
          <DashboardLayout>
            <Invoices />
          </DashboardLayout>
        }
      />
      <Route
        path="/payments"
        element={
          <DashboardLayout>
            <Payments />
          </DashboardLayout>
        }
      />
      <Route
        path="/services"
        element={
          <DashboardLayout>
            <Services />
          </DashboardLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <DashboardLayout>
            <Reports />
          </DashboardLayout>
        }
      />
      <Route
        path="/search"
        element={
          <DashboardLayout>
            <Search />
          </DashboardLayout>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="*"
        element={
          <DashboardLayout>
            <NotFound />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <AppRoutes />
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
