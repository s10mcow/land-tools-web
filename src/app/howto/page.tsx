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
                href="https://www.redfin.com/city/23728/FL/Lehigh-Acres/filter/include=sold-3mo,viewport=26.77208:26.43287:-81.53875:-81.78422"
                target={"_blank"}
              >
                Redfin (Leigh Acres is the example)
              </a>{" "}
              and search for your comps by drawing on a region. If the region is
              too large Redfin doesnt return us the data we are looking for.
            </Typography>

            <Typography>
              2. Open the{" "}
              <a
                href={"https://developer.chrome.com/docs/devtools/open"}
                target={"_blank"}
              >
                developer tools
              </a>{" "}
              (Typically right the Redfin logo in the top left corner and select
              {"Inspect"} or {"Inspect Element"})
            </Typography>

            <Typography>
              3. The devtools will then be open. On the top bar click on the
              {"Network"} tab
            </Typography>

            <Typography>
              4. Command + F (Mac) or Ctrl + F (Windows) to find a url on the
              page
            </Typography>

            <Typography>
              5. In the search bar enter: {"www.redfin.com/stingray/api/gis?al"}
              and hit the enter key. If it doesnt show up drag the map a little
              to invoke another search and then try again, but pushing the
              circular arrow.
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

            <Typography>
              10. <Link href={"/comps"}>Try it out!</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
