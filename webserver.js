const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.send("hey dudue!");
});
app.listen(PORT, () => {
  console.log(`the server running on th ${PORT} number!`);
});
