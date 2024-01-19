import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { formatPrice } from "@/services/comps";

export const LotSizeCard = ({ lotSizeData }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Lot Size Data
        </Typography>
        <Typography color="textSecondary">Max: {lotSizeData.max}</Typography>
        <Typography color="textSecondary">Mean: {lotSizeData.mean}</Typography>
        <Typography color="textSecondary">
          Median: {lotSizeData.median}
        </Typography>
        <Typography color="textSecondary">
          MidMean: {lotSizeData.midMean}
        </Typography>
        <Typography color="textSecondary">Min: {lotSizeData.min}</Typography>
        <Typography color="textSecondary">
          Standard Deviation: {lotSizeData.stdDev}
        </Typography>
      </CardContent>
    </Card>
  );
};
