const execSync = require("child_process").execSync;

const getNextVersion = () => {
  const buffer = execSync("pnpm view @ashew/turboviz dist-tags");

  const toString = buffer
    .toString()
    .replace("\n", "")
    .replaceAll("'", '"')
    .replace("next", '"next"')
    .replace("latest", '"latest"')
    .replace(" ", "");

  console.log(toString);
  const result = JSON.parse(toString);
  return result.next;
};

const incrementCanary = (versionString) => {
  const splitted = versionString.split(".");
  // There will be a third index if this is the
  const currentVersion = splitted[3];
  const nextTag = Number(currentVersion) + 1;
  // const nextCanary = splitted.slice(0, -1).concat(nextTag).join(".")

  return nextTag;
};

const main = () => {
  const npmNextVersion = getNextVersion();
  const nextCanaryTag = incrementCanary(npmNextVersion);
  console.log(nextCanaryTag);
};

main();
