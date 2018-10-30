"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let quisteions = [{id:1,catId: 'catagory 1',quistion:'very gooed fake quistion'},{id:2,catId: 'catagory 2',quistion:'very gooed fake quistion'},{id:3,catId: 'catagory 3',quistion:'very gooed fake quistion'}]

app.get("/catagories", (req, res) => {
    console.log('from catagories');
    let response = [{id:'catagory 1'},{id:'catagory 2'},{id:'catagory 3'},{id:'catagory 4'}];
    response = JSON.stringify(response);
    res.send(response);
});
app.get("/quistions/:catId",(req,res)=>{
    let catId = req.params.catId;
    let quisteionsGroup = quisteions.filter(element=>element.catId == catId);
    console.log(quisteionsGroup);
    res.json(quisteionsGroup);
})

// Create HTTP server by ourselves, in order to attach websocket server.
const httpServer = http.createServer(app);
const websocketServer = new WebSocket.Server({
  // verifyClient: checkConnectionAttempt,   // make sure you have a function here
  // that calls the sessionParser
  server: httpServer
});

let master,
  scoreBoard,
  gameCode,
  playerId = 0,
  playerIndex;
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
        playerIndex = players.indexOf(socket);
        players[playerIndex].name = inCommingMessage.name;
        sendingMessage = {
          type: "player-request",
          id: players[playerIndex].id,
          name: players[playerIndex].name
        };
        sendingMessage = JSON.stringify(sendingMessage);
        master.send(sendingMessage);
        break;
      case "accepted":
        console.log("from accepted");
        let clienId = inCommingMessage.id;
        let acceptedPlayer = players.filter(
          element => element.id === inCommingMessage.id
        )[0];
        sendingMessage = {
          type: "player-accpted",
          message: "you'r accepted",
        };
        sendingMessage = JSON.stringify(sendingMessage);
        acceptedPlayer.send(sendingMessage);

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
