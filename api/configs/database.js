const mongoose = require("mongoose");

const server = process.env.SERVER;
const database = process.env.DATABASE;

function connect() {
  mongoose
    .connect(`mongodb://${server}/${database}`)
    .then(() => {
      console.log("Connect database success");
    })
    .catch(() => {
      console.log("Fail to connect database");
    });
}

module.exports = {
  connect,
};
