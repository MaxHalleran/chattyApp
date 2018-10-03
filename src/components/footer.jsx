import React, {Component} from 'react';

class FooterPresenter extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.props.changeValue} placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

class FooterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.currentUser.name};

    this.changeValue = this.changeValue.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  changeValue(event) {
    if (event.key === 'Enter') {
      if (event.target.value !== 'userUpdater') {
        this.props.changeUser(event.target.value);
        event.target.value = '';
      }
    };
    console.log('key pressed: ', event.key);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.addNewMessage(event.target.value);
      event.target.value = '';
    };
    console.log('key pressed: ', event.key);
  }

  render() {
    return(
      <FooterPresenter
        handleKeyPress={this.handleKeyPress}
        currentUser={this.props.currentUser}
        changeValue={this.changeValue}
        value={this.state.value}
      />
    );
  }
}

export default FooterContainer;
