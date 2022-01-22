import { FC, useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppGridContainer } from "../../@crema";
import { Fonts } from "../../shared/constants/AppEnums";
import { Box, Grid, TextField } from "@mui/material";
import AppAnimate from "../../@crema/core/AppAnimate";
import IntlMessages from "../../@crema/utility/IntlMessages";
import PlayerTable from "./LeaderBoardTable";
import {
  getPlayersList,
} from "../../redux/players/actions";
import "./style.css";
const initialValue = [
  {
    id: 14,
    userName: "Jermiah",
    uniqueUserId: null,
    email: null,
    phoneNumber: null,
    gender: null,
    isActive: 1,
    profileImg:
      "https://hsb-bucket.s3.us-east-2.amazonaws.com/1639721415264-welcome.png",
    dob: null,
    experiencePoints: 0,
    emailNotifications: 1,
    walletAddress: "0x71c7656ec7ab88b098defb751b7401b5f6d8979e",
    discord: "arslan23",
    randomNumber: "8124",
    hash: null,
  },
  {
    id: 13,
    userName: "Jermiah",
    uniqueUserId: null,
    email: null,
    phoneNumber: null,
    gender: null,
    isActive: 1,
    profileImg:
      "https://hsb-bucket.s3.us-east-2.amazonaws.com/1639721415264-welcome.png",
    dob: null,
    experiencePoints: 0,
    emailNotifications: 1,
    walletAddress: "0x71c7656ec7ab88b098defb751b7401b5f6d8976f",
    discord: null,
    randomNumber: "8124",
    hash: null,
  },
  {
    id: 11,
    userName: null,
    uniqueUserId: null,
    email: null,
    phoneNumber: null,
    gender: null,
    isActive: 1,
    profileImg:
      "https://hsb-bucket.s3.us-east-2.amazonaws.com/1639721415264-welcome.png",
    dob: null,
    experiencePoints: 0,
    emailNotifications: 1,
    walletAddress: "31232dsfdsf132sd",
    discord: null,
    randomNumber: "8124",
    hash: null,
  },
  {
    id: 10,
    userName: null,
    uniqueUserId: null,
    email: null,
    phoneNumber: null,
    gender: null,
    isActive: 1,
    profileImg:
      "https://hsb-bucket.s3.us-east-2.amazonaws.com/1639721415264-welcome.png",
    dob: null,
    experiencePoints: 0,
    emailNotifications: 1,
    walletAddress: "0xc23ab1114e94a77d4c7269e8b9cc4cd21164f3f0",
    discord: null,
    randomNumber: "8124",
    hash: null,
  },
  {
    id: 9,
    userName: null,
    uniqueUserId: null,
    email: null,
    phoneNumber: null,
    gender: null,
    isActive: 1,
    profileImg:
      "https://hsb-bucket.s3.us-east-2.amazonaws.com/1639721415264-welcome.png",
    dob: null,
    experiencePoints: 0,
    emailNotifications: 1,
    walletAddress: "0xc23ab1114e94a77d4c7269e8b9cc4cd21164f3f0",
    discord: null,
    randomNumber: "8124",
    hash: null,
  },
];

const Players = () => {
  const dispatch = useDispatch();
  const playersList = useSelector((state: any) => state.players);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  useEffect(() => {
    dispatch(
      getPlayersList({
        search: search,
        page: page + 1,
        rowsPerPage: rowsPerPage,
      })
    );
  }, [search, page, rowsPerPage]);
  return (
    <>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box>
          <Box
            onClick={() => {
              console.log("playerLIST", playersList);
            }}
            component="h2"
            sx={{
              color: "text.primary",
              fontWeight: Fonts.BOLD,
              mb: 6,
              fontSize: 22,
              display: "inline-block",
            }}
          >
            <IntlMessages id="player.mainHeading" />
          </Box>

          <AppGridContainer>
            <Grid item xs={12} md={12}>
              <PlayerTable
                playersList={
                  playersList &&
                  playersList.players &&
                  playersList.players.data
                
                    ? playersList.players.data
                    : []
                }
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                search={search}
                setSearch={setSearch}
              />
            </Grid>
          </AppGridContainer>
        </Box>
      </AppAnimate>
    </>
  );
};

export default Players;
