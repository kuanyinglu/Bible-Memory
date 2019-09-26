import { getVerses } from "../api";
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
        case "SEARCH_VERSES":
            getVerses(action.data);
            return state;
        case "PROCESS_FETCHED_VERSES":
            return action.data.map(v => {
                let obj = { id: v.id, title: v.title, verse: v.verse, chapter: v.chapter, content: v.content, userInput: "" };
                if (v.id === 0) {
                    obj.reference = action.reference;
                }
                return obj;
            });
        case "CHANGE_TEXT":
        //lots of work done here
            return state;
        default:
            return state;
    }
}

const settings = (state = settingsDefinition, action) => {
    switch (action.type) {
        case "CHANGE_SETTING":
            return Object.assign({}, state, { [action.data.setting]: action.data.value });
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

const currentVerses = (state = "", action) => {
    switch (action.type) {
        case "UPDATE_VERSES":
            return action.data;
        default:
            return state;
    }
}

const typerData = (state = { value: [], prevValue: []}, action) => {
    switch (action.type) {
        case "START_TYPER":
            return { value: action.data.map(() => ""),
                prevValue: action.data.map(() => "")};
        case "START_FROM":
            return { value: state.value.map((val, i) => i >= action.data.verse ? "" : val),
                prevValue: state.value.map((val, i) => i >= action.data.verse ? "" : val)};
        case "UPDATE_TYPER":
            return { prevValue: state.value.map((val, i) => i >= action.data.id ? state.value[i] : val),
                value: state.value.map((val, i) => i === action.data.id ? action.data.value : val),
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
    currentVerses,
    typerData
});

export default typerApp;