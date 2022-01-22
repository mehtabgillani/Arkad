import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { PlayerTableData } from "types/models/PlayerTable";
import { Box, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { playerDetail,getPlayerCollectionList } from "../../../redux/players/actions";

interface TableItemProps {
  row: PlayerTableData;
}


const TableItem: React.FC<TableItemProps> = ({ row }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleAction = async (id, address) => {
    dispatch(getPlayerCollectionList({id:id}));
    dispatch(playerDetail({
      id:id,
      address:address,
    }))
  }

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
        {row.email ? row.email : "No Information"}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {row.walletAddress ? row.walletAddress : "No Information"}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {row.userCollectionsCount ? row.userCollectionsCount : 0}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {row.userNftsCount ? row.userCollectionsCount : 0}
      </TableCell>
      <TableCell align="center" className="tableCell">
        {row.userCollectionsCount == 0 ?
        <>
          <Button
          variant="outlined"
        disabled
        >
          View Collection
        </Button>
        </>
        :
        <>
          <Button
          variant="outlined"
          onClick={() => {
            handleAction(row.id, row.walletAddress);
          }}
        >
          View Collection
        </Button>
        </>}
      
      </TableCell>
    </TableRow>
  );
};

export default TableItem;
