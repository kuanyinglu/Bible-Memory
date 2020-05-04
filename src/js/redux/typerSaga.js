import { takeEvery, put, select } from 'redux-saga/effects';
import { updateTyperData, setFocusedTyper } from './actions';
import parser from '../parser';

function* startTyperSaga() {
  let numberOfVerses = yield select(state => state.versesText.length);
  let versesText = yield select(state => state.versesText);
  let settings = yield select(state => state.settings.settingValues);

  let values = Array(numberOfVerses).fill("");

  let states = values.map((_, i) => {
    let args = { inputValue: "", previousValue: "", verseText: versesText[i].content, settings };
    return parser.getResult(args);
  });

  yield put(updateTyperData(values, Array(numberOfVerses).fill(""), states));
  yield put(setFocusedTyper(0));
}

function* startTyperFromSaga({ data }) {
  let verseNumber = data.verseNumber;
  let typerData = yield select(state => state.typerData);
  let versesText = yield select(state => state.versesText);
  let settings = yield select(state => state.settings.settingValues);

  let value = [...typerData.value];
  let prevValue = [...typerData.prevValue];

  value.fill(null, 0, verseNumber - 1);
  value.fill("", verseNumber - 1, typerData.value.length);
  prevValue.fill(null, 0, verseNumber - 1);
  prevValue.fill("", verseNumber - 1, typerData.prevValue.length);
  let states = values.map((_, i) => {
    if (i < verseNumber) {
      return null;
    }
    let args = { inputValue: value[i], previousValue: prevValue[i], verseText: versesText[i].content, settings };
    return parser.getResult(args);
  });

  yield put(updateTyperData(value, prevValue, states));
  yield put(setFocusedTyper(verseNumber));
}

function* updateTyperSaga({ data }) {
  let { id, newValue } = data;
  let typerData = yield select(state => state.typerData);
  let versesText = yield select(state => state.versesText);
  let settings = yield select(state => state.settings.settingValues);

  let prevValue = [...typerData.prevValue];
  let value = [...typerData.value];
  let state = [...typerData.state];
  prevValue[id] = value[id];
  let args = { inputValue: newValue, previousValue: prevValue[id], verseText: versesText[id].content, settings };

  state[id] = parser.getResult(args);
  value[id] = state[id].newText;
  yield put(updateTyperData(value, prevValue, state));
  if (state[id].mode === "DONE" && value.length > id + 1) {
    yield put(setFocusedTyper(id + 1));
  }
}

export default [
    takeEvery("START_TYPER", startTyperSaga),
    takeEvery("START_FROM", startTyperFromSaga),
    takeEvery("UPDATE_TYPER", updateTyperSaga),
  ];