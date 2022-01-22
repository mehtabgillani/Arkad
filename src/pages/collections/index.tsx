import { FC, useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppGridContainer } from "../../@crema";
import { Fonts } from "../../shared/constants/AppEnums";
import { Box, Grid, TextField, Button } from "@mui/material";
import AppAnimate from "../../@crema/core/AppAnimate";
import IntlMessages from "../../@crema/utility/IntlMessages";
import CollectionBoardTable from "./CollectionTable";
import {
  getRegisteredCollectionsList,
  getUnregisteredCollectionsList,
} from "../../redux/collections/actions";
import "./style.css";

const Collections = () => {
  const dispatch = useDispatch();
  const registeredCollectionsList = useSelector(
    (state: any) => state.collections.registeredCollections
  );
  const unregisteredCollectionsList = useSelector(
    (state: any) => state.collections.unregisteredCollections
  );
  const [filter, setFilter] = useState<string>("Registered Collections");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  useEffect(() => {
    if (filter == "Registered Collections") {
      dispatch(
        getRegisteredCollectionsList({
          search: search,
          page: page + 1,
          rowsPerPage: rowsPerPage,
        })
      );
    } else if (filter == "Unregistered Collections") {
      dispatch(
        getUnregisteredCollectionsList({
          search: search,
          page: page + 1,
          rowsPerPage: rowsPerPage,
        })
      );
    }
  }, [filter, search, page, rowsPerPage]);

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
            <IntlMessages id="collection.mainHeading" />
          </Box>

          <AppGridContainer>
            <Grid item xs={12} md={12}>
              <CollectionBoardTable
                collectionsList={
                  filter == "Registered Collections"
                    ? registeredCollectionsList.data
                      ? registeredCollectionsList.data
                      : []
                    : unregisteredCollectionsList.data
                    ? unregisteredCollectionsList.data
                    : []
                }
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                search={search}
                setSearch={setSearch}
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

export default Collections;
