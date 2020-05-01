export const searchVerses = reference => ({ type: "SEARCH_VERSES", data: reference });
export const updateSavedVerses = (objString) => ({ type: "UPDATE_SAVED_VERSES", data: objString});
export const saveVerses = (objString) => ({ type: "SAVE_VERSES", data: objString});
export const processFetchedVerses = (textArray, reference) => ({ type: "PROCESS_FETCHED_VERSES", data: textArray, reference: reference });
export const changeSettings = newSetting => ({ type: "CHANGE_SETTING", data: { setting: newSetting.setting, value: newSetting.value } });
export const initializeSettings = newSetting => ({ type: "INITIALIZE_SETTING", data: newSetting });
export const startTyper = textArray => ({ type: "START_TYPER", data: textArray });
export const startFrom = verse => ({ type: "START_FROM", data: verse });
export const updateTyper = (id, value) => ({ type: "UPDATE_TYPER", data: { id, value } });


export const updateVerses = reference => ({ type: "UPDATE_VERSES", data: reference });
export const typerReady = ready => ({ type: "TYPER_READY", data: ready });