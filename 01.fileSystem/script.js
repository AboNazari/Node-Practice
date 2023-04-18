const path = require("path");

const fsPromise = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromise.readFile("./sample.txt", "utf8");
    console.log(data);
    await fsPromise.unlink(path.join("sample.txt"));
    await fsPromise.writeFile(path.join("newSample.txt"), data);
    await fsPromise.appendFile(
      path.join("newSample.txt"),
      "\n\nHow you doing?"
    );
    await fsPromise.rename(
      path.join("newSample.txt"),
      path.join("sample2.txt")
    );
    const newData = await fsPromise.readFile(path.join("sample2.txt"), "utf8");
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();
