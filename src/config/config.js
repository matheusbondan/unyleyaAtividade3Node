const connect_db =
process.env.MONGODB_URI;

const db_opt = {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 5,
  useNewUrlParser: true
};

module.exports = { connect_db, db_opt };
