var express = require("express");
var router = express.Router();
const accountRepo = require("../repo/account-repo");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/register", function(req, res, next) {
  let user = req.body;
  if (
    !user.username ||
    !user.password ||
    !user.email ||
    !user.fullname ||
    !user.age ||
    !user.gender
  ) {
    return res.json({
      statusCode: 400,
      msg:
        "Request is invalid! Please check if there is enough user's information to register!"
    });
  }
  const registerService = async () => {
    try {
      let accounts = await accountRepo.getAccountByUsername(user.username);
      if (accounts.length > 0) {
        return res.json({
          statusCode: 400,
          msg: "Username is existed! Please choose a other name!"
        });
      }

      let resultAddAccount = await accountRepo.addAccount(user);
      return res.json({
        statusCode: 200,
        msg: "Append account successfully!"
      });
    } catch (error) {
      console.log("error", error);
      return res.json({
        statusCode: 400,
        msg: "" + error
      });
    }
  };
  registerService();
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    user = Object.assign({}, user);
    console.log("userss", user, info);

    console.log(err);
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "your_jwt_secret");

      return res.json({ user, token });
    });
  })(req, res);
});

router.get("/img", (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    accountRepo
      .getAccountByUsername(req.user.username)
      .then(users => {
        res.sendFile(global.BASE_DIR + users[0].image);
      })
      .catch(err => {
        res.json({
          statusCode: 400,
          msg: err
        });
      });
  });
});
module.exports = router;

// {
// 	"username":"dung",
// 	"password":"1",
// 	"email":"ntiendung",
// 	"gender":"mail",
// 	"age":28,
// 	"fullname":"Nguyễn Tiến Dũng"
// }
