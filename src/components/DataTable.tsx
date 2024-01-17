"use client";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Button, ButtonGroup, Container, Grid } from "@mui/material";
import { csvDataAtom, dataAtom } from "@/services/csv";
import { useRecoilValue } from "recoil";
import { saveAs } from "file-saver";
const columns = [
  { field: "apn", headerName: "APN", minWidth: 120, flex: 0.5 },
  {
    field: "propertyAddress",
    headerName: "Property Address",
    width: 100,
    flex: 0.5,
  },
  { field: "county", headerName: "County", minWidth: 50, flex: 0.3 },
  { field: "state", headerName: "State", minWidth: 50, flex: 0.3 },
  { field: "zip", headerName: "Zip", minWidth: 50, flex: 0.3 },
  {
    field: "mailingCareOfName",
    headerName: "Mailing Care of Name",
    minWidth: 150,
    flex: 0.75,
  },
  {
    field: "mailingAddress",
    headerName: "Mailing Address",
    minWidth: 150,
    flex: 0.75,
  },
  {
    field: "mailingCity",
    headerName: "Mailing City",
    minWidth: 120,
    flex: 0.5,
  },
  {
    field: "mailingState",
    headerName: "Mailing State",
    minWidth: 100,
    flex: 0.3,
  },
  { field: "mailingZip", headerName: "Mailing Zip", minWidth: 75, flex: 0.3 },
  {
    field: "mailingCountry",
    headerName: "Mailing Country",
    minWidth: 100,
    flex: 0.3,
  },
  {
    field: "lotSize",
    headerName: "Lot Size (sqft)",
    minWidth: 100,
    flex: 0.5,
    valueFormatter: (params) => {
      return params.value
        ? `${Number(params.value).toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`
        : "";
    },
  },
  { field: "acres", headerName: "Acres", minWidth: 70, flex: 0.5 },
  {
    field: "lowerPrice",
    headerName: "Lower Price",
    minWidth: 100,
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
    field: "upperPrice",
    headerName: "Upper Price",
    minWidth: 100,
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
    field: "lastSaleAmount",
    headerName: "Last Sale Amount",
    minWidth: 100,
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

  { field: "refId", headerName: "Ref ID", minWidth: 100, flex: 0.5 },
];

export default function DataView() {
  const rows = useRecoilValue(dataAtom);
  const csv = useRecoilValue(csvDataAtom);

  const downloadUsCsv = () => {
    const blob = new Blob([csv.us], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "US-Offers.csv");
  };

  const downloadNonUsCsv = () => {
    const blob = new Blob([csv.nonUs], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "Non-US-Offers.csv");
  };

  const downloadCombinedCsv = () => {
    const blob = new Blob([csv.combined], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "Combined-Offers.csv");
  };

  return (
    <Grid container flexDirection={"column"}>
      <Grid item>
        <DataGrid
          isLoading={rows.length === 0}
          sx={{ height: "90vh" }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 100 },
            },
          }}
          getRowId={(row) => row.apn}
        />
      </Grid>
      <Grid item my={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{ mr: 3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Change Upload Values
          </Button>
          <ButtonGroup variant="contained">
            <Button onClick={downloadUsCsv}>Download USA Offers CSV</Button>
            <Button onClick={downloadNonUsCsv}>
              Download Non-USA Offers CSV
            </Button>
            <Button onClick={downloadCombinedCsv}>
              Download Combined Offers CSV
            </Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </Grid>
  );
}
