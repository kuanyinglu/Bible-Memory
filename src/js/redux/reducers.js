import { combineReducers } from 'redux';
import settingsDefinition from '../settingsDefinition';

const appMode = (state = "CHOOSE_VERSE", action)  => {
    switch (action.type) {
        case "CHANGE_MODE":
            return action.data;
        default:
            return state;
    }
}

const versesText = (state = [], action) => {
    switch (action.type) {
        case "PROCESS_FETCHED_VERSES":
            return action.data.map(v => {
                let obj = { id: v.id, title: v.title, verse: v.verse, chapter: v.chapter, content: v.content, userInput: "" };
                if (v.id === 0) {
                    obj.reference = action.reference;
                }
                return obj;
            });
        default:
            return state;
    }
}

const settings = (state = { initialized: false, settingValues: {} }, action) => {
    switch (action.type) {
        case "INITIALIZE_SETTING":
            let values;
            let newSettings = JSON.parse(action.data);
            if (Object.keys(newSettings).length === 0) {
                values = settingsDefinition;
            } else {
                values = newSettings;
            }
            return Object.assign({}, state, { initialized: true, settingValues: values });
        case "CHANGE_SETTING":
            return Object.assign({}, state, { settingValues: Object.assign({}, state.settingValues, { [action.data.setting]: action.data.value }) });
        default:
            return state;
    }
}

const savedVerses = (state = { initialized: false, verses: [] }, action) => {
    switch (action.type) {
        case "UPDATE_SAVED_VERSES":
            return { initialized: true, verses: JSON.parse(action.data) };
        default:
            return state;
    }
}

const appState = (state = { currentVerses: "", ready: true, focusedTyper: 0 }, action) => {
    switch (action.type) {
        case "UPDATE_VERSES":
            return {...state, currentVerses: action.data };
        case "TYPER_READY":
            return {...state, ready: action.data };
        case "SET_FOCUSED_TYPER":
            return {...state, focusedTyper: action.data };
        default:
            return state;
    }
}

const typerData = (state = { value: [], prevValue: [], state: []}, action) => {
    switch (action.type) {
        case "UPDATE_TYPER_DATA":
            return { prevValue: action.data.prevValue, value: action.data.value, state: action.data.state
                };
        default:
            return state;
    }
} 

const typerApp = combineReducers({
    appMode,
    versesText,
    settings,
    savedVerses,
    appState,
    typerData
});

export default typerApp;