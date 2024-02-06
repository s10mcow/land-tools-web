import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { authenticationStateAtom } from "@/services/authentication";
import { useSetRecoilState } from "recoil";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type LoginValues = yup.InferType<typeof loginSchema>;

export const LoginModal = ({
  open,
  handleClose,
  handleSubmit,
  register,
  errors,
}) => {
  const setAuthState = useSetRecoilState(authenticationStateAtom);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component={"form"} onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2">
          Login
        </Typography>
        <TextField
          {...register("email")}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
          error={!!errors.dataString}
          helperText={errors.dataString?.message}
        />
        <Button onClick={() => setAuthState("forgotPassword")}>
          Forgot Password?
        </Button>
        <Button onClick={() => setAuthState("signUp")}>Sign Up</Button>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Modal>
  );
};
