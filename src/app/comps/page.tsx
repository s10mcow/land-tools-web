"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { saveAs } from "file-saver";
import DataDisplay from "@/app/components/DataDisplay";

export default function Comps() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<Record<string, {}> | null>(null);
  async function handleSubmit(event) {
    setData(null);
    event.preventDefault();
    try {
      const response = await fetch(
        // "https://w0lg4rzm60.execute-api.us-east-1.amazonaws.com/dev/comps/genrate",
        "http://localhost:1337/comps/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        },
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const result = await response.json();
      const blob = new Blob([result.csv], {
        type: "text/csv;charset=utf-8",
      });
      saveAs(blob, "comps.csv");
      console.log(result.data);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container style={{ height: "100vh" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h2" align="center" sx={{ mb: 2 }}>
          {"URL -> CSV"}
        </Typography>

        <Grid xs={12} md={6} item>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="URL"
              type="text"
              autoFocus
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />

            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Grid>

        {data && <DataDisplay {...data} />}
      </Grid>
    </Container>
  );
}
