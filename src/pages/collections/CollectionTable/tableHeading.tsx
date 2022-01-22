import React from "react";
import TableCell from "@mui/material/TableCell";
import IntlMessages from "@crema/utility/IntlMessages";
import TableRow from "@mui/material/TableRow";
import { Fonts } from "../../../shared/constants/AppEnums";

const TableHeading = () => {
  return (
    <TableRow
      sx={{
        "& th": {
          fontSize: 13,
          padding: 2,
          fontWeight: Fonts.BOLD,
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
    >
      <TableCell align="center" className="tableCell">
        <IntlMessages id="collection.table.collectionName" />
      </TableCell>
      <TableCell align="center" className="tableCell">
        <IntlMessages id="collection.table.address" />
      </TableCell>
      <TableCell align="center" className="tableCell">
        <IntlMessages id="collection.table.creationDate" />
      </TableCell>
      <TableCell align="center" className="tableCell">
        <IntlMessages id="collection.table.updateDate" />
      </TableCell>
      <TableCell align="center" className="tableCell">
        <IntlMessages id="collection.table.action" />
      </TableCell>
    
    </TableRow>
  );
};

export default TableHeading;
