import React, {Component} from 'react';
import FooterContainer from './components/footer.jsx';
import NavbarContainer from './components/navbar.jsx';
import MainContainer from './components/main.jsx';

// The App Presenter and Container put together the entire completed SPA

class AppPresenter extends Component {
  render() {
    return (
      <div>
        <NavbarContainer usersOnline={this.props.usersOnline} />
        <MainContainer messageList={this.props.messageList} />
        <FooterContainer
          changeUser={this.props.changeUser}
          addNewMessage={this.props.addNewMessage}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

/** AppContainer
* the main hub of the app. Takes control of the majority of the logic for the app and communicates with the WebSocket
*/
class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {
        name: 'Anonymous',
        color: '#F2B494',
      },
      usersOnline: 1,
      messages: [],
    }
    this.chattySocket;

    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /** the user getter function
  */
  get user() {
    return this.state.currentUser;
  }

  /** userCount =   * changes the usersOnline state of the app.
  * the getter is just incase, it's never used.
  */
  set userCount(userNumber) {
    this.setState({ usersOnline: userNumber });
  }
  get userCount() {
    return this.state.usersOnline;
  }

  /** usersColor
  * sets and gets the users color
  */
  set usersColor(newColor) {
    const currentUser = {...this.user};
    currentUser.color = newColor;
    this.setState({ currentUser });
  }
  get usersColor() {
    return this.state.currentUser.color;
  }

  componentDidMount() {
    // intitalizing a websocket connection
    this.chattySocket = new WebSocket("ws://localhost:3001/");

    this.chattySocket.onopen = (event) => {
      console.log('connection to server establised');
    };

    this.chattySocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage.username === 'userUpdater') {
        this.userCount = newMessage.content;
        return true;
      }
      if (newMessage.username === 'colorAssigner') {
        this.usersColor = newMessage.content;
        return true;
      }

      this.setState({ messages: [...this.state.messages, newMessage]});
    }
  }

  // the helper functions

  /** messageConstructor
  * constructs a message and populates the needed fields
  * @param {Object}message the message data to be formatted
  * @param {Boolean}system indicates to the constructor what kind of message to build
  */
  messageConstructor(message, system) {
    const builtMessage = {
      username: (system ? false : this.state.currentUser.name),
      color: this.usersColor,
      content: message,
      system: system,
    }
    return builtMessage;
  }

  /** addNewMessage
  * builds a message and sends it to the web socket server
  * @param {Object}message the message data given
  * @param {Boolean}system defines whether the message is a system message or a user message. Default is user.
  */
  addNewMessage(message, system = false) {
    const newMessage = this.messageConstructor(message, system);
    this.chattySocket.send(JSON.stringify(newMessage));
  }

  /** changeUser
  * changes the users name and sends a notification to the system
  * @param {String}username the new username for the user
  */
  changeUser(username) {
    const currentUser = {...this.state.currentUser};
    currentUser.name = username;
    const systemNotification = `${this.state.currentUser.name} changed their name to ${username}.`;
    this.addNewMessage(systemNotification, true);
    this.setState({ currentUser });
  }

  render() {
    return (
      <AppPresenter
        messageList={this.state.messages}
        currentUser={this.state.currentUser}
        addNewMessage={this.addNewMessage}
        changeUser={this.changeUser}
        usersOnline={this.state.usersOnline}
      />
    );
  }
}
export default AppContainer;
