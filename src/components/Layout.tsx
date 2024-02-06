"use client";
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { LoginModal } from "@/components/Authentication/LoginModal";
import { Authentication } from "@/components/Authentication/Authentication";
import NavigationBar from "@/components/NavigationBar";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "@/services/loading";
import LoadingWrapper from "@/components/Loading";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const isLoading = useRecoilValue(loadingAtom);
  return (
    <LoadingWrapper isLoading={isLoading}>
      <Authentication />
      <NavigationBar />
      {children}
    </LoadingWrapper>
  );
};

export default Layout;
