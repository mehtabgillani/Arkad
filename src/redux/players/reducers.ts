import produce from "immer";

import {
  GET_PLAYERS_LIST_SUCCESS,
  GET_PLAYER_COLLECTIONS_LIST_SUCCESS,
  PLAYER_DETAIL,
} from "./constants";

const initialState = {
  players: [],
  playerCollectionList: [],
  playerActivePage: 1,
  playerDetail: {
    id: "",
    walletAddress: "",
  },
};

const Players = produce((state = initialState, action: any) => {
  switch (action.type) {
    case GET_PLAYERS_LIST_SUCCESS:
      state.players = action.payload;
      break;
    case PLAYER_DETAIL:
      state.playerDetail = action.payload;
      break;
    case GET_PLAYER_COLLECTIONS_LIST_SUCCESS:
      state.playerCollectionList = action.payload;
      break;
    default:
  }
}, initialState);

export default Players;
