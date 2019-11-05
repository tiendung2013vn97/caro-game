global.BASE_DIR = __dirname;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const passport = require("passport");

const app = express();

require("./passport");


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", routes.user);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
