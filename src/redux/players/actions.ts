import {
  GET_PLAYERS_LIST,
  GET_PLAYERS_LIST_SUCCESS,
  CHANGE_PLAYER_ACTIVE_PAGE,
  GET_PLAYER_COLLECTIONS_LIST,
  GET_PLAYER_COLLECTIONS_LIST_SUCCESS,
  PLAYER_DETAIL,
} from "./constants";

export const getPlayersList = (data: any) => ({
  type: GET_PLAYERS_LIST,
  payload: data,
});

export const getPlayersListSuccess = (data: any) => ({
  type: GET_PLAYERS_LIST_SUCCESS,
  payload: data,
});

export const changePlayerActivePage = (data: any) => ({
  type: CHANGE_PLAYER_ACTIVE_PAGE,
  payload: data,
});

export const getPlayerCollectionList = (data: any) => ({
  type: GET_PLAYER_COLLECTIONS_LIST,
  payload: data,
});


export const getPlayerCollectionListSuccess = (data: any) => ({
  type: GET_PLAYER_COLLECTIONS_LIST_SUCCESS,
  payload: data,
});

export const playerDetail = (data: any) => ({
  type: PLAYER_DETAIL,
  payload: data,
});
