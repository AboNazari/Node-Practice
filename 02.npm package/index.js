const { format } = require("date-fns");
const { v4 } = require("uuid");

const date = format(new Date(), "yyyy:MM:dd \t HH:MM:SS");
console.log(date);

console.log("HELLO WORLD!!!");
console.log(v4());
