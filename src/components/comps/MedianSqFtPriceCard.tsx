import { Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";

import { useRouter } from "next/navigation";

export const MedianSqFtPriceCard = ({ medianPricePerSqFoot }) => {
  const router = useRouter();

  const handleUseAsComp = (value) => {
    // Modify the URL as needed, e.g., /new-page?value=value
    router.push(`/xlsx/${value}`);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Median Price
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {`$${medianPricePerSqFoot.toFixed(2)} / sqft`}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => handleUseAsComp(medianPricePerSqFoot)}
        >
          Use as Comp
        </Button>
      </CardContent>
    </Card>
  );
};
