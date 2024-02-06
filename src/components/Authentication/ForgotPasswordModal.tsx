import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { useSetRecoilState } from "recoil";
import { authenticationStateAtom } from "@/services/authentication";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export type ForgotPasswordValues = yup.InferType<typeof forgotPasswordSchema>;

export function ForgotPasswordModal({
  open,
  handleClose,
  handleSubmit,
  register,
  errors,
}) {
  const setAuthState = useSetRecoilState(authenticationStateAtom);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component={"form"} onSubmit={handleSubmit}>
        <Typography
          id="forgot-password-modal-title"
          variant="h6"
          component="h2"
        >
          Forgot Password
        </Typography>
        <Typography id="forgot-password-modal-description" sx={{ mt: 2 }}>
          Enter your email address and we'll send you a link to reset your
          password.
        </Typography>
        <TextField
          {...register("lastName")}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          sx={{ mt: 2 }}
        />
        <Button onClick={() => setAuthState("signIn")}>Login</Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Link
        </Button>
      </Box>
    </Modal>
  );
}
