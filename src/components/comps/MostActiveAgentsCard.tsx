import { Box, Card, CardContent, Link, Paper, Typography } from "@mui/material";
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
      </CardContent>
    </Card>
  );
};
