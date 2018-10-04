import React, {Component} from 'react';

/** SystemMessageContainer
* as system messages are quite easy to construct and convey, the system message component is quite simple
* @param {Object}props.message an object with the only relevant data being the content of said message.
*/
function SystemMessageContainer(props) {
  return (
    <div className="message system">
      {props.message}
    </div>
  );
}

/** ChatMessagePresenter
* As there's quite a bit of logic for the individual messages I broke the logic and the presentation into seperate pieces.
*/
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

/** ChatMessageContainer
* the chat message container goes through all the work of formatting the users messages to allow for pictures.
*/
class ChatMessageContainer extends Component {
  imgAppender(string) {
    let newArray = string.split(' ').map((subString) => {
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

class MainContainer extends Component {
  render() {
    const messageList = this.props.messageList.map((message) => {
      return (
        (message.system) ?
          <SystemMessageContainer key={message.id.toString()} message={message.content} /> :
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

export default MainContainer;
