import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { BattleTableData } from "types/models/battleTable";
import moment from "moment";

interface TableItemProps {
  row: BattleTableData;
}

const TableItem: React.FC<TableItemProps> = ({ row }) => {
  return (
    <TableRow
      sx={{
        "& .tableCell": {
          fontSize: 13,
          padding: 2,
          whiteSpace: "nowrap",
          "&:first-of-type": {
            pl: 5,
          },
          "&:last-of-type": {
            pr: 5,
          },
        },
      }}
      className="item-hover"
    >
      
      <TableCell align="center" className="tableCell">
      BoredApeYachtClub
      </TableCell>
      <TableCell align="center" className="tableCell">
        15
      </TableCell>
      <TableCell align="center" className="tableCell">
      Alex Hales
      </TableCell>
      <TableCell align="center" className="tableCell">
      {moment(row.startTime).format("YYYY-MM-DD HH:mm:ss")}
      </TableCell>
      <TableCell align="center" className="tableCell">
      {moment(row.endTime).format("YYYY-MM-DD HH:mm:ss")}
      </TableCell>
      <TableCell align="center" className="tableCell">
      {row.isLive ? "Live" : "Pending"}
      </TableCell>
  
    </TableRow>
  );
};

export default TableItem;
