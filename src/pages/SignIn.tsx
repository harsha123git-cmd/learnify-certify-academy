
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

const SignIn = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  
  const onSubmit = (data: FormData) => {
    // In a real app, this would authenticate with a backend
    console.log("Sign in data:", data);
    
    // For demo purposes, we'll simulate a successful sign-in
    toast({
      title: "Sign-in successful",
      description: "Welcome back to LearnifyEDU!",
    });
    
    // Redirect to the dashboard after a short delay
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      description="Enter your credentials to access your learning dashboard"
      footerText="Don't have an account?"
      footerLinkText="Register now"
      footerLinkUrl="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
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
            control={form.control}
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
                  <a 
                    href="/forgot-password" 
                    className="text-sm font-medium text-lms-primary hover:text-lms-primary/80"
                  >
                    Forgot password?
                  </a>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign in
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
};

export default SignIn;
