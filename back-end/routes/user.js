var express = require("express");
var router = express.Router();
const accountRepo = require("../repo/account-repo");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const msgFactory = require("../response-message/index");
const multer = require("multer");

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
    return res.json(msgFactory.createMsgFail("NOT_ENOUGH_FIELD"));
  }
  const registerService = async () => {
    try {
      let accounts = await accountRepo.getAccountByUsername(user.username);
      if (accounts.length > 0) {
        return res.json(msgFactory.createMsgFail("USERNAME_IS_EXISTED"));
      }

      let resultAddAccount = await accountRepo.addAccount(user);
      return res.json(msgFactory.createMsgSuccess());
    } catch (error) {
      return res.json(msgFactory.createMsgFail("" + error));
    }
  };
  registerService();
});

router.post("/login", function(req, res, next) {
  let userTemp = req.body;
  if (!userTemp.username || !userTemp.password) {
    return res.json(msgFactory.createMsgFail("NOT_ENOUGH_FIELD"));
  }
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (user) {
      user = Object.assign({}, user);
    }
    if (err || !user) {
      return res.json({
        message: info ? info.message : "Login failed",
        user: user
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        return res.send(err);
      }

      const token = jwt.sign(user, "your_jwt_secret");
      delete user.password;

      return res.json({ user, token });
    });
  })(req, res);
});

router.get("/img", (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    accountRepo
      .getAccountByUsername(req.user.username)
      .then(users => {
        res.sendFile(global.BASE_DIR +'/static/user/'+ users[0].image);
      })
      .catch(err => {
        res.json(msgFactory.createMsgFail("" + err));
      });
  });
});

let limits = { fileSize: 10000000 };

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, global.BASE_DIR + "/static/user");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage, limits: limits }).single("file");
router.post("/update-avatar", (req, res) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    upload(req, res, err => {
      if (err) {
        return res.json(msgFactory.createMsgFail("" + err));
      }

      if (!req.file) {
        return res.json(msgFactory.createMsgFail("NO_AVATAR"));
      }

      accountRepo
        .updateImage(req.file.filename, req.user.username)
        .then(val => {
          return res.json(msgFactory.createMsgSuccess());
        })
        .catch(err => {
          return res.json(msgFactory.createMsgFail());
        });

      return res.json(msgFactory.createMsgSuccess());
    });
  });
});

router.post("/update", (req, res) => {
  passport.authenticate("jwt", { session: false })(req, res, () => {
    let account = req.body;
    if (
      !account.fullname ||
      !account.email ||
      !account.gender ||
      !account.age
    ) {
      return res.json(msgFactory.createMsgFail("NOT_ENOUGH_FIELD"));
    }
    accountRepo
      .updateAccount(account)
      .then(val => {
        return res.json(msgFactory.createMsgSuccess());
      })
      .catch(err => {
        return res.json(msgFactory.createMsgFail());
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
