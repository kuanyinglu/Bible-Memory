//Saga actions
export const searchVerses = reference => ({ type: "SEARCH_VERSES", data: reference });
export const practiceBibleBooks = () => ({ type: "PRACTICE_BIBLE_BOOKS" });

export const startTyper = () => ({ type: "START_TYPER" });
export const startFrom = verseNumber => ({ type: "START_FROM", data: verseNumber });
export const updateTyper = (id, newValue) => ({ type: "UPDATE_TYPER", data: { id, newValue } });

//
export const updateSavedVerses = (objString) => ({ type: "UPDATE_SAVED_VERSES", data: objString});
export const saveVerses = (objString) => ({ type: "SAVE_VERSES", data: objString});
export const changeSettings = newSetting => ({ type: "CHANGE_SETTING", data: { setting: newSetting.setting, value: newSetting.value } });
export const initializeSettings = newSetting => ({ type: "INITIALIZE_SETTING", data: newSetting });

//typer actions
export const updateTyperData = (value, prevValue, state) => ({ type: "UPDATE_TYPER_DATA", data: { value, prevValue, state } });

//typer internal
export const updateVerses = reference => ({ type: "UPDATE_VERSES", data: reference });
export const typerReady = ready => ({ type: "TYPER_READY", data: ready });
export const processFetchedVerses = (textArray, reference) => ({ type: "PROCESS_FETCHED_VERSES", data: textArray, reference: reference });
export const setFocusedTyper = id => ({ type: "SET_FOCUSED_TYPER", data: id });