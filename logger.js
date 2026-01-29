const path = require("path");
const fs = require("fs");
const fsPromises = fs.promises;
const express = require("express");
const { format } = require("date-fns");

const app = express();

const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const method = req.method;
    const requestedUrl = req.url;
    const statusCode = res.statusCode;
    const statusMessage = res.statusMessage;
    const responsTime = Date.now() - start;
  });

  next();
};

module.exports = logger;
