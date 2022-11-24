const express = require("express");
const open = require("open");
const path = require("path");

import webpack from "webpack";
import config from "../webpack.config";

const port = 3000;
const app = express();

const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open("http://localhost:" + port);
  }
});
