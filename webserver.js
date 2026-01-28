const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const fs = require("fs");
const path = require("path");

app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
  //this is will work in get request
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
/* app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
}); */
/* app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
}); */

//trying redirecting
app.get("/old-page", (req, res) => {
  res.redirect(301, "new-page.html");
});
app.get(/^\/new-page(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get(
  "/regular expression from the picch and they need to find the ",
  (req, res) => {
    res.sendFile();
  },
);

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
