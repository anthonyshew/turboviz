const json = require("../.changeset/pre.json");

const main = () => {
  if (json.mode !== "pre") {
    throw new Error("You're not in prerelease mode!");
  }
};

main();
