import React, {Component} from 'react';

/** NavbarContainer
* a functional component that has no logic or behaviour of it's own
* @param {Object}props the props object for this component just contains the number of users currently logged in
*/
function NavbarContainer(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <div className='navbar-user-count'>
        <p>{props.usersOnline} user{props.usersOnline === 1 ? '' : '\'s' } online</p>
      </div>
    </nav>
  );
}

export default NavbarContainer;
