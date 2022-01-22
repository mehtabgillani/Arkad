import axios from "../../routes/axiosConfig";
import { all, put, call, fork, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import {
  loginRequestSuccess,
  resetPasswordSuccess,
  setLoader,
} from "./actions";
import { LOGIN, FORGOT_PASSWORD, RESET_PASSWORD } from "./constants";
import { sagaErrorHandler } from "../../shared/helperMethods/sagaErrorHandler";
import { toast } from "react-toastify";

function* loginRequestSaga({ payload }: any): any {
  console.log("payload of login", payload);
  let data = {
    email: payload.email,
    password: payload.password,
  };
  try {
    const response = yield axios.post(`/auth/admin/login`, data);
    console.log("response", response);
    toast.success("Login Successfully");
    yield put(loginRequestSuccess(response.data));
    yield put(setLoader(false));
  } catch (error: any) {
    console.log("error",error.response)
    yield sagaErrorHandler(error.response);
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN, loginRequestSaga);
}

function* forgetRequestSaga({ payload }: any): any {
  console.log("payload of login", payload);
  let data = {
    email: payload.email,
  };
  try {
    const response = yield axios.post(`/auth/admin/forgot-password`, data);
    console.log("response", response.data.reset_token);
    yield put(resetPasswordSuccess(response.data.reset_token));
    yield put(push("/admin/reset-password"));
  } catch (error: any) {
    console.log("error",error.response)
    yield sagaErrorHandler(error.response.data);
  }
}

function* watchForget() {
  yield takeLatest(FORGOT_PASSWORD, forgetRequestSaga);
}

function* resetRequestSaga({ payload }: any): any {
  console.log("payload of reset password", payload);
  let data = {
    password: payload.confirmPassword,
    token: payload.token,
  };
  try {
    const response = yield axios.post(`/auth/admin/reset-password`, data);
    console.log("response", response);
    toast.success("Password reset Successfully");
    yield put(push("/admin/signin"));
  } catch (error: any) {
    yield sagaErrorHandler(error.response);
  }
}

function* watchReset() {
  yield takeLatest(RESET_PASSWORD, resetRequestSaga);
}

export default function* authSaga() {
  yield all([fork(watchLogin), fork(watchForget), fork(watchReset)]);
}
