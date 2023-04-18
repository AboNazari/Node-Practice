const eventLog = require("./eventLog");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg) => eventLog(msg));

// emit the event
setTimeout(() => {
  myEmitter.emit("log", "Log event Emitted!");
}, 2000);
