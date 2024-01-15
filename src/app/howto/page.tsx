import Layout from "@/components/Layout";
import { Container, Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
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
          <Grid xs={12}>
            <Typography>
              1. Go to{" "}
              <a
                href="https://www.redfin.com/city/23728/FL/Lehigh-Acres"
                target={"_blank"}
              >
                Redfin (Leigh Acres is the example)
              </a>{" "}
              and search for your comps
            </Typography>

            <Typography>
              2. Open the{" "}
              <a
                href={"https://developer.chrome.com/docs/devtools/open"}
                target={"_blank"}
              >
                developer tools
              </a>{" "}
              (Typically right click and select "Inspect" or "Inspect Element",
              just dont right click on the map)
            </Typography>

            <Typography>3. Click on the "Network" tab</Typography>

            <Typography>
              4. Command + F (Mac) or Ctrl + F (Windows) to find a url on the
              page
            </Typography>

            <Typography>
              5. In the search bar enter: "www.redfin.com/stingray/api/gis?al"
            </Typography>

            <Typography>
              6. Click on the url that appears in the search results
            </Typography>

            <Typography>7. Double click on the URL that blinks</Typography>

            <Typography>
              8. Select all and copy the JSON response you see in the page
            </Typography>

            <Typography>
              9. Paste the JSON response into the text box
            </Typography>

            <Link href={"/comps"}>Try it out!</Link>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
