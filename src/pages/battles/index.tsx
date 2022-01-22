import { FC, useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppGridContainer } from "../../@crema";
import { Fonts } from "../../shared/constants/AppEnums";
import { Box, Grid, TextField } from "@mui/material";
import AppAnimate from "../../@crema/core/AppAnimate";
import IntlMessages from "../../@crema/utility/IntlMessages";
import BattleBoardTable from "./BattleTable";

import {
  getRegularBattleList,
  getFreeBattleList,
} from "../../redux/battles/actions";

const initialValue = [
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
  {
    battleName: "Battle of Guardians",
    collectionName: "Apes",
    totalParticipant: 1734,
    totalNFTS: 123,
    winner: "Alex Hales",
    time: "26,april,2022",
    status: "asd",
  },
];

const Battles = () => {
  const dispatch = useDispatch();
  const regularBattlesList = useSelector(
    (state: any) => state.battles.regularBattleList
  );
  const freeBattlesList = useSelector(
    (state: any) => state.battles.freeBattleList
  );
  const [filter, setFilter] = useState<string>("Regular Battles");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    if (filter == "Regular Battles") {
      dispatch(
        getRegularBattleList({
          page: page + 1,
          rowsPerPage: rowsPerPage,
        })
      );
    } else if (filter == "Free Battles") {
      dispatch(
        getFreeBattleList({
          page: page + 1,
          rowsPerPage: rowsPerPage,
        })
      );
    }
  }, [filter, page, rowsPerPage]);
  return (
    <>
      <AppAnimate animation="transition.slideUpIn" delay={200}>
        <Box>
          <Box
            component="h2"
            sx={{
              color: "text.primary",
              fontWeight: Fonts.BOLD,
              mb: 6,
              fontSize: 22,
              display: "inline-block",
            }}
          >
            <IntlMessages id="battle.mainHeading" />
          </Box>

          <AppGridContainer>
            <Grid item xs={12} md={12}>
              <BattleBoardTable
                BattleData={initialValue}
                battlesList={
                  filter == "Regular Battles"
                    ? regularBattlesList.data
                      ? regularBattlesList.data
                      : []
                    : freeBattlesList.data
                    ? freeBattlesList.data
                    : []
                }
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                filter={filter}
                setFilter={setFilter}
              />
            </Grid>
          </AppGridContainer>
        </Box>
      </AppAnimate>
    </>
  );
};

export default Battles;
