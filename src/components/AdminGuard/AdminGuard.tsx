import React from "react";
import useAuth from "../../hooks/useAuth";
import { hasRole, Roles } from "../../utils/roles";
import PageLoading from "../PageLoading";

interface Props {}

const AdminGuard: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <PageLoading open />;

  return user && user.roles && hasRole(user.roles, Roles.ADMIN) ? (
    <>{children}</>
  ) : (
    <>You are not authorized to access this page</>
  );
};

export default AdminGuard;
