export const changeMode = mode => ({ type: "CHANGE_MODE", data: mode });//"PRACTICE, CHOOSE_VERSE, CHANGE_SETTING"
export const searchVerses = reference => ({ type: "SEARCH_VERSES", data: reference });
export const loadSavedVerses = () => ({ type: "LOAD_SAVED_VERSES" });
export const processFetchedVerses = textArray => ({ type: "PROCESS_FETCHED_VERSES", data: textArray });
export const changeSettings = newSetting => ({ type: "CHANGE_SETTING", data: { setting: newSetting.setting, value: newSetting.value } });
export const restart = () => ({ type: "RESTART" });
export const startFrom = verse => ({ type: "START_FROM", data: verse });
