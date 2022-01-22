import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppAnimate from "@crema/core/AppAnimate";
import AppGridContainer from "@crema/core/AppGridContainer";
import IntlMessages from "@crema/utility/IntlMessages";
import { Box, Grid, Button } from "@mui/material";
import CollectionCard from "../userCollections/index";
import { Fonts } from "../../../shared/constants/AppEnums";
import getUserNftsIndexed from "../../../shared/helperMethods/nft";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AppCard from "@crema/core/AppCard";
import "../../collections/style.css";
import { CircularProgress } from "@mui/material";

const NFTs = (props) => {
  const history = useHistory();
  const playerCollectionsList = useSelector((state: any) => state.players.playerCollectionList);
  const playerDetail = useSelector((state: any) => state.players.playerDetail);
  const [collection, setCollection] = useState<string>();
  const [collectionId, setCollectionId] = useState<number>();
  const [nftListData, setNftListData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [newCount, setNewCount] = useState(6);
  const [newArrStartIndex, setNewArrStartIndex] = useState(0);
  const [newArrEndingIndex, setNewArrEndingIndex] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [disableLoader, setDisableLoader] = useState<boolean>(false);
 

  useEffect(() => {
    if (!collection && playerCollectionsList?.length > 0) {
      setCollection(playerCollectionsList[0]?.name);
      setCollectionId(playerCollectionsList[0]?.id);
    }
  }, [playerCollectionsList]);

  useEffect(() => {
    setDisableLoader(true)
    typeof collectionId == "undefined" || typeof collectionId == "number"
      ? setCollectionId(playerCollectionsList[0].address)
      : console.log("Collection Id is already Set");
    if (collectionId) {
      const nftData = getUserNftsIndexed(
        "Eth",
        collectionId,
        playerDetail.address,
        newArrStartIndex,
        newArrEndingIndex
      ).then((result) => {
        setNftListData(result);
        setLoading(false);
        setShowLoader(false);
        setDisableLoader(false)
      });
      if (newArrEndingIndex == newArrStartIndex + 1) {
        setNewArrEndingIndex(newArrEndingIndex + 1);
      }
    }
  }, [collectionId, newArrEndingIndex]);

  useEffect(() => {
    setShowLoader(true);
  }, [collectionId]);

  useEffect(() => {
    setLoading(true);
    setNewCount(page * 6);
    setNewArrStartIndex((page - 1) * 6);
    setNewArrEndingIndex((page - 1) * 6 + 1);
  }, [page]);

  return (
    <>
      <Grid style={{ display: "flex" }} mb={3}>
        <Grid item lg={6} mt={1}>
          <Box
            component="h1"
            sx={{
              color: "text.primary",
              fontWeight: Fonts.BOLD,
              mb: 6,
              fontSize: 22,
              display: "inline-block",
            }}
          >
            <IntlMessages id="nft.mainHeading" />
          </Box>
        </Grid>

        <Grid item lg={6} style={{ textAlign: "right", marginRight: "20px" }}>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              history.push("/admin/players");
            }}
          >
            Back
          </Button>
        </Grid>
      </Grid>

      <AppGridContainer>
        <Grid item xs={12} md={3.5}>
          <CollectionCard
            data={playerCollectionsList}
            setCollection={setCollection}
            setCollectionId={setCollectionId}
            loading={!disableLoader}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <>
            <AppCard
              style={{
                padding: "10px",
              }}
            >
              {showLoader ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) :  nftListData.tokenImgUri &&
                nftListData.tokenImgUri.length == 0 ? (
                  <p style={{ margin: "0px 20px 2px 20px", fontSize: "22px" }}>
                    {" "}
                    No NFTS Available
                  </p>
                )
                :
                 (
                  <>
                    <AppAnimate animation="transition.slideUpIn" delay={200}>
                      <Box>
                        <Grid container>
                          {nftListData &&
                            nftListData.tokenImgUri &&
                            nftListData.tokenImgUri.map(
                              (nft: any, index: number) => {
                                return (
                                  <Grid item xs={12} lg={6} sm={6}>
                                    <div
                                      key={index}
                                      className="hvr-float-shadow "
                                    >
                                      <AppCard
                                        style={{
                                          padding: "10px",
                                          margin: "20px",
                                        }}
                                      >
                                        <LazyLoadImage
                                          alt={"image loading"}
                                          src={nft}
                                          height={50}
                                          afterLoad={() => {
                                            if (newArrEndingIndex < newCount) {
                                              setNewArrEndingIndex(
                                                newArrEndingIndex + 1
                                              );
                                            }
                                          }}
                                        />
  
                                        <Grid
                                          style={{
                                            textAlign: "center",
                                            marginTop: "5px",
                                          }}
                                        >
                                          <h4 className="MuiBox-root css-4t0jm6">
                                            {" "}
                                            {nftListData.collectionName}
                                          </h4>
                                        </Grid>
                                      </AppCard>
                                    </div>
                                  </Grid>
                                );
                              }
                            )}
                        </Grid>
  
                        <>
                          <Grid style={{ display: "flex", marginTop: "20px" }}>
                            {(page > 1 &&
                              loading == false &&
                              nftListData &&
                              nftListData.tokenImgUri &&
                              nftListData.tokenImgUri.length == 6) ||
                            newArrEndingIndex >= nftListData.totalSupply ? (
                              <>
                                <Grid
                                  item
                                  lg={6}
                                  style={{
                                    textAlign: "right",
                                    marginRight: "25px",
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      if (page > 1) {
                                        setPage(page - 1);
                                      }
                                    }}
                                  >
                                    Previous Page
                                  </Button>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid
                                  item
                                  lg={6}
                                  style={{
                                    textAlign: "right",
                                    marginRight: "25px",
                                  }}
                                >
                                  <Button variant="contained" disabled>
                                    Previous Page
                                  </Button>
                                </Grid>
                              </>
                            )}
                            {nftListData.totalSupply > page * 6 &&
                            loading == false &&
                            nftListData &&
                            nftListData.tokenImgUri &&
                            nftListData.tokenImgUri.length == 6 ? (
                              <>
                                <Grid item lg={6}>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      if (page < nftListData.totalSupply / 6) {
                                        setPage(page + 1);
                                      }
                                    }}
                                  >
                                    Next Page
                                  </Button>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid item lg={6}>
                                  <Button variant="contained" disabled>
                                    Next Page
                                  </Button>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </>
                      </Box>
                    </AppAnimate>
                  </>
                )}

            
            </AppCard>
          </>
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default NFTs;
