const json = require("../.changeset/pre.json");

const main = () => {
  if (json.mode !== "exit") {
    throw new Error("You're not in release mode!");
  }
};

main();
