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

  userCountChange(userNumber) {
    this.setState({ usersOnline: userNumber });
  }

  usersColor(newColor) {
    const currentUser = {...this.state.currentUser};
    currentUser.color = newColor;
    this.setState({ currentUser });
  }

  componentDidMount() {
    // intitalizing a websocket connection
    this.chattySocket = new WebSocket("ws://localhost:3001/");

    this.chattySocket.onopen = (event) => {
      console.log('connection to server establised');
    };

    this.chattySocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(newMessage);
      if (newMessage.username === 'userUpdater') {
        console.log('time to update!');
        this.userCountChange(newMessage.content);
        return true;
      }
      if (newMessage.username === 'colorAssigner') {
        console.log('get that color');
        this.usersColor(newMessage.content);
        return true;
      }

      this.setState({ messages: [...this.state.messages, newMessage]});
      console.log(this.state.messages);
    }
  }

  // the helper functions
  messageConstructor(message, system) {
    const builtMessage = {
      username: (system ? false : this.state.currentUser.name),
      color: this.state.currentUser.color,
      content: message,
      system: system,
    }
    console.log('builtMessage: ', builtMessage);
    return builtMessage;
  }

  addNewMessage(message, system = false) {
    const newMessage = this.messageConstructor(message, system);
    this.chattySocket.send(JSON.stringify(newMessage));
  }

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
