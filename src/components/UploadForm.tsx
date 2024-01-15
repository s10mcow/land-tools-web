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

function UploadForm({ comps }) {
  const [refId, setRefId] = useState<string>("");
  const [comp, setComp] = useState<number | undefined>(comps || undefined);
  const [upperPercent, setUpperPercent] = useState<number | undefined>(
    undefined,
  );
  const [lowerPercent, setLowerPercent] = useState<number | undefined>(
    undefined,
  );
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
      const response = await fetch(
        // "https://w0lg4rzm60.execute-api.us-east-1.amazonaws.com/dev/xlsx/process",
        "http://localhost:1337/xlsx/process",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      const usBlob = new Blob([result.usOffers], {
        type: "text/csv;charset=utf-8",
      });
      saveAs(usBlob, "US-Offers.csv");

      const nonBlob = new Blob([result.nonUsOffers], {
        type: "text/csv;charset=utf-8",
      });
      saveAs(nonBlob, "Non-US-Offers.csv");

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
        label="Upper Percent (0-100)"
        type="number"
        value={upperPercent}
        onChange={(e) => setUpperPercent(Number(e.target.value))}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Lower Percent (0-100)"
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
