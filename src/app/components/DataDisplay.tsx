import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const DataDisplay = ({ lotSizeData, medianPricePerSqFoot, priceData }) => {
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
    </Grid>
  );
};

export default DataDisplay;
