import { FC, useState } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, TextField, Button } from "@mui/material";
import AppAnimate from "../../../../@crema/core/AppAnimate";
import AppCard from "@crema/core/AppCard";
import GetAllNft from "../../../../shared/helperMethods/getNft";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../style.css";

const ViewApprovedNft = () => {
  const dispatch = useDispatch();
  const [nftListData, setNftListData] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [newCount, setNewCount] = useState(6);
  const [newArrStartIndex, setNewArrStartIndex] = useState(0);
  const [newArrEndingIndex, setNewArrEndingIndex] = useState(1);
  const [loading,setLoading] =useState(false);
  const collectionAddress = useSelector(
    (state: any) => state.collections.collectionAddress
  );
  const handleNft = () => {
 

    GetAllNft(
      "Eth",
      collectionAddress.address,
      newArrStartIndex,
      newArrEndingIndex
    ).then((result) => {
      setNftListData(result);
      setLoading(false);
    });
    if (newArrEndingIndex == newArrStartIndex + 1) {
      setNewArrEndingIndex(newArrEndingIndex + 1);
    }
  };

  useEffect(() => {
    handleNft();
  }, [newArrEndingIndex]);

  useEffect(() => {
    setLoading(true);
    setNewCount(page * 6);
    setNewArrStartIndex((page - 1) * 6);
    setNewArrEndingIndex((page - 1) * 6 + 1);
  }, [page]);
  return (
    <>
      <AppCard
        style={{
          padding: "10px",
          margin: "20px",
          backgroundColor: "#5fb5b726",
        }}
      >    {nftListData.length == 0 ? (
          <p style={{ margin: "0px 20px 2px 20px", fontSize: "22px" }}>
            {" "}
            No NFTS Available
          </p>
        ) : (
          <>
   <AppAnimate animation="transition.slideUpIn" delay={200}>
          <Box>
            <Grid container>
              {nftListData &&
                nftListData.tokenImgUri &&
                nftListData.tokenImgUri.map((nft: any, index: number) => {
                  return (
                    <Grid item xs={12} lg={4} sm={6}>
                      <div  key={index} className="hvr-float-shadow ">
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
                               
                                setNewArrEndingIndex(newArrEndingIndex + 1);
                              }
                            }}
                          />

                          <Grid style={{ textAlign: "center",marginTop:'5px' }}>
                            <h3 className="MuiBox-root css-4t0jm6">
                              {" "}
                              {nftListData.collectionName}
                            </h3>
                          </Grid>
                        </AppCard>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>

            <>
              <Grid style={{ display: "flex", marginTop: "20px" }}>
                {(page > 1 && loading == false && 
                  nftListData &&
                  nftListData.tokenImgUri &&
                  nftListData.tokenImgUri.length == 6) ||
                newArrEndingIndex >= nftListData.totalSupply  ? (
                  <>
                    <Grid
                      item
                      lg={6}
                      style={{ textAlign: "right", marginRight: "25px" }}
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
                      style={{ textAlign: "right", marginRight: "25px" }}
                    >
                      <Button variant="contained" disabled>
                        Previous Page
                      </Button>
                    </Grid>
                  </>
                )}
                {nftListData.totalSupply > page * 6  && loading == false &&
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
  );
};

export default ViewApprovedNft;
