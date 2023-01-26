const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./src/db/db");
var cors = require("cors");
const dotenv = require('dotenv');
const routes = require("./src/routes/routes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Connect to MongoDB
 */
db.connect();

app.listen(process.env.PORT);

routes.initializeRoutes(app);