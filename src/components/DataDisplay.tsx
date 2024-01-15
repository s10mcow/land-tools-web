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
} from "@mui/material";
import { useRouter } from "next/navigation";

export interface DataDisplayProps {
  lotSizeData: {
    max: number;
    mean: number;
    median: number;
    min: number;
    stdDev: number;
    midMean: number;
  };
  medianPricePerSqFoot: number;
  priceData: {
    max: number;
    mean: number;
    median: number;
    min: number;
    stdDev: number;
    midMean: number;
  };
  mostActiveAgents: Array<[string, number, string]>;
}

function formatPrice(price: number): string {
  return `$${price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const DataDisplay = ({
  lotSizeData,
  medianPricePerSqFoot,
  priceData,
  mostActiveAgents,
}: DataDisplayProps) => {
  const router = useRouter();

  const handleUseAsComp = (value) => {
    // Modify the URL as needed, e.g., /new-page?value=value
    router.push(`/csv/${value}`);
  };

  return (
    <Grid container spacing={2}>
      {/* Price Data */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Price Data
            </Typography>
            <Typography color="textSecondary">
              Max: {formatPrice(priceData.max)}
            </Typography>
            <Typography color="textSecondary">
              Mean: {formatPrice(priceData.mean)}
            </Typography>
            <Typography color="textSecondary">
              Median: {formatPrice(priceData.median)}
            </Typography>
            <Typography color="textSecondary">
              MidMean: {formatPrice(priceData.midMean)}
              <Button
                variant="outlined"
                onClick={() => handleUseAsComp(priceData.midMean)}
              >
                Use as Comp
              </Button>
            </Typography>
            <Typography color="textSecondary">
              Min: {formatPrice(priceData.min)}
            </Typography>
            <Typography color="textSecondary">
              Standard Deviation: {formatPrice(priceData.stdDev)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Lot Size Data */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Lot Size Data
            </Typography>
            <Typography color="textSecondary">
              Max: {lotSizeData.max}
            </Typography>
            <Typography color="textSecondary">
              Mean: {lotSizeData.mean}
            </Typography>
            <Typography color="textSecondary">
              Median: {lotSizeData.median}
            </Typography>
            <Typography color="textSecondary">
              MidMean: {lotSizeData.midMean}
            </Typography>
            <Typography color="textSecondary">
              Min: {lotSizeData.min}
            </Typography>
            <Typography color="textSecondary">
              Standard Deviation: {lotSizeData.stdDev}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Median Price per Sq Foot */}
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Median Price per Sq Foot
            </Typography>
            <Typography color="textSecondary">
              {medianPricePerSqFoot}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Most Active Agents */}
      <Grid item xs={12}>
        <Typography variant="h5" component="div">
          Most Active Agents
        </Typography>
        <Box display="flex" flexWrap="wrap">
          {mostActiveAgents.map((agent) => (
            <Paper elevation={3} sx={{ padding: 2, margin: 1 }} key={agent[0]}>
              <Typography variant="h6">{agent[0]}</Typography>
              <Typography variant="body1">Listings: {agent[1]}</Typography>
              <Link href={agent[2]} target="_blank" rel="noopener noreferrer">
                View Listing
              </Link>
            </Paper>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default DataDisplay;
