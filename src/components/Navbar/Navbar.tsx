import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import NavMenuLink from "../NavMenuLink";
import UserAccount from "../UserAccount";

const Navbar = () => {
  return (
    <div className="my-6 flex items-center mb-8">
      <div className="flex-1">
        <Link to={Paths.HOME}>
          <h1 className=" font-bold text-4xl">Shorten URLs</h1>
        </Link>
      </div>

      <div className="mx-4 flex space-x-4">
        <NavMenuLink to={Paths.HOME}>Home</NavMenuLink>
        <NavMenuLink to={Paths.ADMIN}>Admin</NavMenuLink>
      </div>

      <UserAccount />
    </div>
  );
};

export default Navbar;
