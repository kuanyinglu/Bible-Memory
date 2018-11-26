import api from "../js/api";
import settings from "../js/settings";
import "../css/app";
import React from 'react';
import ReactDOM from 'react-dom';
import store from '../js/redux/store';
import { connect, Provider } from 'react-redux';
import Menu from './menu';
import VerseChooser from './verseChooser';

class App extends React.Component {
  render () {
    console.log(this.props);
    let activeComponent = null;
    switch (this.props.appMode) {
      case "PRACTICE":
        activeComponent = null;
        break;
      case "CHOOSE_VERSE":
        activeComponent = <VerseChooser/>;
        break;
      case "SETTINGS":
        activeComponent = null;
        break;
    }
    return (
      <div>
        <h1>Bible Memory</h1>
        <br/>
        <Menu/>
        <br/>
        {activeComponent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  appMode: state.appMode
});

let AppContainer = connect(mapStateToProps)(App);

ReactDOM.render(<Provider store={store}><AppContainer/></Provider>, document.querySelector("#app"));
// var app = {};
// app.init = function() {
//   if (typeof(verses) === "undefined" || typeof(token) === "undefined") {
//     setTimeout(app.init, 1000);
//   } else {
//     $('#accordion').accordion();
//     ui.renderVerseButtons();
//     settings.init();
//     document.onkeydown  = function(e) {
//       if (e.keyCode == 65 && e.ctrlKey) {//ctrl + a
//         ui.redoFromVerse(1);
//       }
//     };
//   }
// };
// app.incrementArray = function(start, end) {
//     let length = end - start + 1;
//     if (length > 0) {
//         return (new Array(length)).fill(0).map(function(a, index) {return start + index});
//     } else {
//         return [];
//     }
// };
// app.init();

