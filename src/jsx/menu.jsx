import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

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