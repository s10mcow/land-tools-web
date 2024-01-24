import { Box, Button, TextField } from "@mui/material";
import React from "react";

export const CompForm = ({ handleSubmit, errors, register }) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        rows={5}
        label="Data"
        type="text"
        autoFocus
        {...register("dataString")}
        error={!!errors.dataString}
        helperText={errors.dataString?.message}
      />

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>
    </form>
  );
};
