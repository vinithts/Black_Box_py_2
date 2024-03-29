import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { deployed_basket_data, logs_data } from "../../controller/data";
import { DeployedBasketTableCell } from "../../controller/styles";
import {
  Dashboard_table_colors,
  primary_colors,
} from "../../controller/colors";

const LogsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          background: Dashboard_table_colors.tableBg,
          boxShadow: "0px 1px 5px 2px rgba(255, 255, 255, 0.25) ",
          color: "#fff",
          borderRadius: "15px",
        }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            flexDirection: "column",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "left", width: "100%", py: 1 }}
          >
            Strategy Name 1
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <TableHead sx={{ color: "#fff" }}>
              <TableRow>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Date
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Strategy
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Strategy ID
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Error
                </DeployedBasketTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ px: "5%" }}>
              {logs_data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <DeployedBasketTableCell>
                        {row.date}
                      </DeployedBasketTableCell>

                      <DeployedBasketTableCell>
                        {row.strategy}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        {row.strategy_id}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        {row.error}
                      </DeployedBasketTableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          sx={{ color: primary_colors.white }}
          count={deployed_basket_data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default LogsTable;
