import React, {Component} from 'react';

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
          <span style={{color:this.props.message.color}} className="message-username">{this.props.message.username}</span>
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

class MainContainer extends Component {
  render() {
    return (
      <MainPresenter messageList={this.props.messageList} />
    );
  }
}

export default MainContainer;
