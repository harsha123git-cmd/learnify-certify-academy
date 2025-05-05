
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Calendar, 
  Award, 
  UserCheck, 
  Users, 
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  const navigation = [
    { name: "Dashboard", href: "/", icon: BookOpen },
    { name: "Courses", href: "/courses", icon: Calendar },
    { name: "Attendance", href: "/attendance", icon: UserCheck },
    { name: "Certificates", href: "/certificates", icon: Award },
  ];

  const adminNav = [
    { name: "Students", href: "/admin/students", icon: Users },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    // Actual logout logic would go here in a real app
  };

  return (
    <div className="min-h-screen bg-lms-background flex">
      {/* Sidebar for desktop */}
      <div className={cn(
        "hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-10",
      )}>
        <div className="flex-1 flex flex-col min-h-0 bg-sidebar border-r border-sidebar-border">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4 mb-5">
              <h1 className="text-2xl font-bold text-lms-primary">LearnifyEDU</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    item.href === location.pathname
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={cn(
                      item.href === location.pathname
                        ? "text-sidebar-accent-foreground"
                        : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
                      "mr-3 flex-shrink-0 h-5 w-5"
                    )}
                  />
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-sidebar-border">
                <h3 className="px-2 text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
                  Admin
                </h3>
                {adminNav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      item.href === location.pathname
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-1"
                    )}
                  >
                    <item.icon
                      className={cn(
                        item.href === location.pathname
                          ? "text-sidebar-accent-foreground"
                          : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
                        "mr-3 flex-shrink-0 h-5 w-5"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-sidebar-border p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-sidebar-foreground">Sam Wilson</p>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-xs font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground mt-1"
                  >
                    <LogOut className="mr-1 h-3 w-3" /> 
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-0 flex z-40 md:hidden",
        sidebarOpen ? "block" : "hidden"
      )}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-sidebar">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center justify-center flex-shrink-0 px-4 mb-5">
              <h1 className="text-2xl font-bold text-lms-primary">LearnifyEDU</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    item.href === location.pathname
                      ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      item.href === location.pathname 
                        ? "text-sidebar-accent-foreground" 
                        : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
                      "mr-3 flex-shrink-0 h-5 w-5"
                    )}
                  />
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-sidebar-border">
                <h3 className="px-2 text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
                  Admin
                </h3>
                {adminNav.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      item.href === location.pathname
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md mt-1"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        item.href === location.pathname
                          ? "text-sidebar-accent-foreground"
                          : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground",
                        "mr-3 flex-shrink-0 h-5 w-5"
                      )}
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-sidebar-border p-4">
            <div className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-sidebar-foreground">Sam Wilson</p>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-xs font-medium text-sidebar-foreground/70 hover:text-sidebar-foreground mt-1"
                  >
                    <LogOut className="mr-1 h-3 w-3" /> 
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-lms-background">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
