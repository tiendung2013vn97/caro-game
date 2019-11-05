const dbReader = require("./db-reader");
const SHA256 = require("crypto-js/sha256");

const sqlGetAccountByUsernameAndPassword = `select * from account where username=? and password=?`;
const sqlGetAccountByUsername = `select * from account where username=? `;
const sqlAddAccount = `insert into account(username,password,fullname,email,age,gender) 
values (?,?,?,?,?,?)`;

exports.getAccountByUsernameAndPassword = (username, password) => {
  return dbReader(sqlGetAccountByUsernameAndPassword, [
    username,
    SHA256(password).toString()
  ]);
};
exports.getAccountByUsername = username => {
  return dbReader(sqlGetAccountByUsername, [username]);
};

exports.addAccount = user => {
  return dbReader(sqlAddAccount, [
    user.username,
    SHA256(user.password).toString(),
    user.fullname,
    user.email,
    user.age,
    user.gender
  ]);
};

// {
//   "username":"dung",
//   "password":"a",
//   "email":"abc@gmail.com",
//   "fullname":"Nguyễn Tiến Dũng",
//   "age":22,
//   "gender":"male"
// }
