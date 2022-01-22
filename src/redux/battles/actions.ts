import {
  GET_REGULAR_BATTLES_LIST_SUCCESS,
  GET_REGULAR_BATTLES_LIST,
  GET_FREE_BATTLES_LIST,
  GET_FREE_BATTLES_LIST_SUCCESS,
  
} from "./constants";

//Registered Collection Actions
export const getRegularBattleList = (data: any) => ({
  type: GET_REGULAR_BATTLES_LIST,
  payload: data,
});

export const getRegularBattleListSuccess = (data: any) => ({
  type: GET_REGULAR_BATTLES_LIST_SUCCESS,
  payload: data,
});


//Unregistered Collections action

export const getFreeBattleList = (data: any) => ({
  type: GET_FREE_BATTLES_LIST,
  payload: data,
});

export const getFreeBattleListSuccess = (data: any) => ({
  type: GET_FREE_BATTLES_LIST_SUCCESS,
  payload: data,
});
