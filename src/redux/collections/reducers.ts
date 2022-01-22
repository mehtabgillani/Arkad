import produce from "immer";

import {
  GET_REGISTERED_COLLECTIONS_LIST_SUCCESS,
  CHANGE_REGISTERED_COLLECTIONS_ACTIVE_PAGE,
  GET_UNREGISTERED_COLLECTIONS_LIST_SUCCESS,
  CHANGE_UNREGISTERED_COLLECTIONS_ACTIVE_PAGE,
  GET_NFTS_LIST_SUCCESS,
  COLLECTION_ADDRESS,
  SET_LOADER,
} from "./constants";

const initialState = {
  registeredCollections: [],
  registeredCollectionsActivePage: 1,
  unregisteredCollections: [],
  unregisteredCollectionsActivePage: 1,
  nftList: [],
  collectionAddress: "",
  loader: false,
};

const Collections = produce((state = initialState, action: any) => {
  switch (action.type) {
    case GET_REGISTERED_COLLECTIONS_LIST_SUCCESS:
      state.registeredCollections = action.payload;
      break;
    case CHANGE_REGISTERED_COLLECTIONS_ACTIVE_PAGE:
      state.registeredCollectionsActivePage = action.payload;
      break;
    case GET_UNREGISTERED_COLLECTIONS_LIST_SUCCESS:
      state.unregisteredCollections = action.payload;
      break;
    case CHANGE_UNREGISTERED_COLLECTIONS_ACTIVE_PAGE:
      state.unregisteredCollectionsActivePage = action.payload;
      break;
    case GET_NFTS_LIST_SUCCESS:
      state.nftList = action.payload;
      break;
    case COLLECTION_ADDRESS:
      state.collectionAddress = action.payload;
      break;
    case SET_LOADER:
      state.loader = action.payload;
      break;

    default:
  }
}, initialState);

export default Collections;
