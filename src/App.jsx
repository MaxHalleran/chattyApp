import React, {Component} from 'react';

class NavbarPresenter extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
    );
  }
}

// The main chunk of the body, containing the message list

class SystemMessagePresenter extends Component {
  render() {
    return(
      <div className="message system">
        {this.props.message.content}
      </div>
    );
  }
}

class ChatMessagePresenter extends Component {
  render() {
    return (
        <div className="message">
          <span className="message-username">{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
    );
  }
}

class SystemMessageContainer extends Component {
  render() {
    return(
      <SystemMessagePresenter message={this.props.message} />
    );
  }
}

class ChatMessageContainer extends Component {
  render() {
    return (
      <ChatMessagePresenter message={this.props.message} />
    );
  }
}

class MainPresenter extends Component {
  render() {
    const messageList = this.props.messageList.map((message) => {
      return (
        (message.system) ?
          <SystemMessageContainer key={message.id.toString()} message={message} /> :
          <ChatMessageContainer key={message.id.toString()} message={message} />
      );
    });

    return(
      <main className="messages">
        {messageList}
      </main>
    );
  }
}

// The footer itself

class FooterPresenter extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.textbarPlaceholder} />
        <input onKeyPress={this.props.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

// The containers for the three main application sections

class NavbarContainer extends Component {
  render() {
    return(
      <NavbarPresenter />
    );
  }
}

class MainContainer extends Component {
  render() {
    return (
      <MainPresenter messageList={this.props.messageList} />
    );
  }
}

class FooterContainer extends Component {
  constructor(props) {
    super(props);

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.addNewMessage(event.target.value);
      event.target.value = '';
    };
    console.log('key pressed: ', event.key);
  }

  render() {
    const textbarPlaceholder = (
      this.props.currentUser.name === 'Anonymous' ?
      'Your Name (Optional)' :
      this.props.currentUser.name
    );

    return(
      <FooterPresenter
        textbarPlaceholder={textbarPlaceholder}
        handleKeyPress={this.handleKeyPress}
        currentUser={this.props.currentUser}
      />
    );
  }
}

// The App Presenter and Container put together the entire completed SPA

class AppPresenter extends Component {
  render() {
    return (
      <div>
        <NavbarContainer />
        <MainContainer messageList={this.props.messageList} />
        <FooterContainer addNewMessage={this.props.addNewMessage} currentUser={this.props.currentUser} />
      </div>
    );
  }
}

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Anonymous'},
      incrementer: 4,
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          id: 1,
          system: false,
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          id: 2,
          system: false,
        },
      ]
    }

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: message,
      id: this.state.incrementer,
      system: false,
    };
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, newMessage];
    this.setState({ messages: newMessages, incrementer: this.state.incrementer + 1 });
  }

    // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!", system: false};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <AppPresenter
        messageList={this.state.messages}
        currentUser={this.state.currentUser}
        addNewMessage={this.addNewMessage}
      />
    );
  }
}
export default AppContainer;
