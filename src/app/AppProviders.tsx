"use client";
import { RecoilRoot } from "recoil";
import { Amplify } from "aws-amplify";
import RecoilNexus from "recoil-nexus";
import { SnackbarProvider } from "notistack";

import "./globals.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_APP_CLIENT_ID,
    },
  },
});

export function AppProviders({ children }) {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <SnackbarProvider>{children}</SnackbarProvider>
    </RecoilRoot>
  );
}
