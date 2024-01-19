import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { formatPrice } from "@/services/comps";

export const PriceCard = ({ priceData }) => {
  return (
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
        </Typography>
        <Typography color="textSecondary">
          Min: {formatPrice(priceData.min)}
        </Typography>
        <Typography color="textSecondary">
          Standard Deviation: {formatPrice(priceData.stdDev)}
        </Typography>
      </CardContent>
    </Card>
  );
};
