"use client";
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link
            href="/"
            passHref
            style={{
              cursor: "pointer",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Typography variant="h6">Land Tools</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <>{children}</>
    </>
  );
};

export default Layout;
