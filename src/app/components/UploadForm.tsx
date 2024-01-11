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

function UploadForm() {
  const [median, setMedian] = useState<number | undefined>(undefined);
  const [average, setAverage] = useState<number | undefined>(undefined);
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

    if (
      !selectedFile ||
      !median ||
      !average ||
      !upperPercent ||
      !lowerPercent
    ) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("comps", JSON.stringify({ median, average }));
    formData.append("upperPercent", upperPercent?.toString());
    formData.append("lowerPercent", lowerPercent?.toString());

    try {
      const response = await fetch("http://localhost:3001/process-excel", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      const goodBlob = new Blob([result.goodOffers], {
        type: "text/csv;charset=utf-8",
      });
      saveAs(goodBlob, "goodOffers.csv");

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
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            name="splitFiles"
            color="primary"
          />
        }
        label="Split Files into good and bad offers"
      />
      <Grid xs={6}>
        <Typography variant="caption">
          Check the box if you want to split into 2 csv files based on your
          offer and the last purchase price - if your offer is lower than the
          last purchase price, it will be in the bad offers file.
        </Typography>
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Median Price Comparables"
        type="number"
        autoFocus
        value={median}
        onChange={(e) => setMedian(Number(e.target.value))}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Average Price Comparables"
        type="number"
        value={average}
        onChange={(e) => setAverage(Number(e.target.value))}
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
        Submit
      </Button>
    </Box>
  );
}

export default UploadForm;
