const express = require("express");
const CORS = require("cors");

const allowedOrigins = ["http://localhost:3000", "http://example.com"];

const enableCors = () => {
  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });
};
