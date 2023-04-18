const { v4 } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const eventLog = async (msg) => {
  const date = format(new Date(), "yyyy:MM:dd\tHH:MM:ss");
  const logItem = `${date}\t${v4()}\t${msg}\n`;
  console.log(logItem);

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fs.promises.mkdir(path.join(__dirname, "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "logs", "eventLog.txt"),
      logItem
    );
    if (fs.existsSync(path.join(__dirname, "logs", "eventLog.json")))
      await fsPromises.unlink(path.join(__dirname, "logs", "eventLog.json"));
  } catch (err) {
    console.error(err);
  }
};

module.exports = eventLog;
