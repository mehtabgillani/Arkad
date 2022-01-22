import { FC, useState } from "react";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableHeading from "./tableHeading";
import TableItem from "./TableItem";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Grid, TextField } from "@mui/material";
import AppSelect from "@crema/core/AppSelect";
import { useIntl } from "react-intl";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface FuncProp {
  collectionsList?: any;
  filter?: string;
  setFilter?: any;
  search?: string;
  setSearch?: any;
  page?: any;
  setPage?: any;
  rowsPerPage?: any;
  setRowsPerPage?: any;
}
const CollectionBoardTable: FC<FuncProp> = ({
  collectionsList,
  filter,
  setFilter,
  setSearch,
  search,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const { messages } = useIntl();

  return (
    <TableContainer sx={{ borderRadius: "20px" }} component={Paper}>
      <Grid item xs={12} lg={12} style={{ padding: 20, display: "flex" }}>
        <Grid item lg={3} sm={6} xs={12} mb={6}>
          <TextField
            className="textFieldDesign"
            fullWidth
            placeholder="Search Text"
            label="Search"
            value={search}
            onChange={(event: any) => {
              setSearch(event.target.value);
            }}
          />
        </Grid>
        <Grid style={{ textAlign: "end" }} item lg={9} sm={6} xs={12} mb={6}>
          <AppSelect
            menus={[
              messages["collection.filter.registered"],
              messages["collection.filter.unregistered"],
            ]}
            defaultValue={messages["collection.filter.registered"]}
            onChange={(event: any) => {
              setFilter(event);
              setSearch('');
              setRowsPerPage(10);
            }}
          />
        </Grid>
       
      </Grid>

      {
       collectionsList.collections &&  collectionsList.collections.length > 0 ?
        <>
            <Table>
        <TableHead>
          <TableHeading />
        </TableHead>

        <TableBody>
          {collectionsList.collections &&
            collectionsList.collections.map((row: any) => (
              <TableItem key={row.id} row={row} filter={filter} />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={7}
              count={collectionsList && collectionsList.count ? collectionsList.count : 0 }
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
        </>
        :
        <>
        <p style={{margin:'0px 20px 20px 20px',fontSize:'22px'}}> No Data Available</p>
        </>
      }
  
    </TableContainer>
  );
};

export default CollectionBoardTable;
