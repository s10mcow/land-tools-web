"use client";
import { Suspense, useEffect } from "react";
import { useAuthenticationMutation } from "@/services/authentication";
import { LoadingScreen } from "@/components/LoadingScreen";
import { FullScreenCircularProgress } from "@/components/FullScreenCircularLoader";

export function App({ children }) {
  const {
    isPending,
    mutate: authenticate,
    error: authenticateError,
  } = useAuthenticationMutation();

  useEffect(() => {
    authenticate();
  }, []);
  if (isPending) return <FullScreenCircularProgress />;

  return <Suspense fallback={<LoadingScreen isLoading />}>{children}</Suspense>;
}
