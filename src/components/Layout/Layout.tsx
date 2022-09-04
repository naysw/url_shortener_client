import React from "react";
import Container from "../../nsw/ui/components/Container";
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
    <div className="">
      <Container className="">
        <Navbar />

        <DialogUI />

        {children}
      </Container>
    </div>
  );
};

Layout.displayName = "Layout";

export default Layout;
