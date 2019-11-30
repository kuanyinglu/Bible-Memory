import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import store from '../js/redux/store';

class Menu extends React.Component {
  logout() {
    gapi.auth2.getAuthInstance().signOut();
    window.location.href = 'https://bible-memory.herokuapp.com';
  };

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
      <span className="log-out" onClick={() => this.logout()}>Log out</span>
    </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(null, mapDispatchToProps)(Menu);