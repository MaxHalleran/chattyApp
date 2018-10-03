import React, {Component} from 'react';

class NavbarPresenter extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className='navbar-user-count'>
          <p>{this.props.usersOnline} user{this.props.usersOnline === 1 ? '' : '\'s' } online</p>
        </div>
      </nav>
    );
  }
}

class NavbarContainer extends Component {
  render() {
    return(
      <NavbarPresenter usersOnline={this.props.usersOnline} />
    );
  }
}

export default NavbarContainer;
