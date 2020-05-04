import { all } from 'redux-saga/effects'
import loadVersesSaga from './loadVersesSaga';
import typerSaga from './typerSaga';

export default function* sagas() {
  yield all([
    loadVersesSaga,
    typerSaga
  ].flat());
}