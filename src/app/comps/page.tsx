"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { saveAs } from "file-saver";
import DataDisplay, { DataDisplayProps } from "@/components/comps/DataDisplay";
import Layout from "@/components/Layout";
("www.redfin.com/stingray/api/gis?al");
export default function Comps() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<DataDisplayProps | null>(null);
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://pcpd8v3hr1.execute-api.us-east-1.amazonaws.com/dev/comps/generate",
        // "http://localhost:1337/comps/generate",
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
      console.log(result.data.homes);
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Layout>
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
            {"Redfin Data -> CSV"}
          </Typography>

          <Link href="/howto">How to use this?</Link>

          <Grid xs={12} item>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                multiline
                rows={5}
                label="Data"
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
    </Layout>
  );
}
