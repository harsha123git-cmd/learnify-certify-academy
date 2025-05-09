
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Sign in form schema
const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Register form schema
const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof signInSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthModalsProps {
  signInOpen: boolean;
  registerOpen: boolean;
  onSignInOpenChange: (open: boolean) => void;
  onRegisterOpenChange: (open: boolean) => void;
}

export const AuthModals = ({
  signInOpen,
  registerOpen,
  onSignInOpenChange,
  onRegisterOpenChange,
}: AuthModalsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  // Sign In form
  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Register form
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  
  const handleSignIn = (data: SignInFormData) => {
    console.log("Sign in data:", data);
    
    toast({
      title: "Sign-in successful",
      description: "Welcome back to LearnifyEDU!",
    });
    
    // Close the modal
    onSignInOpenChange(false);
    
    // Redirect to dashboard/home page
    setTimeout(() => navigate("/dashboard"), 500);
  };
  
  const handleRegister = (data: RegisterFormData) => {
    console.log("Registration data:", data);
    
    toast({
      title: "Registration successful!",
      description: "Account created! Redirecting to dashboard...",
    });
    
    // Close the modal
    onRegisterOpenChange(false);
    
    // Redirect to dashboard/home page after registration
    setTimeout(() => navigate("/dashboard"), 500);
  };

  // Switch to register modal from sign in modal
  const switchToRegister = () => {
    onSignInOpenChange(false);
    setTimeout(() => onRegisterOpenChange(true), 100);
  };

  // Switch to sign in modal from register modal
  const switchToSignIn = () => {
    onRegisterOpenChange(false);
    setTimeout(() => onSignInOpenChange(true), 100);
  };

  return (
    <>
      {/* Sign In Modal */}
      <Dialog open={signInOpen} onOpenChange={onSignInOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Sign In</DialogTitle>
            <DialogDescription className="text-center">
              Welcome back to LearnifyEDU! Please enter your credentials.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...signInForm}>
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <FormField
                control={signInForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={isPasswordVisible ? "text" : "password"} 
                          placeholder="******" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs text-right">
                      <button 
                        type="button"
                        className="text-sm font-medium text-lms-primary hover:text-lms-primary/80"
                      >
                        Forgot password?
                      </button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={signInForm.formState.isSubmitting}>
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    onClick={switchToRegister}
                    className="text-lms-primary hover:text-lms-primary/80 font-medium"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={registerOpen} onOpenChange={onRegisterOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Create an Account</DialogTitle>
            <DialogDescription className="text-center">
              Join LearnifyEDU today to access our learning resources.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <FormField
                control={registerForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={isPasswordVisible ? "text" : "password"} 
                          placeholder="******" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={isConfirmPasswordVisible ? "text" : "password"} 
                          placeholder="******" 
                          {...field} 
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {isConfirmPasswordVisible ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={registerForm.formState.isSubmitting}>
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    onClick={switchToSignIn}
                    className="text-lms-primary hover:text-lms-primary/80 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthModals;
