import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import store from '../js/redux/store';

class Menu extends React.Component {
  render () {
    return (
    <nav className="menu wrapper">
      <ul>
        <li>
          <Link to="/verses">Verses</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/practice">Practice</Link>
        </li>
      </ul>
    </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(null, mapDispatchToProps)(Menu);