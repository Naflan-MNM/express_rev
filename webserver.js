const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const fs = require("fs");
const path = require("path");
const { logger } = require("./logger");

/* lets deel with middlewares */
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(logger);

/* handles routes */

app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
  //this is will work in get request
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
//trying redirecting and here url only redirect not content if you want to parse the related file of the new page you need to get seperately for that url
app.get("/old-page", (req, res) => {
  res.redirect(301, "new-page.html");
});
app.get(/^\/new-page(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

//chaining array
app.get(
  "/hello",
  (req, res, next) => {
    console.log("loading");
    next();
  },
  (req, res) => {
    res.send("uploaded successfully!");
  },
);

//handling 404 routes
app.get("/*path", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`the server running on th ${PORT} number!`);
});
