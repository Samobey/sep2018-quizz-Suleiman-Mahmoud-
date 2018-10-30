"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("lkjsl;dkfjlk goed");
});

// Create HTTP server by ourselves, in order to attach websocket server.
const httpServer = http.createServer(app);
const websocketServer = new WebSocket.Server({
  // verifyClient: checkConnectionAttempt,   // make sure you have a function here
  // that calls the sessionParser
  server: httpServer
});

let master, scoreBoard, gameCode,playerId = 0;
let players = [];

websocketServer.on("connection", (socket, req) => {
  let kind = req.url.slice(1, req.url.length);
  switch (kind) {
    case "master":
      master = socket;
      break;
    case "scoreBoard":
      scoreBoard = socket;
      break;
    case "player":
      socket.id = ++playerId;
      players.push(socket);
      console.log("player");
      break;
    default:
      console.log("undefined");
  }
  socket.on("message", message => {
    let sendingMessage;
    let inCommingMessage = JSON.parse(message);
    switch (inCommingMessage.type) {
      case "set-code":
        gameCode = inCommingMessage.msg;
        break;
      case "add-me-player":
      console.log('jhsdfkjhj');
        let playerIndex = players.indexOf(socket);
        players[playerIndex].name = inCommingMessage.name;
        sendingMessage = {type:'player-request',id:players[playerIndex].id,name:players[playerIndex].name};
        sendingMessage = JSON.stringify(sendingMessage)
        master.send(sendingMessage);
        break;
      default:
        
    } 
  });
});

//
// Start the server.
const port = 4000;
httpServer.listen(port, () =>
  console.log(`Listening on http://localhost:${port}/`)
);
