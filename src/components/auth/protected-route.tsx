import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute