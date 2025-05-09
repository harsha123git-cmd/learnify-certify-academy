
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  onSignInClick?: () => void;
  onRegisterClick?: () => void;
}

const Layout = ({ children, onSignInClick, onRegisterClick }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-sidebar">
            <Sidebar 
              onSignInClick={onSignInClick} 
              onRegisterClick={onRegisterClick} 
            />
          </SheetContent>
        </Sheet>
      ) : (
        <div className="w-[250px] hidden md:block">
          <Sidebar 
            onSignInClick={onSignInClick} 
            onRegisterClick={onRegisterClick} 
          />
        </div>
      )}
      <div className="flex-1 overflow-auto">
        <div className="container py-6 md:py-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
