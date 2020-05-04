import { all, takeEvery, call, put } from 'redux-saga/effects'
import { getVerses } from "../api";
import { processFetchedVerses, startTyper, typerReady, updateVerses } from './actions';
import { booksData } from "../bibleBooks";

function* getVersesSaga({ data }) {
  let reference = data;
  yield put(typerReady(false));
  const verseData = yield call(getVerses, reference);
  if (verseData) {
    yield put(processFetchedVerses(verseData, reference));
    yield put(updateVerses(reference));
    yield put(startTyper(verseData));
  }
  yield put(typerReady(true));
}

function* getBibleBooksSaga() {
  yield put(typerReady(false));
  yield put(processFetchedVerses(booksData, "Books of The Bible"));
  yield put(updateVerses("Books of The Bible"));
  yield put(startTyper(booksData));
  yield put(typerReady(true));
}

export default [
    takeEvery("SEARCH_VERSES", getVersesSaga),
    takeEvery("PRACTICE_BIBLE_BOOKS", getBibleBooksSaga)
  ];