import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Menu extends React.Component {
  logout() {
    $.ajax({
      url: '/logout',
      headers: {
        "Authorization": "Token " + token
      },
      type: 'POST',
      error: () => {
        alert("Log out failed.");
      }
    });
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