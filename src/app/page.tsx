import UploadForm from "./components/UploadForm";
import { Container, Grid, Typography } from "@mui/material";

export default function Home() {
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
        XLSX -> CSV
        </Typography>
        <Typography>Add your comps and the upper and lower percent</Typography>


        <Grid xs={12} md={6} item>
          <UploadForm />
        </Grid>
      </Grid>
    </Container>
  );
}
