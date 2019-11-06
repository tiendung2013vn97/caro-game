global.BASE_DIR = __dirname;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const http = require("http");
const sockerIO = require("socket.io");
const passport = require("passport");

let players = [];

const app = express();
const server = http.createServer(app);
require("./passport");

const io = sockerIO(server);
io.on("connection", socket => {
  console.log("User connected" + socket.id);
  let player = {
    status: "ready", //ready,waiting,ingame
    id: socket.id,
    enemyId: null,
    info:null
  };
  players.push(player);
  console.log(players);

  socket.on("cancle find match", () => {
    players.forEach((player, index) => {
      if (player.id === socket.id) {
        console.log("id ", player.id, "cancle find match");
        players[index].status = "ready";
        players[index].enemyId = null;
        return;
      }
    });
  });

  socket.on("send msg", (msg) => {
    players.forEach((player, index) => {
      if (player.id === socket.id) {
        socket.nsp.to(player.enemyId).emit("send msg",msg);
        return;
      }
    });
  });
  socket.on("hit", (val) => {
    players.forEach((player, index) => {
      if (player.id === socket.id) {
        socket.nsp.to(player.enemyId).emit("hit",val);
        console.log('hit',val)
        return;
      }
    });
  });

  socket.on("find match", (info) => {console.log("id ", socket.id, " finding match",players);
    let playerPos = -1;
    players.forEach((player, index) => {
      if (player.id === socket.id) {
        
        players[index].status = "waiting";
        players[index].info=info;
        playerPos = index;
        return;
      }
    });
    if (playerPos === -1) return;

    players.forEach((player, index) => {
      if (player.id != players[playerPos].id && player.status === "waiting") {
        console.log("id ", player.id, players[playerPos].id, "  matched");
        players[index].status = "ingame";
        players[index].enemyId = players[playerPos].id;

        players[playerPos].status = "ingame";
        players[playerPos].enemyId = players[index].id;

        console.log('iddddd',player.id,players[playerPos].id)
        console.log('info',players[playerPos].info,players[index].info)
        socket.nsp.to(players[index].id).emit("found match",players[playerPos].info);
        socket.nsp.to(players[playerPos].id).emit("found match", players[index].info);
        socket.nsp.to(players[index].id).emit("avail_val",'1,previous');
        socket.nsp.to(players[playerPos].id).emit("avail_val", '2,follow');

      }
    });
  });

  socket.on("send info", info => {
    player.forEach((player, index) => {
      if (player.id === socket.id) {
        player.forEach((player2, index) => {
          if (player2.id == player.enemyId) {
            socket.nsp.to(player.enemyId).emit("enemy info", info);
          } else {
            socket.nsp.to(player.id).emit("error", "enemy_not_exist");
          }
        });
      }
    });
  });

  socket.on("out room", () => {
    players.forEach((player, index) => {
      if (player.id === socket.id && player.status === "ingame") {
        players[index].status = "ready";
        if (player.enemyId !== null) {
          socket.nsp.to(player.enemyId).emit("enemy out", "");
          console.log("id ", player.id, "  out room success");
          players.forEach((player2, index2) => {
            if (player2.id == player.enemyId) {
              (players[index2].status = "ready"),
                (players[index2].enemyId = null);
            }
          });
          players[index].enemyId = null;
        }

        return;
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected" + socket.id);
    players.forEach((player, index) => {
      if (player.id === socket.id && player.status === "ingame") {
        if (player.enemyId !== null) {
          
          socket.nsp.to(player.enemyId).emit("enemy out", "");
          players.forEach((player2, index2) => {
            if (player2.id == player.enemyId) {
              (players[index2].status = "ready"),
                (players[index2].enemyId = null);
                
            }
          });
        }
      }
      players.splice(index, 1);
      return;
    });
  });
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", routes.user);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
