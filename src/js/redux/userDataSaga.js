import { takeEvery, call, put, select } from 'redux-saga/effects';
import { getUserData, userDataAction } from "../api";
import { updateSavedVerses, updateSettings } from './actions';
import settingsDefinition from '../settingsDefinition';

function* fetchSettingsSaga() {
  const fetchedSetting = yield call(getUserData, '/getSettings', 'settings');
  let setting = settingsDefinition
  if (fetchedSetting) {
    if (Object.keys(fetchedSetting).length !== 0) {
      setting = fetchedSetting;
    }
  }
  yield put(updateSettings(setting));
}

function* fetchSavedVersesSaga() {
  const fetchedVerses = yield call(getUserData, '/getVerses', 'saved verses');
  let verses = { uncategorized: [] };
  if (fetchedVerses) {
    if (Object.keys(fetchedVerses).length !== 0) {
      verses = fetchedVerses;
    }
  }
  yield put(updateSavedVerses(verses));
}

function* addVerseSaga({ data }) {
  let reference = data;
  let verses = yield select(state => state.savedVerses.verses);
  if (verses.uncategorized) {
    verses.uncategorized = [...verses.uncategorized, reference];
  }
  yield put(updateSavedVerses(verses));
}

function* deleteVerseSaga({ data }) {
  let reference = data;
  let verses = yield select(state => state.savedVerses.verses);
  if (verses.uncategorized) {
    verses.uncategorized = verses.uncategorized.filter(verse => verse !== reference);
  }
  yield put(updateSavedVerses(verses));
}

function* saveVersesSaga() {
  let verses = yield select(state => state.savedVerses.verses);
  const response = yield call(userDataAction, "verses=" + JSON.stringify(verses), '/saveVerses', 'save verses');
  if (response) {
    if (Object.keys(response).length !== 0) {
      yield put(updateSavedVerses(response));
    }
  }
}

function* saveSettingsSaga() {
  let settings = yield select(state => state.settings.settingValues);
  const response = yield call(userDataAction, "settings=" + JSON.stringify(settings), '/saveSettings', 'save settings');
  if (response) {
    if (Object.keys(response).length !== 0) {
      yield put(updateSettings(response));
    }
  }
}

export default [
    takeEvery("FETCH_SETTINGS", fetchSettingsSaga),
    takeEvery("SAVE_SETTINGS", saveSettingsSaga),
    takeEvery("FETCH_SAVED_VERSES", fetchSavedVersesSaga),
    takeEvery("SAVE_VERSES", saveVersesSaga),
    takeEvery("ADD_VERSE", addVerseSaga),
    takeEvery("DELETE_VERSE", deleteVerseSaga),
  ];