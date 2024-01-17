"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  CardHeader,
} from "@mui/material";
import Layout from "@/components/Layout";

const LandingPage = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <Layout>
      <Container
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" align="center" gutterBottom>
            Comps or CSV?
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card onClick={() => handleNavigate("/xlsx")}>
                <CardActionArea>
                  <CardHeader title="XLSX -> CSV" />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Have an XLSX file from Propstream? Convert it to CSV.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card onClick={() => handleNavigate("/comps")}>
                <CardActionArea>
                  <CardHeader title="Redfin Comps" />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      Generate comps from Redfin.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default LandingPage;
