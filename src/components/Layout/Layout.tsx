import React from "react";

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return <div>{children}</div>;
};

Layout.displayName = "Layout";

export default Layout;
