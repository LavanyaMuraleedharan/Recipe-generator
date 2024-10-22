const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");
const run = require("./geminiapi"); // Assuming you already have this

require("dotenv").config();

app.use(cors());
app.use(express.json()); // Allows parsing of JSON in request bodies

const port = 3000;

app.use("/api", router); // This mounts your routes at /api

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
