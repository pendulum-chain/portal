const fs = require("fs");

const theFile = __dirname + "/src/components/Layout/index.tsx";

fs.readFile(theFile, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(/COMMIT_HASH/g, process.env.COMMIT_REF);

  fs.writeFile(theFile, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});
