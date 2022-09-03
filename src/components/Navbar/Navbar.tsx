import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Paths } from "../../paths";
import NavMenuLink from "../NavMenuLink";
import UserAccount from "../UserAccount";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="my-6 flex items-center mb-8">
      <div className="flex-1">
        <Link to={Paths.HOME}>
          <h1 className=" font-bold text-4xl">Shorten URLs</h1>
        </Link>
      </div>

      <div>
        {user ? (
          <div className="mx-4 flex space-x-4">
            <NavMenuLink to={Paths.HOME}>Home</NavMenuLink>
            <NavMenuLink to={Paths.ADMIN}>Admin</NavMenuLink>
            <button onClick={logout}>Logout</button>
          </div>
        ) : null}
      </div>

      <UserAccount />
    </div>
  );
};

export default Navbar;
