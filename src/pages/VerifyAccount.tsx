
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, RefreshCw } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const email = location.state?.email || "your email";
  
  useEffect(() => {
    let timer: number | undefined;
    if (resendTimer > 0 && !canResend) {
      timer = window.setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendTimer, canResend]);
  
  const handleVerify = () => {
    if (verificationCode.length < 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid verification code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would verify the code with a backend
    setTimeout(() => {
      // For demo, we'll simulate successful verification
      toast({
        title: "Account verified",
        description: "Your account has been verified successfully!",
      });
      
      // Redirect to signin
      setTimeout(() => navigate("/signin"), 1000);
      
      setIsLoading(false);
    }, 1500);
  };
  
  const handleResend = () => {
    if (!canResend) return;
    
    toast({
      title: "Verification code resent",
      description: "Please check your email for the new code",
    });
    
    setCanResend(false);
    setResendTimer(60);
  };

  return (
    <AuthLayout
      title="Verify your account"
      description={`We've sent a verification code to ${email}`}
      footerText="Need help?"
      footerLinkText="Contact support"
      footerLinkUrl="#support"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
            Enter verification code
          </label>
          <Input
            id="verificationCode"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="text-center text-lg tracking-widest"
            maxLength={6}
          />
        </div>
        
        <Button 
          onClick={handleVerify} 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          Verify Account
        </Button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={!canResend}
            className={`text-sm font-medium ${
              canResend 
                ? "text-lms-primary hover:text-lms-primary/80" 
                : "text-gray-400"
            }`}
          >
            {canResend ? (
              "Resend verification code"
            ) : (
              `Resend code in ${resendTimer}s`
            )}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyAccount;
