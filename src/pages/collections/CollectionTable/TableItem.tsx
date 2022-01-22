import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "@mui/material/TableCell";
import { Box, Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { CollectionTableData } from "types/models/collectionTable";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { collectionAddress } from "../../../redux/collections/actions";

interface TableItemProps {
  row: CollectionTableData;
  filter?: any;
}

const TableItem: React.FC<TableItemProps> = ({ row, filter }) => {
  const history = useHistory();
  const dispatch = useDispatch();
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
        {row.name}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {row.address}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {moment(row.updatedAt).format("DD/MM/YYYY")}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {moment(row.createdAt).format("DD/MM/YYYY")}
      </TableCell>
      {filter == "Registered Collections" ? (
        <TableCell align="center" className="tableCell">
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(
                collectionAddress({
                  address: row.address,
                  action: "Registered Collections",
                  id: row.id,
                })
              );
              history.push("/admin/collections/view-collection");
            }}
          >
            View Collection
          </Button>
        </TableCell>
      ) : (
        <TableCell align="center" className="tableCell">
          <Button
            variant="outlined"
            onClick={() => {
              dispatch(
                collectionAddress({
                  address: row.address,
                  action: "Unregistered Collections",
                  id: row.id,
                })
              );
              history.push("/admin/collections/view-collection");
            }}
          >
            View Collection
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default TableItem;
