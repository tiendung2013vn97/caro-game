global.BASE_DIR = __dirname;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const http=require('http')
const sockerIO=require('socket.io')
const passport = require("passport");

let player=[]

const app = express();
const server= http.createServer(app)
require("./passport");

const io=sockerIO(server)
io.on('connection', socket => {
  console.log('User connected'+socket.id)
  
  socket.on('disconnect', () => {
    console.log('user disconnected'+socket.id)
  })
})

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", routes.user);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
