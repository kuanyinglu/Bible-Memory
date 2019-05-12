import "../css/app";
import "../css/menu";
import "../css/practice";
import "../css/chooser";
import "../css/setting";
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../js/redux/store';
import { connect, Provider } from 'react-redux';
import Menu from './menu';
import VerseChooser from './verseChooser';
import Settings from './settings';
import VerseTyper from './verseTyper';

class App extends React.Component {
  render () {
    let activeComponent = null;
    switch (this.props.appMode) {
      case "PRACTICE":
        activeComponent = <VerseTyper/>;
        break;
      case "CHOOSE_VERSE":
        activeComponent = <VerseChooser/>;
        break;
      case "CHANGE_SETTING":
        activeComponent = <Settings/>;
        break;
    }
    return (
      <div id="container">
        <div className="title wrapper">
          <h1>Bible Memory</h1>
        </div>
        <Menu/>
        <hr/>
        {activeComponent}
        <hr/>
        <div className="wrapper"><p>Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. May not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible.</p></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appMode: state.appMode
});

let AppContainer = connect(mapStateToProps)(App);

ReactDOM.render(<Provider store={store}><AppContainer/></Provider>, document.querySelector("#app"));

