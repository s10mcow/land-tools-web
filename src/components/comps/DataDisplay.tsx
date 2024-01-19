import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Link,
  Box,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { PriceCard } from "@/components/comps/PriceCard";
import { LotSizeCard } from "@/components/comps/LotSizeCard";
import { MedianSqFtPriceCard } from "@/components/comps/MedianSqFtPriceCard";
import { MostActiveAgentsCard } from "@/components/comps/MostActiveAgentsCard";
import { DataGrid } from "@mui/x-data-grid";

type itemData = {
  max: number;
  mean: number;
  median: number;
  min: number;
  stdDev: number;
  midMean: number;
};
export interface DataDisplayProps {
  organizedData: {
    lessThan10k: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    tenTo15k: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    fifteenTo20k: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    twentyTo30k: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    thirtyTo1: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    lessThan1: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    oneToTwo: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    twoToFive: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    fiveToTen: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    tenToTwenty: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    twentyToForty: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    fortyToOneHundred: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
    moreThanOneHundred: {
      lotSizeData: itemData;
      medianPricePerSqFoot: number;
      priceData: itemData;
    };
  };
  mostActiveAgents: Array<[string, number, string]>;
}

const columns = [
  { field: "city", headerName: "City", minWidth: 50, flex: 0.5 },
  { field: "zip", headerName: "Zip", minWidth: 50, flex: 0.5 },
  {
    field: "listingAgent",
    headerName: "Listing Agent",
    minWidth: 50,
    flex: 0.5,
  },
  {
    field: "lotSize",
    headerName: "Lot Size",
    minWidth: 50,
    flex: 0.5,
    valueFormatter: (params) => {
      return params.value
        ? `${Number(params.value).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`
        : "";
    },
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 50,
    flex: 0.5,
    valueFormatter: (params) => {
      return params.value
        ? `$${Number(params.value).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : "";
    },
  },
  {
    field: "soldDate",
    headerName: "Sold (Days Ago)",
    minWidth: 50,
    flex: 0.5,
    valueFormatter: (params) => {
      return Number(params.value);
    },
  },
  {
    field: "url",
    headerName: "Link",
    minWidth: 50,
    flex: 0.5,
    renderCell: (params) => {
      return (
        <Link href={params.value} target={"_blank"}>
          Url
        </Link>
      );
    },
  },
];

const keyToTitle = {
  lessThan10k: "Less than 10k sqft",
  tenTo15k: "10k sqft to 15k sqft",
  fifteenTo20k: "15k sgft to 20k sqft",
  twentyTo30k: "20k sqft to 30k sqft",
  thirtyTo1: "30k sqft to 1 Acre",
  lessThan1: "Less Than 1 Acre (Sum of the above) ☝️",
  oneToTwo: "1 to 2 Acres",
  twoToFive: "2 to 5 Acres",
  fiveToTen: "5 to 10 Acres",
  tenToTwenty: "10 to 20 Acres",
  twentyToForty: "20 to 40 Acres",
  fortyToOneHundred: "40 to 100 Acres",
  moreThanOneHundred: "More Than 100 Acres",
};
const DataDisplay = ({
  organizedData,

  mostActiveAgents,
}: DataDisplayProps) => {
  return (
    <Container>
      <Grid container mb={10} mt={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Overall Most Active Agents</Typography>
          <Box display="flex" flexWrap="wrap" mt={2}>
            {mostActiveAgents.map((agent) => (
              <Paper
                elevation={3}
                sx={{ padding: 2, margin: 1 }}
                key={agent[0]}
              >
                <Typography variant="h6">{agent[0]}</Typography>
                <Typography variant="body1">Listings: {agent[1]}</Typography>
                <Link href={agent[2]} target="_blank" rel="noopener noreferrer">
                  View Listing
                </Link>
              </Paper>
            ))}
          </Box>
        </Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item>
            <Typography variant="h4">Listings Data by Lot Size</Typography>
          </Grid>
          {Object.keys(organizedData).map((key) => (
            <Grid item xs={12} key={key}>
              <Accordion>
                <AccordionSummary>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flex: 1,
                    }}
                  >
                    <Typography variant={"h5"}>{keyToTitle[key]}</Typography>

                    <Typography variant={"h5"}>
                      {organizedData[key].data.length} Listings
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {organizedData[key].data.length === 0 ? (
                    <Typography variant="body1">
                      No listings in this category
                    </Typography>
                  ) : (
                    <>
                      <Grid container spacing={2}>
                        <Grid item>
                          <PriceCard priceData={organizedData[key].priceData} />
                        </Grid>
                        <Grid item>
                          <LotSizeCard
                            lotSizeData={organizedData[key].lotSizeData}
                          />
                        </Grid>
                        <Grid item>
                          <MedianSqFtPriceCard
                            medianPricePerSqFoot={
                              organizedData[key].medianPricePerSqFoot
                            }
                          />
                        </Grid>
                        <Grid item>
                          <MostActiveAgentsCard
                            mostActiveAgents={
                              organizedData[key].mostActiveAgents
                            }
                          />
                        </Grid>
                      </Grid>
                      <Accordion>
                        <AccordionSummary>
                          <Typography variant="h5">Listings</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <DataGrid
                            rows={organizedData[key].data}
                            columns={columns}
                            getRowId={(row) => row.price}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DataDisplay;
