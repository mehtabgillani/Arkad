import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import StatisticsCard from "./StatisticsCard/index";
import Activity from "./AppActivity/index";
import player from "../../assets/images/players.png";
import collections from "../../assets/images/collections.png";
import NFT from "../../assets/images/NFT.png";
import battles from "../../assets/images/battles.png";
import revenue from "../../assets/images/revenue.png";

const DashboardStatistics = [
  {
    id: 1,
    category: "Total Players",
    name: "8234",
    bgColor: "#0A8FDC",
    time: "9 AM",
    icon: player,
  },
  {
    id: 2,
    category: "Total Collections",
    name: "512",
    bgColor: "#00B59C",
    time: "10 AM",
    icon: collections,
  },
  {
    id: 3,
    category: "Total NFTs",
    name: "19452",
    bgColor: "#B745FF",
    time: "10 AM",
    icon: NFT,
  },

  {
    id: 4,
    category: "Unregistered Collections",
    name: "73",
    bgColor: "#F77568",
    time: "10 AM",
    icon: collections,
  },
  {
    id: 5,
    category: "Total Battles",
    name: "734",
    bgColor: "#3A3849",
    time: "10 AM",
    icon: battles,
  },
  {
    id: 6,
    category: "Total Revenue",
    name: "200k",
    bgColor: "#FFA940",
    time: "10 AM",
    icon: revenue,
  },
];
const Activitydata = [
  { name: "Jan", NFTS: 150, Collections: 270, Players: 200 },
  { name: "Feb", NFTS: 250, Collections: 200, Players: 300 },
  { name: "Mar", NFTS: 180, Collections: 280, Players: 400 },
  { name: "Apr", NFTS: 278, Collections: 250, Players: 600 },
  { name: "May", NFTS: 250, Collections: 300, Players: 300 },
  { name: "Jun", NFTS: 350, Collections: 250, Players: 500 },
  { name: "Jul", NFTS: 280, Collections: 300, Players: 450 },
  { name: "Aug", NFTS: 340, Collections: 240, Players: 340 },
  { name: "Sep", NFTS: 280, Collections: 300, Players: 700 },
  { name: "Oct", NFTS: 400, Collections: 270, Players: 110 },
  { name: "Nov", NFTS: 250, Collections: 240, Players: 230 },
  { name: "Dec", NFTS: 400, Collections: 270, Players: 270 },
];
const Home = () => {
  return (
    <>
      <Grid item xs={12} md={12}>
        <div style={{ display: "flex" }}>
          {DashboardStatistics.map((data, index) => (
            <>
              {data.id < 4 ? (
                <Grid item xs={12} sm={12} lg={4} mr={6} mb={6} key={index}>
                  <StatisticsCard data={data} />
                </Grid>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>

        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} sm={12} mt={2} mb={2}>
            <Activity data={Activitydata} />
          </Grid>
        </Grid>
        <div style={{ display: "flex" }}>
          {DashboardStatistics.map((data, index) => (
            <>
              {data.id > 3 ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg={4}
                  mt={6}
                  mr={6}
                  mb={6}
                  key={index}
                >
                  <StatisticsCard data={data} />
                </Grid>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      </Grid>
    </>
  );
};

export default Home;
