import React from "react";
import Navbar from "../Navbar";
import StatisticsDialog from "../StatisticsDialog";
import { useUI } from "../UIContext/UIContext";

interface Props {}

const DialogUI = () => {
  const { dialog, setDialog } = useUI();

  return dialog.name ? (
    <>
      {dialog.name === "LINK_STATISTICS_DIALOG" && (
        <StatisticsDialog
          open
          linkId={dialog.data}
          onClose={() =>
            setDialog({
              name: "",
              data: null,
            })
          }
        />
      )}
    </>
  ) : null;
};

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="container max-w-4xl mx-auto">
      <Navbar />

      <DialogUI />

      {children}
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
