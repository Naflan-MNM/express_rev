const path = require("path");
const fs = require("fs");
const { format } = require("date-fns");

const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const method = req.method;
    const requestedUrl = req.url;
    const statusCode = res.statusCode;
    const statusMessage = res.statusMessage;
    const responsTime = Date.now() - start;
    const message = `${method} \t ${requestedUrl} \t ${statusCode} \t ${statusMessage} \t ${responsTime}ms`;

    logEvent(message);
  });

  next();
};

const logEvent = async (message) => {
  try {
    const timeStamp = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
    const logDir = path.join(__dirname, "log");
    const logFile = path.join(logDir, "logreport.txt");

    // Ensure directory exists
    await fs.promises.mkdir(logDir, { recursive: true });

    // Write log
    await fs.promises.appendFile(logFile, `${timeStamp}\t${message}\n`);
  } catch (err) {
    console.error("Logging failed:", err);
  }
};

module.exports = logEvent;

module.exports = { logger, logEvent };
