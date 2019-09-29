import "../css/global";
import "../css/app";
import "../css/menu";
import "../css/practice";
import "../css/chooser";
import "../css/setting";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import store from '../js/redux/store';
import { connect, Provider } from 'react-redux';
import Menu from './menu';
import VerseChooser from './verseChooser';
import Settings from './settings';
import VerseTyper from './verseTyper';
import { initializeSettings } from '../js/redux/actions';

class App extends React.Component {
  componentDidMount () {
    if (!this.props.settings.initialized) {
      let updateFunc = this.props.initializeSettings;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https' + window.location.hostname + '/getSettings');
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          updateFunc(xhr2.responseText);
        }
      }
      xhr.send();
    }
  } 

  render () {
    return (
      <Router>
        <div id="container">
          <div className="title wrapper" aria-label="Bible Memory app">
            <h1>Bible Memory</h1>
          </div>
          <Menu/>
          <hr/>
            <Route path="/verses" exact component={VerseChooser} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/practice" exact component={VerseTyper} />
          <hr/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  initializeSettings: newSettings => dispatch(initializeSettings(newSettings))
});

let AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<Provider store={store}><AppContainer/></Provider>, document.querySelector("#app"));

