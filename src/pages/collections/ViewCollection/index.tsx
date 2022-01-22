import { FC, useState } from "react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Button } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ViewApprovedNft from "../ViewCollection/ViewNft/viewApprovedNft";
import {
  approveCollection,
  setLoader,
} from "../../../redux/collections/actions";


const ViewCollections = () => {
  const dispatch = useDispatch();
  const collectionAddress = useSelector(
    (state: any) => state.collections.collectionAddress
  );
  const loader = useSelector((state: any) => state.collections.loader);

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/admin/collections">
      <Typography variant="h2" component="h2" color="text.primary">
        Collections
      </Typography>
    </Link>,

    <Typography variant="h3" component="h3" color="text.primary">
      NFTS
    </Typography>,
  ];
  return (
    <>
      <div>
        <Box style={{ margin: "0px 0px 10px 20px", display: "flex" }}>
          <Grid item lg={6}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Grid>
          {collectionAddress.action == "Unregistered Collections" ? (
            <Grid
              item
              lg={6}
              style={{ textAlign: "right", marginRight: "20px" }}
            >
              {loader ? (
                <>
                  <Button
                    color="error"
                    variant="contained"
                    disabled
                 
                  >
                    Approve Collection
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      dispatch(
                        approveCollection({
                          id: collectionAddress.id,
                        })
                      );
                      dispatch(setLoader(true));
                    }}
                  >
                    Approve Collection
                  </Button>
                </>
              )}
            </Grid>
          ) : (
            <></>
          )}
        </Box>
        <ViewApprovedNft />
      </div>
    </>
  );
};

export default ViewCollections;
