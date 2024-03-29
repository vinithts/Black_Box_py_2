import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { SlOptions } from "react-icons/sl";
import { deployed_basket_data } from "../../controller/data";
import { DeployedBasketTableCell } from "../../controller/styles";
import {
  Dashboard_table_colors,
  primary_colors,
} from "../../controller/colors";
import MultipleSelect from "../elements/MultipleSelect";
import CustomizedButton from "../elements/CustomizedButton";
import { useState } from "react";

const DashboardTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            Deployed Basket
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%" }}
            flexWrap={"wrap"}
          >
            <Box flexGrow={3}>
              <MultipleSelect
                label={"Creator"}
                customizedStyles={{
                  labelColor: Dashboard_table_colors.inputlabel,
                }}
              />
            </Box>
            <Box flexGrow={1}>
              <MultipleSelect
                label={"Execution"}
                customizedStyles={{
                  labelColor: Dashboard_table_colors.inputlabel,
                }}
              />
            </Box>
            <Box flexGrow={1}>
              <MultipleSelect
                label={"Exchange"}
                customizedStyles={{
                  labelColor: Dashboard_table_colors.inputlabel,
                }}
              />
            </Box>
            <Box flexGrow={2}>
              <MultipleSelect
                label={"Status"}
                customizedStyles={{
                  labelColor: Dashboard_table_colors.inputlabel,
                }}
              />
            </Box>
            <Box flexGrow={2}>
              <MultipleSelect
                label={"Broker"}
                customizedStyles={{
                  labelColor: Dashboard_table_colors.inputlabel,
                }}
              />
            </Box>

            <Box flexGrow={1} sx={{ display: "flex", alignItems: "flex-end" }}>
              <CustomizedButton
                value={"Filter"}
                customizedStyles={{
                  backgroundColor: Dashboard_table_colors.buttonPrimary,
                }}
              />
            </Box>
            <Box flexGrow={1} sx={{ display: "flex", alignItems: "flex-end" }}>
              <CustomizedButton
                value={"Reset"}
                variant={"outlined"}
                customizedStyles={{
                  borderColor: Dashboard_table_colors.buttonSecondary,
                }}
              />
            </Box>
            <Box flexGrow={1} sx={{ display: "flex", alignItems: "flex-end" }}>
              <CustomizedButton
                value={"Exit All"}
                customizedStyles={{
                  backgroundColor: Dashboard_table_colors.buttonertiary,
                }}
              />
            </Box>
          </Stack>
        </Toolbar>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"small"}>
            <TableHead sx={{ color: "#fff" }}>
              <TableRow>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Basket (Counter)
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Execution
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Position
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Multiplier | Status
                </DeployedBasketTableCell>
                <DeployedBasketTableCell align={"left"} padding={"normal"}>
                  Total P&L
                </DeployedBasketTableCell>
                <DeployedBasketTableCell
                  align={"left"}
                  padding={"normal"}
                ></DeployedBasketTableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ px: "5%" }}>
              {deployed_basket_data
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
                        {row.basket_counter}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        {row.execution}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        {row.Position}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        {row.multiplier_status}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        {row.total_p_l}
                      </DeployedBasketTableCell>
                      <DeployedBasketTableCell>
                        <Box sx={{ position: "relative" }}>
                          <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <SlOptions color={primary_colors.white} />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            MenuListProps={{
                              "aria-labelledby": "long-button",
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                              style: {
                                width: "20ch",
                              },
                            }}
                          >
                            <MenuItem onClick={handleClose}>Jhon doe</MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                              jhondoe@gmail.com
                            </MenuItem>
                          </Menu>
                        </Box>
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

export default DashboardTable;
