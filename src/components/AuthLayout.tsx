
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkUrl: string;
}

const AuthLayout = ({
  children,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkUrl,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-lms-background to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-lms-primary mb-1">LearnifyEDU</h1>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            {footerText}{" "}
            <Link to={footerLinkUrl} className="font-medium text-lms-primary hover:text-lms-primary/80">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
