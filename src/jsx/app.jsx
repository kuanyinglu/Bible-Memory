import "tailwindcss/base";
import "../css/global";
import "../css/app";
import "../css/menu";
import "../css/verse";
import "../css/chooser";
import "../css/setting";
import "tailwindcss/components";
import "tailwindcss/utilities";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from '../js/redux/store';
import { connect, Provider } from 'react-redux';
import Menu from './menu';
import VerseChooser from './verseChooser';
import Settings from './settings';
import VerseTyperPage from './verseTyperPage';
import { fetchSettings, fetchSavedVerses } from '../js/redux/actions';

class App extends React.Component {
  componentDidMount () {
    if (!this.props.settings.initialized) {
      this.props.fetchSettings();
    }
    if (!this.props.savedVerses.initialized) {
      this.props.fetchSavedVerses();
    }
  } 

  render () {
    return (
      <Router>
        <div className="flex flex-wrap content-start">
          <div className="title wrapper" aria-label="Bible Memory app">
            <h1>Bible Memory</h1>
          </div>
          <Menu/>
          <hr/>
            <Route path="/verses" exact component={VerseChooser} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/practice" exact component={VerseTyperPage} />
          <hr/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
  savedVerses: state.savedVerses
});

const mapDispatchToProps = dispatch => ({
  fetchSettings: () => dispatch(fetchSettings()),
  fetchSavedVerses: () => dispatch(fetchSavedVerses()),
});

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<Provider store={store}><AppContainer/></Provider>, document.querySelector("#app"));

