
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";

const Auth = () => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine which view to show based on the URL path
  const initialView = location.pathname.includes("register") ? "register" : "signin";
  
  // If dialog is closed, navigate to dashboard or home
  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lms-background to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-lms-primary mb-2">LearnifyEDU</h1>
        <p className="text-lg text-gray-600">
          Your complete learning management solution
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button
          onClick={() => {
            navigate("/signin");
            setDialogOpen(true);
          }}
          size="lg"
          variant={initialView === "signin" ? "default" : "outline"}
        >
          Sign In
        </Button>
        
        <Button
          onClick={() => {
            navigate("/register");
            setDialogOpen(true);
          }}
          size="lg"
          variant={initialView === "register" ? "default" : "outline"}
        >
          Register
        </Button>
      </div>
      
      <AuthDialog 
        isOpen={dialogOpen}
        onOpenChange={handleOpenChange} 
        initialView={initialView}
      />
    </div>
  );
};

export default Auth;
