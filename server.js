const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const { connectToDatabase, updateSchema } = require('./app/db/dbUtils');
const app = express();
var corsOptions = {
  origin: "*",
};

const mainRouter = require('./router');
// parse requests of content-type - application/json
app.use(express.json());
app.use(helmet());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api', mainRouter);

connectToDatabase()
  .then(() => updateSchema())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
