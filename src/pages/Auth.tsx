
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

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

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  
  // Determine which view to show based on the URL path
  const isRegisterView = location.pathname.includes("register");
  
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
    
    // Redirect to dashboard/home page
    setTimeout(() => navigate("/dashboard"), 500);
  };
  
  const handleRegister = (data: RegisterFormData) => {
    console.log("Registration data:", data);
    
    toast({
      title: "Registration successful!",
      description: "Account created! Redirecting to dashboard...",
    });
    
    // Redirect to dashboard/home page after registration (in a real app, you might verify first)
    setTimeout(() => navigate("/dashboard"), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lms-background to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-lms-primary mb-2">LearnifyEDU</h1>
        <p className="text-lg text-gray-600">
          Your complete learning management solution
        </p>
      </div>
      
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/signin")}
            variant={!isRegisterView ? "default" : "outline"}
            className="w-full"
          >
            Sign In
          </Button>
          
          <Button
            onClick={() => navigate("/register")}
            variant={isRegisterView ? "default" : "outline"}
            className="w-full"
          >
            Register
          </Button>
        </div>
        
        {!isRegisterView ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Sign in to your account</h2>
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
              </form>
            </Form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
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
                            placeholder="Create a strong password" 
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
                            placeholder="Confirm your password" 
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
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
