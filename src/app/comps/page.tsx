"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Container, Grid, Link, Typography } from "@mui/material";
import DataDisplay, { DataDisplayProps } from "@/components/comps/DataDisplay";
import Layout from "@/components/Layout";
import { generateComps } from "@/services/api";
import { saveAs } from "file-saver";
import { CompForm } from "@/components/CompForm";

const schema = yup
  .object({
    dataString: yup.string().required("Data is required"),
  })
  .required();

export type formValues = yup.InferType<typeof schema>;

export default function Comps() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [data, setData] = useState<DataDisplayProps | null>(null);
  const [csvData, setCSVData] = useState<string | null>(null);
  const onSubmit = async (formData: formValues) => {
    try {
      const result = await generateComps(formData.dataString);

      setCSVData(result.csv);
      setData(result.data);
    } catch (err) {
      console.error("Error handling submission:", err);
    }
  };

  const downloadCSV = () => {
    if (!csvData) {
      alert("No CSV data found!");
      return;
    }

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "comps.csv");
  };

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
            <CompForm
              handleSubmit={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
            />
          </Grid>

          {data && (
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h4" gutterBottom>
                    CSV Data
                  </Typography>

                  <Button variant={"contained"} onClick={downloadCSV}>
                    Download Data in CSV
                  </Button>
                </Grid>
                <DataDisplay {...data} />
              </Grid>
            </Container>
          )}
        </Grid>
      </Container>
    </Layout>
  );
}
