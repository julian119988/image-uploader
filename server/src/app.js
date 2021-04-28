const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const { normalize, resolve } = require("path");

app.use(cors());
app.use(fileUpload());
app.use(express.static(normalize(__dirname + "/public")));

app.get("/", (req, res) => {
  res.send("Hola mundo en index");
});
app.post("/upload", async (req, res) => {
  const file = req.files.file;
  const dir = normalize(`${__dirname}/public/uploads/${file.name}`);
  if (fs.existsSync(dir)) {
    res.send({
      filePath: `http://localhost:3001/uploads/${file.name}`,
      fileName: file.name,
    });
  } else {
    file.mv(dir);
    res.send({
      filePath: `http://localhost:3001/uploads/${file.name}`,
      fileName: file.name,
    });
  }
});

module.exports = app;
