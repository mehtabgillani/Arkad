import {
  GET_REGISTERED_COLLECTIONS_LIST,
  GET_REGISTERED_COLLECTIONS_LIST_SUCCESS,
  CHANGE_REGISTERED_COLLECTIONS_ACTIVE_PAGE,
  GET_UNREGISTERED_COLLECTIONS_LIST,
  GET_UNREGISTERED_COLLECTIONS_LIST_SUCCESS,
  CHANGE_UNREGISTERED_COLLECTIONS_ACTIVE_PAGE,
  GET_NFTS_LIST_SUCCESS,
  COLLECTION_ADDRESS,
  APPROVE_COLLECTION,
  SET_LOADER
} from "./constants";

//Registered Collection Actions
export const getRegisteredCollectionsList = (data: any) => ({
  type: GET_REGISTERED_COLLECTIONS_LIST,
  payload: data,
});

export const getRegisteredCollectionsListSuccess = (data: any) => ({
  type: GET_REGISTERED_COLLECTIONS_LIST_SUCCESS,
  payload: data,
});

export const changeRegisteredCollectionsActivePage = (data: any) => ({
  type: CHANGE_REGISTERED_COLLECTIONS_ACTIVE_PAGE,
  payload: data,
});

//Unregistered Collections action

export const getUnregisteredCollectionsList = (data: any) => ({
  type: GET_UNREGISTERED_COLLECTIONS_LIST,
  payload: data,
});

export const getUnregisteredCollectionsListSuccess = (data: any) => ({
  type: GET_UNREGISTERED_COLLECTIONS_LIST_SUCCESS,
  payload: data,
});

export const changeUnregisteredCollectionsActivePage = (data: any) => ({
  type: CHANGE_UNREGISTERED_COLLECTIONS_ACTIVE_PAGE,
  payload: data,
});

// Get NFTS Action



export const getNftlistSuccess = (data: any) => ({
  type: GET_NFTS_LIST_SUCCESS,
  payload: data,
});

export const collectionAddress = (data: any) => ({
  type: COLLECTION_ADDRESS,
  payload: data,
});

export const approveCollection = (data: any) => ({
  type: APPROVE_COLLECTION,
  payload: data,
});

export const setLoader = (data: any) => ({
  type: SET_LOADER,
  payload: data,
});

