const dbReader = require("./db-reader");
const SHA256 = require("crypto-js/sha256");

const sqlGetAccountByUsernameAndPassword = `select * from account where username=? and password=?`;
const sqlGetAccountByUsername = `select * from account where username=? `;
const sqlAddAccount = `insert into account(username,password,fullname,email,age,gender) 
values (?,?,?,?,?,?)`;
const sqlUpdateAccount = `update account set fullname=?,email=?,age=?,gender=?`;
const sqlUpdateImage = `update account set image=? where username=?`;

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

exports.updateAccount = userUpdate => {
  return dbReader(sqlUpdateAccount, [
    userUpdate.fullname,
    userUpdate.email,
    userUpdate.age,
    userUpdate.gender
  ]);
};

exports.updateImage = (image, username) => {
  return dbReader(sqlUpdateImage, [image, username]);
};

// {
//   "username":"dung",
//   "password":"a",
//   "email":"abc@gmail.com",
//   "fullname":"Nguyễn Tiến Dũng",
//   "age":22,
//   "gender":"male"
// }
