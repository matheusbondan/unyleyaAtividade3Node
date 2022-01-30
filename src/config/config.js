const connect_db =
  "mongodb://localhost/atividade3Unyleya";
const db_opt = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true
};

module.exports = { connect_db, db_opt };
