import React, {Component} from 'react';

/** FooterPresenter
* As there was quite a bit of logic and event setting/handling to be done I broke off the styling portion from the logic portion
*/
class FooterPresenter extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.props.changeName} placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

/** FooterContainer
* the footer container contains 2 form elements each with events bound to them.
*/
class FooterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {value: this.props.currentUser.name};

    this.changeName = this.changeName.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  /** changeName
  * changeName allows the user to change their name. The text field is actually a controlled input component
  * it listens to every keypress event, updating the state of the Component
  * and when the enter key is pressed, the users name is updated
  */
  changeName(event) {
    if (event.key === 'Enter') {
      if (event.target.value !== 'userUpdater' && event.target.value !== 'colorAssigner') {
        this.props.changeUser(event.target.value);
        event.target.value = '';
      }
    };
    console.log('key pressed: ', event.key);
  }

  /** handleKeyPress
  * handleKeyPress listens for changes to the message field and when a new message is written and the enter key is pressed, a new message is sent out to the server
  */
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
        changeName={this.changeName}
        value={this.state.value}
      />
    );
  }
}

export default FooterContainer;
