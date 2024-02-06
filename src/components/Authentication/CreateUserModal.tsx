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

export const createUserSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type CreateUserValues = yup.InferType<typeof createUserSchema>;

export function CreateUserModal({
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
        <Typography id="create-user-modal-title" variant="h6" component="h2">
          Create New Account
        </Typography>
        <TextField
          {...register("firstName")}
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          error={!!errors.dataString}
          helperText={errors.dataString?.message}
        />
        <TextField
          {...register("lastName")}
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
          autoFocus
          error={!!errors.dataString}
          helperText={errors.dataString?.message}
        />

        <TextField
          {...register("email")}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          error={!!errors.dataString}
          helperText={errors.dataString?.message}
        />
        <TextField
          {...register("password")}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          error={!!errors.dataString}
          helperText={errors.dataString?.message}
        />
        <Button onClick={() => setAuthState("signIn")}>Login</Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create Account
        </Button>
      </Box>
    </Modal>
  );
}
