import React from "react";

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="container max-w-4xl mx-auto">
      <div className="my-6">
        <h1 className="mb-8 font-bold text-4xl">Shorten URLs</h1>
      </div>

      {children}
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
