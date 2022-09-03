import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Typography from "../../nsw/ui/components/Typography";
import { Paths } from "../../paths";

const UserAccount = () => {
  const { user } = useAuth();

  /**
   * get short name
   *
   * @param name string
   * @returns string
   */
  function getShortName(name: string) {
    return name.slice(0, 2).toUpperCase();
  }

  return (
    <div>
      {user ? (
        <div className="h-10 w-10 bg-red-200 rounded-full p-2 text-center cursor-pointer font-bold shadow">
          <Typography className="text-red-500">
            {getShortName(user?.name)}
          </Typography>
        </div>
      ) : (
        <Link to={Paths.LOGIN}>Login</Link>
      )}
    </div>
  );
};

export default UserAccount;
