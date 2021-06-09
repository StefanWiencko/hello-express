const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const middlewares = require("./middlewares");
const logs = require("./routes/logs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3333;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongo connected");
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.use("/", logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
