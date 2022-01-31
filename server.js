const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRoute = require("./src/Routes/index");
const indexShort = require("./src/Routes/short");
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const { connect_db, db_opt } = require("./src/config/config");
const cors = require("cors");
const app = express();

const spec = YAML.load("./swagger.yml")



mongoose.connect(connect_db, db_opt);
mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", err => {
  console.log("Connection with data base error !" + err);
});

mongoose.connection.on("disconnecte", () => {
  console.log("Connection with data base lost!");
});

mongoose.connection.on("connected", () => {
  console.log("Connected with data base!");
});
app.use(cors());
app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(spec))

app.use("/", indexRoute);
app.use("/short", indexShort);

app.listen(5000);

module.exports = app;
