const uniqueId = require('uuid/v1');

/** messageConstructor
* when passed a message from a user, constructs a message object with a unique id
* @param {Object}message a message object recieved from a client
*/
exports.messageConstructor = function messageConstructor(message) {
  const newMessage = {
    id: uniqueId(),
    username: message.username,
    color: message.color,
    content: message.content,
    system: message.system,
  }
  return newMessage;
}

/** updateUserNotification
* constructs a system notification with the number of active users
* @param {Number}numberOfUsers
*/
exports.updateUserNotification = function updateUserNotification(numberOfUsers) {
  const notification = {
    username: 'userUpdater',
    content: numberOfUsers,
    system: true,
  }
  return this.messageConstructor(notification);
}

/** assignUserColor
* constructs a system notification that contains a random number hex
*/
exports.assignUserColor = function assignUserColor() {
  const colorGiver = {
    username: 'colorAssigner',
    content: ('#'+Math.floor(Math.random()*16777215).toString(16)),
    system: true,
  }
  return colorGiver;
}