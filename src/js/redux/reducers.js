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

let initialSetting = settingsDefinition;

const settings = (state = initialSetting, action) => {
    switch (action.type) {
        case "CHANGE_SETTING":
            return Object.assign({}, state, { [action.data.setting]: action.data.value });
        default:
            return state;
    }
}

const savedVerses = (state = { initialized: false, verses: [] }, action) => {
    switch (action.type) {
        case "LOAD_SAVED_VERSES":
            return typeof(verses) === 'undefined' || verses.length === 0 ? 
            { initialized: true, verses: [] } :
            { initialized: true, verses: verses };
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

const typerApp = combineReducers({
    appMode,
    versesText,
    settings,
    savedVerses,
    currentVerses
});

export default typerApp;