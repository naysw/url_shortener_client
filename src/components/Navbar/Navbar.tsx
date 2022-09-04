import { Link } from "react-router-dom";
import { APP_NAME } from "../../config/app";
import useAuth from "../../hooks/useAuth";
import { Paths } from "../../paths";
import { hasRole, Roles } from "../../utils/roles";
import NavMenuLink from "../NavMenuLink";
import UserAccount from "../UserAccount";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="my-6 flex items-center mb-8">
      <div className="flex-1">
        <Link to={Paths.HOME}>
          <h1 className=" font-bold text-4xl">{APP_NAME}</h1>
        </Link>
      </div>

      <div>
        {user ? (
          <div className="mx-4 flex space-x-4">
            <NavMenuLink to={Paths.HOME}>Home</NavMenuLink>
            {hasRole(user.roles, Roles.ADMIN) && (
              <NavMenuLink to={Paths.ADMIN}>Admin</NavMenuLink>
            )}
            <button onClick={logout}>Logout</button>
          </div>
        ) : null}
      </div>

      <UserAccount />
    </div>
  );
};

export default Navbar;
