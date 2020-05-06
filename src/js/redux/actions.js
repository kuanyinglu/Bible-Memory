//Saga actions
export const searchVerses = reference => ({ type: "SEARCH_VERSES", data: reference });
export const practiceBibleBooks = () => ({ type: "PRACTICE_BIBLE_BOOKS" });

export const startTyper = () => ({ type: "START_TYPER" });
export const startFrom = verseNumber => ({ type: "START_FROM", data: verseNumber });
export const updateTyper = (id, newValue) => ({ type: "UPDATE_TYPER", data: { id, newValue } });

export const fetchSettings = () => ({ type: "FETCH_SETTINGS" });
export const saveSettings = () => ({ type: "SAVE_SETTINGS" });
export const fetchSavedVerses = () => ({ type: "FETCH_SAVED_VERSES" });
export const addVerse = reference => ({ type: "ADD_VERSE", data: reference });
export const deleteVerse = reference => ({ type: "DELETE_VERSE", data: reference });
export const saveVerses = () => ({ type: "SAVE_VERSES" });

//user data actions
export const updateSettings = newSetting => ({ type: "UPDATE_SETTINGS", data: newSetting });
export const updateSavedVerses = (objString) => ({ type: "UPDATE_SAVED_VERSES", data: objString });

//typer actions
export const updateTyperData = (values, prevValues, states) => ({ type: "UPDATE_TYPER_DATA", data: { values, prevValues, states } });

//typer internal
export const updateVerses = reference => ({ type: "UPDATE_VERSES", data: reference });
export const typerReady = ready => ({ type: "TYPER_READY", data: ready });
export const processFetchedVerses = (textArray, reference) => ({ type: "PROCESS_FETCHED_VERSES", data: textArray, reference: reference });
export const setFocusedTyper = id => ({ type: "SET_FOCUSED_TYPER", data: id });