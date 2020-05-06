import { takeEvery, put, select } from 'redux-saga/effects';
import { updateTyperData, setFocusedTyper } from './actions';
import typerState from '../typerState';

function* startTyperSaga() {
  let numberOfVerses = yield select(state => state.versesText.length);
  let versesText = yield select(state => state.versesText);
  let settings = yield select(state => state.settings.settingValues);

  let values = Array(numberOfVerses).fill("");

  let states = values.map((_, i) => {
    let args = { inputValue: "", previousValue: "", verseText: versesText[i].content, settings };
    return typerState.getResult(args);
  });

  yield put(updateTyperData(values, Array(numberOfVerses).fill(""), states));
  yield put(setFocusedTyper(0));
}

function* startTyperFromSaga({ data }) {
  let verseNumber = data;
  let typerData = yield select(state => state.typerData);
  let versesText = yield select(state => state.versesText);
  let settings = yield select(state => state.settings.settingValues);

  let values = [...typerData.values];
  let prevValues = Array(typerData.values.length).fill("");;

  values = values.map((_, i) => {
    if (i < verseNumber) {
      return versesText[i].content;
    } else {
      return "";
    }
  });
  let states = values.map((_, i) => {
    let args = { inputValue: values[i], previousValue: prevValues[i], verseText: versesText[i].content, settings };
    return typerState.getResult(args);
  });

  yield put(updateTyperData(values, prevValues, states));
  yield put(setFocusedTyper(verseNumber));
}

function* updateTyperSaga({ data }) {
  let { id, newValue } = data;
  let typerData = yield select(state => state.typerData);
  let versesText = yield select(state => state.versesText);
  let settings = yield select(state => state.settings.settingValues);

  let prevValues = [...typerData.prevValues];
  let values = [...typerData.values];
  let states = [...typerData.states];
  prevValues[id] = values[id];
  let args = { inputValue: newValue, previousValue: prevValues[id], verseText: versesText[id].content, settings };

  states[id] = typerState.getResult(args);
  values[id] = states[id].newText;
  yield put(updateTyperData(values, prevValues, states));
  if (states[id].mode === "DONE" && values.length > id + 1) {
    yield put(setFocusedTyper(id + 1));
  }
}

export default [
    takeEvery("START_TYPER", startTyperSaga),
    takeEvery("START_FROM", startTyperFromSaga),
    takeEvery("UPDATE_TYPER", updateTyperSaga),
  ];