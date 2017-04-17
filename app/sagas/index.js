import { takeEvery } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

function* locationChange(action) {
  const location = action.payload;
  yield call(console.log, `Changed location to ${location.pathname}`);
}

export default function* rootSaga() {
  yield [
    fork(function* generator() { yield* takeEvery(LOCATION_CHANGE, locationChange); }),
  ];
}
