import React from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../../nsw/ui/components/Button";
import { hasRole, Roles } from "../../utils/roles";

interface Props {}

const AdminGuard: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { user, logout } = useAuth();

  // if (!user) return <PageLoading open />;

  return user && user.roles && hasRole(user.roles, Roles.ADMIN) ? (
    <>{children}</>
  ) : (
    <div className="text-center py-8">
      <div className="mb-4">You are not authorized to access this page</div>

      <Button onClick={logout} className="bg-red-600 text-white">
        Logout
      </Button>
    </div>
  );
};

export default AdminGuard;
