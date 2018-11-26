import { getVerses } from "../api";
import { combineReducers } from 'redux';

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
            return action.data.map(v => ({ id: v.id, verse: v.verse, chapter: v.chapter, content: v.content, userInput: "" }));
        case "CHANGE_TEXT":
        //lots of work done here
            return state;
        default:
            return state;
    }
}

const setting = (state = {}, action) => {
    switch (action.type) {
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

const typerApp = combineReducers({
    appMode,
    versesText,
    setting,
    savedVerses
});

export default typerApp;