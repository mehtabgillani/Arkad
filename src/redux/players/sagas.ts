import axios from "../../routes/axiosConfig";
import { all, put, call, fork, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  getPlayersListSuccess,
  getPlayerCollectionListSuccess,
} from "./actions";
import { GET_PLAYERS_LIST, GET_PLAYER_COLLECTIONS_LIST } from "./constants";
import { sagaErrorHandler } from "../../shared/helperMethods/sagaErrorHandler";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function* playerListRequest({ payload }: any): any {
 
  try {
    const response = yield axios.get(
      `/user?page=${payload.page}&limit=${payload.rowsPerPage}&name=${payload.search}`
    );
   
    yield put(getPlayersListSuccess(response.data));
  } catch (error: any) {
    console.log("error");
    yield sagaErrorHandler(error.response);
  }
}

function* watchGetPlayers() {
  yield takeLatest(GET_PLAYERS_LIST, playerListRequest);
}

function* playerCollectionListRequest({ payload }: any): any {
  // console.log("payload of login", payload);
  try {
    const response = yield axios.get(
      `/collection/user/${payload.id}`
    );
    // console.log("response", response);
    yield put(getPlayerCollectionListSuccess(response.data.data.collections));
    yield put(push("/admin/players/view-collection"));
    //   state: {
    //     id: id,
    //     walletAddress: address,
    //   },
    // });
  } catch (error: any) {
    console.log("error");
    yield sagaErrorHandler(error.response);
  }
}

function* watchGetPlayerCollections() {
  yield takeLatest(GET_PLAYER_COLLECTIONS_LIST, playerCollectionListRequest);
}

export default function* playersSaga() {
  yield all([fork(watchGetPlayers), fork(watchGetPlayerCollections)]);
}
