import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import CategoryItem from "./CollectionItem";
import AppCard from "@crema/core/AppCard";
import AppSearch from "@crema/core/AppSearchBar";
import { useIntl } from "react-intl";
import { AppScrollbar } from "@crema";

const getData = (data: any) => {
  return data;
};

interface CollectionProps {
  data?: any;
  setCollection?: any;
  setCollectionId?: any;
  loading?:any;
}

const Collections: React.FC<CollectionProps> = ({ data, setCollection, setCollectionId,loading }) => {
  const { messages } = useIntl();
  const collection: any = getData(data);

  const [collectionList, setCollectionList] = useState(collection);
  const [searchList, setSearchList] = useState(collection);

  useEffect(() => {
  }, [])

  const searchHandler = (event) => {
    console.log("i am in search handler")
    let searcjQery = event.toLowerCase(),
      displayedCollections = collectionList.filter((el) => {
        let searchValue = el.name.toLowerCase();
        return searchValue.indexOf(searcjQery) !== -1;
      });
    setSearchList(displayedCollections);
  };
  return (
    <AppCard
      title={messages["dashboard.collection"]}
      contentStyle={{ px: 0 }}
      sxStyle={{ height: 1 }}
    >
      <AppSearch sx={{ paddingLeft: 2 }} setSearch={searchHandler} />
      <AppScrollbar sx={{ maxHeight: 370 }}>
        <List
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "left",
            paddingTop: 2,
            paddingLeft: 7,
            "& li": {
              width: "100%",
              padding: "0px 20px",
              "& .MuiListItemIcon-root": {
                minWidth: 0,
              },
            },
          }}
        >
          {searchList && searchList.length > 0 ?
            <CategoryItem
              item={searchList}
              setCollection={setCollection}
              setCollectionId={setCollectionId}
              loading={loading}
            />
            :
            <span>No Collections Available</span>
          }
        </List>
      </AppScrollbar>
    </AppCard>
  );
};

export default Collections;
