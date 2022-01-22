import axios from "../../routes/axiosConfig";
import { all, put, call, fork, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  getRegisteredCollectionsListSuccess,
  getUnregisteredCollectionsListSuccess,
  setLoader
} from "./actions";
import {
  GET_REGISTERED_COLLECTIONS_LIST,
  GET_UNREGISTERED_COLLECTIONS_LIST,
  APPROVE_COLLECTION
} from "./constants";
import { sagaErrorHandler } from "../../shared/helperMethods/sagaErrorHandler";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function* registeredCollectionListRequest({ payload }: any): any {
  console.log("payload of registeredCollectionListRequest", payload);
  try {
    const response = yield axios.get(
      `/collection/approved-collection?page=${payload.page}&limit=${payload.rowsPerPage}&name=${payload.search}`
    );
    yield put(getRegisteredCollectionsListSuccess(response.data));
   
  } catch (error: any) {
    yield sagaErrorHandler(error.response);
  }
}

function* watchGetRegisteredCollections() {
  yield takeLatest(
    GET_REGISTERED_COLLECTIONS_LIST,
    registeredCollectionListRequest
  );
}

function* unregisteredCollectionListRequest({ payload }: any): any {
  // console.log("payload of unregisteredCollectionListRequest", payload);
  try {
    const response = yield axios.get(`/collection/un-approved?page=${payload.page}&limit=${payload.rowsPerPage}&name=${payload.search}`);
    // console.log("response", response);
    yield put(getUnregisteredCollectionsListSuccess(response.data));
  } catch (error: any) {
    yield sagaErrorHandler(error.response);
  }
}

function* watchGetUnregisteredCollections() {
  yield takeLatest(
    GET_UNREGISTERED_COLLECTIONS_LIST,
    unregisteredCollectionListRequest
  );
}


function* approveCollectionRequest({ payload }: any): any {
  console.log("payload of approveCollectionRequest", payload);
  try {
    const response = yield axios.post(`/collection/approve/${payload.id}`);
    console.log("response", response);
    toast.success("Collection Approved Successfully")
    yield put(setLoader(false));
    yield put(push("/admin/collections"));
    // yield put(getUnregisteredCollectionsListSuccess(response.data));
  } catch (error: any) {
    yield sagaErrorHandler(error.response);
    yield put(setLoader(false));
  }
}

function* watchApproveCollection() {
  yield takeLatest(
    APPROVE_COLLECTION,
    approveCollectionRequest
  );
}

export default function* collectionsSaga() {
  yield all([
    fork(watchGetRegisteredCollections),
    fork(watchGetUnregisteredCollections),
    fork(watchApproveCollection),
  ]);
}
