
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, Clock, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Courses",
    href: "/courses",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    label: "Certificates",
    href: "/certificates",
    icon: <Award className="h-5 w-5" />,
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: <Users className="h-5 w-5" />,
  },
];

interface SidebarProps {
  onSignInClick?: () => void;
  onRegisterClick?: () => void;
}

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground p-4 border-r border-sidebar-border">
      <div className="flex items-center justify-between mb-8 pt-2">
        <Link to="/dashboard" className="flex items-center">
          <h1 className="text-2xl font-bold text-sidebar-primary">
            LearnifyEDU
          </h1>
        </Link>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              location.pathname === item.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
