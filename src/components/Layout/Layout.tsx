import React from "react";
import { Link } from "react-router-dom";
import { Paths } from "../../paths";
import UserAccount from "../UserAccount";

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="container max-w-4xl mx-auto">
      <div className="my-6 flex items-center mb-8">
        <div className="flex-1">
          <Link to={Paths.HOME}>
            <h1 className=" font-bold text-4xl">Shorten URLs</h1>
          </Link>
        </div>

        <UserAccount />
      </div>

      {children}
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
