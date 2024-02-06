import { atom } from "recoil";
import * as Aws from "@aws-amplify/auth";
import { LoginValues } from "@/components/Authentication/LoginModal";
import { CreateUserValues } from "@/components/Authentication/CreateUserModal";
import { ForgotPasswordValues } from "@/components/Authentication/ForgotPasswordModal";
import { setRecoil } from "recoil-nexus";
import { loadingAtom } from "@/services/loading";
import { useMutation } from "@tanstack/react-query";

export const authenticationStateAtom = atom<
  "signIn" | "signUp" | "forgotPassword" | ""
>({
  key: "authenticationState",
  default: "",
});

export const authenticationUserAtom = atom<Aws.AuthUser | null>({
  key: "authenticationUser",
  default: null,
});

export const authenticatedAtom = atom<boolean>({
  key: "authenticated",
  default: false,
});

export function useAuthenticationMutation() {
  return useMutation({
    mutationFn: authenticate,
    mutationKey: ["authenticate"],
  });
}

export const authenticate = async () => {
  try {
    const user = await Aws.getCurrentUser();
    setRecoil(authenticationUserAtom, user);
    setRecoil(authenticatedAtom, true);
  } catch (error) {
    setRecoil(authenticatedAtom, false);
  }
};

export const signIn = async ({ email, password }: LoginValues) => {
  try {
    setRecoil(loadingAtom, true);
    await Aws.signIn({ username: email, password });
    const user = await Aws.getCurrentUser();
    setRecoil(authenticationUserAtom, user);
    setRecoil(authenticatedAtom, true);
    setRecoil(loadingAtom, false);
    return user;
  } catch (error) {
    setRecoil(loadingAtom, false);
    throw error;
  }
};

export const signOut = async () => {
  await Aws.signOut();
  setRecoil(authenticatedAtom, false);
};

export const signUp = async ({
  firstName,
  lastName,
  email,
  password,
}: CreateUserValues) => {
  try {
    setRecoil(loadingAtom, true);
    await Aws.signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          family_name: lastName,
          given_name: firstName,
        },
      },
    });
    const user = await Aws.getCurrentUser();
    setRecoil(authenticatedAtom, true);
    setRecoil(authenticationUserAtom, user);
    setRecoil(loadingAtom, false);
  } catch (error) {
    setRecoil(loadingAtom, false);
    throw error;
  }
};

export const forgotPassword = async ({ email }: ForgotPasswordValues) => {
  setRecoil(loadingAtom, true);
  await Aws.resetPassword({ username: email });
  setRecoil(loadingAtom, false);
};
