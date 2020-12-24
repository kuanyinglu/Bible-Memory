import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class Menu extends React.Component {
  render () {
    return (
    <nav className="menu-wrapper">
      <ul className="menu-ul">
        <li>
          <Link className="menu-a" to="/verses">Verses</Link>
        </li>
        <li>
          <Link className="menu-a" to="/settings">Settings</Link>
        </li>
        <li>
          <Link className="menu-a" to="/practice">Practice</Link>
        </li>
      </ul>
    </nav>
    )
  }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(null, mapDispatchToProps)(Menu);
