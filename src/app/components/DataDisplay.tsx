import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Link,
} from "@mui/material";

export interface DataDisplayProps {
  lotSizeData: {
    max: number;
    mean: number;
    median: number;
    min: number;
    stdDev: number;
  };
  medianPricePerSqFoot: number;
  priceData: {
    max: number;
    mean: number;
    median: number;
    min: number;
    stdDev: number;
  };
  mostActiveAgents: Array<[string, number, string]>;
}

const DataDisplay = ({
  lotSizeData,
  medianPricePerSqFoot,
  priceData,
  mostActiveAgents,
}: DataDisplayProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
              Min: {lotSizeData.min}
            </Typography>
            <Typography color="textSecondary">
              Standard Deviation: {lotSizeData.stdDev}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Price Data
            </Typography>
            <Typography color="textSecondary">Max: {priceData.max}</Typography>
            <Typography color="textSecondary">
              Mean: {priceData.mean}
            </Typography>
            <Typography color="textSecondary">
              Median: {priceData.median}
            </Typography>
            <Typography color="textSecondary">Min: {priceData.min}</Typography>
            <Typography color="textSecondary">
              Standard Deviation: {priceData.stdDev}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" component="div">
          Most Active Agents
        </Typography>
        {mostActiveAgents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent[0]}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6">{agent[0]}</Typography>
              <Typography variant="body1">Listings: {agent[1]}</Typography>
              <Link href={agent[2]} target="_blank" rel="noopener noreferrer">
                View Listing
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default DataDisplay;
