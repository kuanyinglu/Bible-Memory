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
        case "UPDATE_SETTINGS":
            return Object.assign({}, state, { initialized: true, settingValues: Object.assign({}, state.settingValues, action.data) });
        default:
            return state;
    }
}

const savedVerses = (state = { initialized: false, verses: { uncategorized: []} }, action) => {
    switch (action.type) {
        case "UPDATE_SAVED_VERSES":
            return { initialized: true, verses: action.data };
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

const typerData = (state = { values: [], prevValues: [], states: [] }, action) => {
    switch (action.type) {
        case "UPDATE_TYPER_DATA":
            return { prevValues: action.data.prevValues, values: action.data.values, states: action.data.states
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