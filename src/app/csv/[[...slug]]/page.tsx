"use client";
import UploadForm from "@/components/UploadForm";
import { Container, Grid, Link, Typography } from "@mui/material";
import Layout from "@/components/Layout";

export default function CSV({ params }: { params: { slug: string } }) {
  console.log(params);
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
            {"XLSX -> CSV"}
          </Typography>
          <Typography>
            Add your comps and the upper and lower percent
          </Typography>

          <Grid xs={12} md={6} item>
            <UploadForm comps={params.slug || ""} />
          </Grid>

          {/*<Grid>*/}
          {/*  <Link href="/comps">*/}
          {/*    <a>Need Comps? Try this...</a>*/}
          {/*  </Link>*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </Layout>
  );
}
