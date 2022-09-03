import React from "react";
import Navbar from "../Navbar";

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="container max-w-4xl mx-auto">
      <Navbar />

      {children}
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
