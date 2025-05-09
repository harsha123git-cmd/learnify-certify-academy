
import { useState } from "react";
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
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import VerifyAccount from "./pages/VerifyAccount";
import NotFound from "./pages/NotFound";
import AuthModals from "./components/AuthModals";

const queryClient = new QueryClient();

const App = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Auth Modals - accessible throughout the app */}
          <AuthModals 
            signInOpen={signInOpen}
            registerOpen={registerOpen}
            onSignInOpenChange={setSignInOpen}
            onRegisterOpenChange={setRegisterOpen}
          />
          
          <Routes>
            {/* Auth routes with both options */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyAccount />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <Layout 
                onSignInClick={() => setSignInOpen(true)} 
                onRegisterClick={() => setRegisterOpen(true)}
              >
                <Dashboard />
              </Layout>
            } />
            <Route path="/courses" element={
              <Layout 
                onSignInClick={() => setSignInOpen(true)} 
                onRegisterClick={() => setRegisterOpen(true)}
              >
                <Courses />
              </Layout>
            } />
            <Route path="/attendance" element={
              <Layout 
                onSignInClick={() => setSignInOpen(true)} 
                onRegisterClick={() => setRegisterOpen(true)}
              >
                <Attendance />
              </Layout>
            } />
            <Route path="/certificates" element={
              <Layout 
                onSignInClick={() => setSignInOpen(true)} 
                onRegisterClick={() => setRegisterOpen(true)}
              >
                <Certificates />
              </Layout>
            } />
            <Route path="/admin/students" element={
              <Layout 
                onSignInClick={() => setSignInOpen(true)} 
                onRegisterClick={() => setRegisterOpen(true)}
              >
                <AdminStudents />
              </Layout>
            } />
            
            {/* Redirect root to auth */}
            <Route path="/" element={<Navigate to="/auth" replace />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
