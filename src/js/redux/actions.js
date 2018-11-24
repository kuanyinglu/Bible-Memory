export const changeMode = mode => ({ type: "CHANGE_MODE", data: mode });//"PRACTICE, CHOOSE_VERSE, SETTINGS"
export const searchVerses = reference => ({ type: "SEARCH_VERSES", data: referecne });
export const textboxInput = newInput => ({ type: "CHANGE_TEXT", data: newInput});
export const changeSetting = newSetting => ({ type: "CHANGE_SETTING", data: { setting: newSetting.setting, value: newSetting.value} });
export const restart = () => ({ type: "RESTART" });
export const startFrom = verse => ({ type: "START_FROM", data: verse });
