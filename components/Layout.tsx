import React, { Fragment, useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SnackContext } from "@/contexts/SnackbarContext";
import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// import MobileNavbar from "../MobileNavbar";

const Layout = ({ children }) => {
  const snackCTX = useContext(SnackContext);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() =>
          snackCTX.setSnackInfo({
            open: false,
            message: "",
            severity: "",
          })
        }
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Fragment>
      <Navbar />
      {/* <MobileNavbar /> */}
      <main className="min-h-[85vh] max-w-[1200px] mx-auto">{children}</main>
      <Footer />
      <Snackbar
        open={snackCTX.snackInfo.open}
        autoHideDuration={5000}
        onClose={() =>
          snackCTX.setSnackInfo({
            open: false,
            message: "",
            severity: "",
          })
        }
        message={snackCTX.snackInfo.message}
      />
    </Fragment>
  );
};

export default Layout;
