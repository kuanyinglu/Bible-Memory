import { all, takeEvery, call, put } from 'redux-saga/effects'
import { getVerses } from "../api";
import { processFetchedVerses, startTyper, typerReady } from './actions';

function* getVersesSaga({ data }) {
  let reference = data;
  yield put(typerReady(false));
  const verseData = yield call(getVerses, reference);
  if (verseData) {
    yield put(processFetchedVerses(verseData, reference));
    yield put(startTyper(verseData));
  }
  yield put(typerReady(true));
}

export default function* sagas() {
  yield all([
    takeEvery("SEARCH_VERSES", getVersesSaga)
  ]);
}