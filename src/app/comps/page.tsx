"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Grid, Link, Typography } from "@mui/material";
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

  const onSubmit = async (formData: formValues) => {
    try {
      const result = await generateComps(formData.dataString);

      const blob = new Blob([result.csv], {
        type: "text/csv;charset=utf-8",
      });
      saveAs(blob, "comps.csv");
      setData(result.data);
    } catch (err) {
      console.error("Error handling submission:", err);
    }
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

          {data && <DataDisplay {...data} />}
        </Grid>
      </Container>
    </Layout>
  );
}
