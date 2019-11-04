const dbPool = require("../config/database/database")();

const dbQuery = (sql, valueList) => {
  return new Promise((resolve, reject) => {
    dbPool.query(sql, valueList, (err, result, fields) => {
      console.log(sql, valueList);

      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = dbQuery;