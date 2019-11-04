const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors({ credentials: true }));
routes(app);

const port = process.env.PORT || config.PORT;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
