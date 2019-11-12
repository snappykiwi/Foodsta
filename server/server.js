//Database Models:

require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3002;

const db = require("./models");

// Connect to the Mongo DB
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO: Serve build file

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client','build','index.html'));
// });

app.use("/api", require("./routes/apiRoutes"));

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});