// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const utility = require('./utility.js');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // we update new user with a unique color
  ws.send(JSON.stringify(utility.assignUserColor()));

  // update online user count for all users
  console.log('attempting to update users');
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(utility.updateUserNotification(wss.clients.size)));
    }
  });

  // broadcast new messages to all connected users
  ws.on('message', function incoming(data) {
    const newMessage = JSON.stringify(utility.messageConstructor(JSON.parse(data)));
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
        client.send(JSON.stringify(utility.updateUserNotification(wss.clients.size)));
      }
    });
  });
});
