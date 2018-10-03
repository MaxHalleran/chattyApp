// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uniqueId = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Helper functions, will most likely be moved to another file/folder
const messageConstructor = function messageConstructor(message) {
  const newMessage = {
    id: uniqueId(),
    username: message.username,
    color: message.color,
    content: message.content,
    system: message.system,
  }
  return newMessage;
}

const updateUserNotification = function updateUserNotification(numberOfUsers) {
  console.log(numberOfUsers);
  const notification = {
    username: 'userUpdater',
    content: numberOfUsers,
    system: true,
  }
  console.log(notification);
  return messageConstructor(notification);
}

function assignUserColor() {
  const colorGiver = {
    username: 'colorAssigner',
    content: ('#'+Math.floor(Math.random()*16777215).toString(16)),
    system: true,
  }
  return colorGiver;
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //lets update the new user. But first, lets make sure we can reach them.
  ws.send(JSON.stringify(assignUserColor()));

  // update online user count for all users
  console.log('attempting to update users');
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updateUserNotification(wss.clients.size)));
    }
  });

  ws.on('message', function incoming(data) {
    const newMessage = JSON.stringify(messageConstructor(JSON.parse(data)));
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(newMessage);
        client.send(newMessage);
      }
    });
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    // update online user count for all users
    console.log('attempting to update users');
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(updateUserNotification(wss.clients.size)));
      }
    });
  });
});
