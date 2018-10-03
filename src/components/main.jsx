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
  imgAppender(string) {
    console.log((/(.jpg)\b|(.png)\b|(gif)\b/g).test(string));
    let newArray = string.split(' ').map((subString) => {
      console.log(subString);
      if ((/(.jpg)\b|(.png)\b|(gif)\b/g).test(subString)) {
        return (<img className="message-image" src={subString} />);
      }
      return (subString + ' ');
    });
    return newArray;
  }

  imageChecker(message) {
    const newMessage = {...message};
    newMessage.content = this.imgAppender(message.content);
    return newMessage;
  }

  render() {
    const forwardedMessage = this.imageChecker(this.props.message);
    return (
      <ChatMessagePresenter message={forwardedMessage} />
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
