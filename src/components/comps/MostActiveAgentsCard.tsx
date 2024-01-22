import {
  Accordion,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { formatPrice } from "@/services/comps";

export const MostActiveAgentsCard = ({ mostActiveAgents }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Most Active Agents
        </Typography>
        <Box display="flex" flexWrap="wrap">
          <Grid container spacing={2}>
            {mostActiveAgents.map((agent) => (
              <Grid item key={agent[0]}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{agent[0]}</Typography>
                    <Typography variant="body1">
                      Listings: {agent[1]}
                    </Typography>
                    {agent[2].map((url) => (
                      <Box key={url}>
                        <Link
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Listing
                        </Link>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};
