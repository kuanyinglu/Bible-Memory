import React from 'react';
import ReactDOM from 'react-dom';
import { changeMode } from '../js/redux/actions';
import { connect } from 'react-redux';
import store from '../js/redux/store';

class Menu extends React.Component {
  render () {
    return (
      <div className="menu wrapper">
        <a onClick={() => this.props.chooseMode("CHOOSE_VERSE")}>Verses</a>
        <a onClick={() => this.props.chooseMode("CHANGE_SETTING")}>Settings</a>
        <a onClick={() => this.props.chooseMode("PRACTICE")}>Practice</a>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  chooseMode: mode => dispatch(changeMode(mode))
});

export default connect(null, mapDispatchToProps)(Menu);