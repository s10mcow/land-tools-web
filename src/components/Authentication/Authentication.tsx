import {
  LoginModal,
  loginSchema,
  LoginValues,
} from "@/components/Authentication/LoginModal";
import React from "react";
import {
  CreateUserModal,
  createUserSchema,
  CreateUserValues,
} from "@/components/Authentication/CreateUserModal";
import {
  ForgotPasswordModal,
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/components/Authentication/ForgotPasswordModal";
import { useRecoilState } from "recoil";
import {
  authenticationStateAtom,
  forgotPassword,
  signIn,
  signUp,
} from "@/services/authentication";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

export const Authentication = () => {
  const [authState, setAuthState] = useRecoilState(authenticationStateAtom);
  const { enqueueSnackbar } = useSnackbar();
  const loginForm = useForm({
    resolver: yupResolver(loginSchema),
  });
  const createUserForm = useForm({
    resolver: yupResolver(createUserSchema),
  });
  const forgotPasswordForm = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const handleLogin = async (data: LoginValues) => {
    try {
      await signIn(data);
      setAuthState("");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log(error);
    }
  };
  const handleClose = () => {
    setAuthState("");
  };

  const handleCreateUser = async (data: CreateUserValues) => {
    try {
      await signUp(data);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.log(error);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordValues) => {
    await forgotPassword(data);
  };

  return (
    <>
      <LoginModal
        open={authState === "signIn"}
        handleClose={handleClose}
        handleSubmit={loginForm.handleSubmit(handleLogin)}
        register={loginForm.register}
        errors={loginForm.formState.errors}
      />
      <CreateUserModal
        open={authState === "signUp"}
        handleClose={handleClose}
        handleSubmit={createUserForm.handleSubmit(handleCreateUser)}
        register={createUserForm.register}
        errors={createUserForm.formState.errors}
      />
      <ForgotPasswordModal
        open={authState === "forgotPassword"}
        handleClose={handleClose}
        handleSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
        register={forgotPasswordForm.register}
        errors={forgotPasswordForm.formState.errors}
      />
    </>
  );
};
