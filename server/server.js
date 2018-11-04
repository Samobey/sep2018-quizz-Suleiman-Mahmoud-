"use strict";
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const CategorySchema = require("./models/categorySchema");
const QuizzerSchema = require("./models/quizzerSchema");
const QuestionSchema = require("./models/questionsSchema");
const dbName = "quizzer-app";

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use( bodyParser.text() );
let selectedQuistios;
app.get("/test",(req,res)=>{
  
 
});
app.get("/catagories", (req, res) => {
  CategorySchema.find()
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
app.get("/quistions/:catId", (req, res) => {
  const catId = req.params.catId;
  QuestionSchema.find({ category: catId })
    .populate("question.category")
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
app.get("/question/:quizzerId/:quistionNumber/", (req, res) => {
  let quistionNumber = req.params.quistionNumber;
  let quizzerId = req.params.quizzerId;
  QuizzerSchema.findOne({ _id: quizzerId })
    .then(quizzer => {
      let quistionId = quizzer.rounds[0].questions[quistionNumber];
      QuestionSchema.findOne(mongoose.Types.ObjectId(quistionId)).then(
        quistion => {
          res.json(quistion.question);
        }
      );
    })
    .catch(err => console.log(err));
});

app.put("/quistions", (req, res) => {
  if (req.body) {
    selectedQuistios = req.body.quistions;
    let quizzerId = req.body.quizzerId;
    let roundNumber = req.body.roundNumber;
    QuizzerSchema.findOne({ _id: quizzerId })
      .then(quizzer => {
        if (quizzer) {
          quizzer.rounds.push({
            _id: roundNumber,
            questions: selectedQuistios
          });
          quizzer.save();
        }
      })
      .catch(err => console.log(err));
  }
  res.json({ ok: true });
});
const httpServer = http.createServer(app);
const websocketServer = new WebSocket.Server({
  server: httpServer
});

let master,
  scoreBoard,
  gameCode,
  playerId = 0,
  playerIndex,
  id = 1,
  clienId;

websocketServer.on("connection", (socket, req) => {
  socket.on("message", message => {
    let sendingMessage;
    let inCommingMessage = JSON.parse(message);
    switch (inCommingMessage.type) {
      case "set-code":
        let quizzer = new QuizzerSchema({
          _id: inCommingMessage.msg,
          master: id
        }).save();
        socket.id = id;
        socket.code = inCommingMessage.msg;
        id++;
        break;
      case "send-answer":
        QuizzerSchema.findOne({ _id: socket.code })
          .then(quizzer => {
            if (quizzer) {
              let masterId = quizzer.master;

              sendingMessage = {
                type: "get-answer",
                teamId: socket.id,
                answer: inCommingMessage.msg
              };
              sendingMessage = JSON.stringify(sendingMessage);
              websocketServer.clients.forEach(client => {
                if (client.id == masterId) {
                  client.send(sendingMessage);
                  return;
                }
              });
            }
          })
          .catch(err => console.log(err));
        break;
      case "close-the-question":
        QuizzerSchema.findOne({ _id: socket.code }).then(quizzer => {
          if (quizzer) {
            let teams = quizzer.teams;
            console.log("sdfsdfdsf", teams);
            sendingMessage = { type: "question-closed" };
            sendingMessage = JSON.stringify(sendingMessage);
            websocketServer.clients.forEach(client => {
              if (teams.find(team => team.id == client.id)) {
                client.send(sendingMessage);
              }
            });
          }
        });
        break;
      case "send-quistion":
        QuizzerSchema.findOne({ _id: socket.code })
          .then(quizzer => {
            if (quizzer) {
              sendingMessage = {
                type: "get-quistion",
                quistionNumber: inCommingMessage.quistionNumber
              };
              sendingMessage = JSON.stringify(sendingMessage);
              websocketServer.clients.forEach(client => {
                if (quizzer.teams.find(team => team.id == client.id)) {
                  client.send(sendingMessage);
                }
              });
            }
          })
          .catch(err => console.log(err));

        break;
      case "send_code":
        QuizzerSchema.findOne({ _id: inCommingMessage.code })
          .then(quizzer => {
            if (quizzer) {
              sendingMessage = { type: "code-accepted" };
              socket.id = id;
              socket.code = inCommingMessage.code;
            } else {
              sendingMessage = { type: "code-not-accepted" };
            }
            sendingMessage = JSON.stringify(sendingMessage);
            socket.send(sendingMessage);
            id++;
          })
          .catch(err => console.log(err));

        break;
      case "add-me-player":
        socket.name = inCommingMessage.name;
        sendingMessage = {
          type: "player-request",
          id: socket.id,
          name: socket.name
        };
        sendingMessage = JSON.stringify(sendingMessage);
        QuizzerSchema.findOne({ _id: socket.code })
          .then(quizzer => {
            if (quizzer) {
              let masterId = quizzer.master;
              websocketServer.clients.forEach(client => {
                client.id == masterId ? client.send(sendingMessage) : "";
              });
            }
          })
          .catch(err => console.log(err));
        break;
      case "accepted":
        clienId = inCommingMessage.id;
        QuizzerSchema.findOne({ _id: socket.code })
          .then(quizzer => {
            if (quizzer) {
              sendingMessage = {
                type: "player-accpted"
              };

              sendingMessage = JSON.stringify(sendingMessage);
              websocketServer.clients.forEach(client => {
                if (client.id === clienId) {
                  client.send(sendingMessage);
                  quizzer.teams.push({ _id: client.id, name: client.name });
                  quizzer.save();
                }
              });
            }
          })
          .catch(err => console.log(err));

        break;
      case "accept-the-answer":
         QuizzerSchema.findOne({ _id: socket.code })
          .then(quizzer => {
            if (quizzer) {
              let teamIndex = quizzer.teams.findIndex((team)=>team.id = inCommingMessage.teamId);
              if(teamIndex !== -1){
                quizzer.teams[teamIndex].correctAnswers.push(inCommingMessage.roundNumber)
                quizzer.save();
                console.log('accept the answer',quizzer.teams[teamIndex].correctAnswers);
              }
            }
          })
          .catch(err => console.log(err));
        break;
      case "send_question":
        QuizzerSchema.findOne({ _id: socket.code })
          .then(quizzer => {
            if (quizzer) {
              sendingMessage = {
                type: "get-answer",
                msg: inCommingMessage.msg,
                userId: socket.id
              };
              sendingMessage = JSON.stringify(sendingMessage);
              let masterId = quizze.master;
              websocketServer.clients.forEach(client => {
                if (client.id === masterId) {
                  client.send(sendingMessage);
                  return true;
                }
              });
            }
          })
          .catch(err => console.log(err));
        break;
      case "reject-the-answer":
      break;

      case "rejected":
        clienId = inCommingMessage.id;
        if (quizze[socket.code]) {
          let notAcceptedPlayerId = quizze[socket.code].players.filter(
            element => element === clienId
          )[0];
          sendingMessage = {
            type: "player-not-accepted"
          };

          sendingMessage = JSON.stringify(sendingMessage);
          websocketServer.clients.forEach(client => {
            if (client.id === notAcceptedPlayerId) {
              client.send(sendingMessage);
            }
          });
        }
      default:
    }
  });
});

//
// Start the server.
const port = 4000;
httpServer.listen(port, () => {
  mongoose.connect(
    `mongodb://localhost:27017/${dbName}`,
    { useNewUrlParser: true },
    () => {
      console.log(`game server started on port ${httpServer.address().port}`);
      // return questions();
    }
  );
});
