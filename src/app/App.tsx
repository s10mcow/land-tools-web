"use client";
import { Suspense, useEffect } from "react";
import { authenticate } from "@/services/authentication";
import { LoadingScreen } from "@/components/LoadingScreen";

export function App({ children }) {
  useEffect(() => {
    authenticate();
  }, []);

  return <Suspense fallback={<LoadingScreen isLoading />}>{children}</Suspense>;
}
