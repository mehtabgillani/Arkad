import { all, fork } from 'redux-saga/effects'
import authSaga from '../auth/sagas';
import playersSaga from "../players/sagas"
import collectionsSaga from "../collections/sagas"
import battlesSaga from "../battles/sagas"

export function* rootSaga() {
    yield all([
        authSaga(),
        playersSaga(),
        collectionsSaga(),
        battlesSaga(),
    ])
}