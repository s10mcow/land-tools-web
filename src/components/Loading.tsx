import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";

function LoadingWrapper({ isLoading, children }) {
  return (
    <>
      {children}
      {isLoading && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 111,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly dark, opaque background
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default LoadingWrapper;
