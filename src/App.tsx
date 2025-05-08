
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Certificates from "./pages/Certificates";
import AdminStudents from "./pages/AdminStudents";
import Auth from "./pages/Auth";
import VerifyAccount from "./pages/VerifyAccount";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/signin" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/verify" element={<VerifyAccount />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
          <Route path="/certificates" element={<Layout><Certificates /></Layout>} />
          <Route path="/admin/students" element={<Layout><AdminStudents /></Layout>} />
          
          {/* Redirect root to signin */}
          <Route path="/" element={<Navigate to="/signin" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
