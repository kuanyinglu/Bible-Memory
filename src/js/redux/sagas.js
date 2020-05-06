import { all } from 'redux-saga/effects'
import loadVersesSaga from './loadVersesSaga';
import typerSaga from './typerSaga';
import userDataSaga from './userDataSaga';

export default function* sagas() {
  yield all([
    loadVersesSaga,
    typerSaga,
    userDataSaga
  ].flat());
}