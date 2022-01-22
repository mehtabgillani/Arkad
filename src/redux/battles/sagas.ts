import axios from "../../routes/axiosConfig";
import { all, put, call, fork, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  getRegularBattleListSuccess,
  getFreeBattleListSuccess,
} from "./actions";
import {
  GET_REGULAR_BATTLES_LIST,
  GET_FREE_BATTLES_LIST,
} from "./constants";
import { sagaErrorHandler } from "../../shared/helperMethods/sagaErrorHandler";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* regularBattleListRequest({ payload }: any): any {
  console.log("payload of regularBattleListRequest", payload);
  try {
    const response = yield axios.get(
      `/battle/all/regular-battle?page=1&limit=10`
    );
    console.log("response",response.data)
    yield put(getRegularBattleListSuccess(response.data));
   
  } catch (error: any) {
    yield sagaErrorHandler(error.response);
  }
}

function* watchGetRegularBattles() {
  yield takeLatest(
    GET_REGULAR_BATTLES_LIST,
    regularBattleListRequest
  );
}

function* freeBattleListRequest({ payload }: any): any {
  console.log("payload of freeBattleListRequest", payload);
  try {
    const response = yield axios.get(`/battle/all/free-battle?limit=4&page=1`);
    console.log("response", response);
    yield put(getFreeBattleListSuccess(response.data));
  } catch (error: any) {
    yield sagaErrorHandler(error.response);
  }
}

function* watchGetFreeBattles() {
  yield takeLatest(
    GET_FREE_BATTLES_LIST,
    freeBattleListRequest
  );
}




export default function* battlesSaga() {
  yield all([
    fork(watchGetRegularBattles),
    fork(watchGetFreeBattles),
   
  ]);
}
