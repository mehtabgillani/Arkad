import produce from "immer";

import {
  GET_REGULAR_BATTLES_LIST_SUCCESS,
GET_FREE_BATTLES_LIST_SUCCESS,
} from "./constants";

const initialState = {
 regularBattleList:[],
 freeBattleList:[],
 
};

const Battles = produce((state = initialState, action: any) => {
  switch (action.type) {
    case GET_REGULAR_BATTLES_LIST_SUCCESS:
      state.regularBattleList = action.payload;
      break;
    case GET_FREE_BATTLES_LIST_SUCCESS:
      state.freeBattleList = action.payload;
      break;
    default:
  }
}, initialState);

export default Battles;
