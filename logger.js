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

    logEvent(message, "logreport.txt");
  });

  next();
};

const errHandler = (err, req, res, next) => {
  const message = ` \n Req_Method:${req.method}\t Req_Url:${req.url}\n Error name: ${err.name} \n Error message: ${err.message} \n Error stack: ${err.stack} \n ______________________________________________________________________________________\n`;
  console.log(message);
  res.status(500).send(err.message);
  logEvent(message, "errorLog.txt");
};

const logEvent = async (message, filename) => {
  try {
    const timeStamp = format(new Date(), "yyyy/MM/dd\tHH:mm:ss");
    const logDir = path.join(__dirname, "log");
    const logFile = path.join(logDir, filename);

    // Ensure directory exists
    await fs.promises.mkdir(logDir, { recursive: true });

    // Write log
    await fs.promises.appendFile(logFile, `${timeStamp}\t${message}\n`);
  } catch (err) {
    console.error("Logging failed:", err);
  }
};

module.exports = logEvent;

module.exports = { logger, logEvent, errHandler };
