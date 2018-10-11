const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const words = require("./routes/api/words");
const tweets = require("./routes/api/tweets");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected, yo!"))
  .catch(err => console.log("error, dude!"));

// Use Routes
// app.use('/api/items', items)
app.use("/api/words", words);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
