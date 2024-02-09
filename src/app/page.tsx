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
  Link,
} from "@mui/material";
import Layout from "@/components/Layout";

const LandingPage = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <Container sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" align="center" gutterBottom>
          We've moved!
        </Typography>

        <Link href={"https://land-bridge-web.vercel.app/"}>New Home</Link>
      </Grid>
    </Container>
  );
};

export default LandingPage;
