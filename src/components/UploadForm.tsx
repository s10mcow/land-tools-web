"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { csvDataAtom, dataAtom } from "@/services/csv";
import { processFile } from "@/services/api";

function UploadForm({ comps }) {
  const setRowData = useSetRecoilState(dataAtom);
  const setCSVData = useSetRecoilState(csvDataAtom);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const schema = yup
    .object({
      comp: yup.string().required(),
      upperPercent: yup.number().required(),
      lowerPercent: yup.number().required(),
      refId: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comp: comps,
      upperPercent: 80,
      lowerPercent: 60,
      refId: "ref",
    },
  });

  const onSubmit = async (data) => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      const result = await processFile({
        selectedFile,
        comp: data.comp,
        upperPercent: data.upperPercent,
        lowerPercent: data.lowerPercent,
        refId: data.refId,
      });

      setRowData(result.data);
      setCSVData({
        us: result.us,
        nonUs: result.nonUs,
        combined: result.combined,
      });
      window.scrollTo({ top: 9999, behavior: "smooth" });
    } catch (error) {
      console.error("Error processing file:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <TextField
        {...register("comp")}
        error={!!errors.comp}
        helperText={errors.comp?.message}
        margin="normal"
        required
        fullWidth
        label="Price Per Sq Ft Comparable"
        autoFocus
      />

      <TextField
        {...register("upperPercent")}
        error={!!errors.upperPercent}
        helperText={errors.upperPercent?.message}
        margin="normal"
        required
        fullWidth
        label="Upper Bound (Cents on the dollar)"
        type="number"
      />
      <TextField
        {...register("lowerPercent")}
        error={!!errors.lowerPercent}
        helperText={errors.lowerPercent?.message}
        margin="normal"
        required
        fullWidth
        label="Lower Bound (Cents on the dollar)"
        type="number"
      />
      <TextField
        {...register("refId")}
        error={!!errors.refId}
        helperText={errors.refId?.message}
        margin="normal"
        required
        fullWidth
        label="Reference Id for mailer"
        type="text"
      />
      <input
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="outlined"
          fullWidth
          component="span"
          sx={{ mt: 2, mb: 2 }}
        >
          Upload File
        </Button>
      </label>
      {selectedFile && (
        <Typography variant="caption">Filname: {selectedFile?.name}</Typography>
      )}
      <Divider />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Get Offers
      </Button>
    </Box>
  );
}

export default UploadForm;
