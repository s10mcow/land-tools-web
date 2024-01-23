"use client";

import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import {
  TextField,
  Button,
  Box,
  Divider,
  Typography,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { saveAs } from "file-saver";
import { useParams, useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { csvDataAtom, dataAtom } from "@/services/csv";
import { appConfig } from "@/services/AppConfig";
const { apiBaseUrl } = appConfig;

function UploadForm({ comps }) {
  const navigation = useRouter();
  const setRowData = useSetRecoilState(dataAtom);
  const setCSVData = useSetRecoilState(csvDataAtom);
  const [refId, setRefId] = useState<string>("");
  const [comp, setComp] = useState<number | undefined>(comps || undefined);
  const [upperPercent, setUpperPercent] = useState<number | undefined>(80);
  const [lowerPercent, setLowerPercent] = useState<number | undefined>(60);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [checked, setChecked] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!selectedFile || !comp || !upperPercent || !lowerPercent || !refId) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("comps", comp?.toString());
    formData.append("upperPercent", upperPercent?.toString());
    formData.append("lowerPercent", lowerPercent?.toString());
    formData.append("refId", refId?.toString());

    try {
      const response = await fetch(`${apiBaseUrl}/xlsx/process`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setRowData(result.data);
      setCSVData({
        us: result.us,
        nonUs: result.nonUs,
        combined: result.combined,
      });
      window.scrollTo({ top: 9999, behavior: "smooth" });

      // Handle the response data here
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Price Per Sq Ft Comparable"
        type="number"
        autoFocus
        value={comp}
        onChange={(e) => setComp(Number(e.target.value))}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        label="Upper Bound (Cents on the dollar)"
        type="number"
        value={upperPercent}
        onChange={(e) => setUpperPercent(Number(e.target.value))}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Lower Bound (Cents on the dollar)"
        type="number"
        value={lowerPercent}
        onChange={(e) => setLowerPercent(Number(e.target.value))}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Reference Id for mailer"
        type="text"
        value={refId}
        onChange={(e) => setRefId(e.target.value)}
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
