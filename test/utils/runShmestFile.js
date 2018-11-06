const execa = require("execa");

async function runShmestFile(fileName, env = {}) {
  return await execa(
    "./bin/shmest.js",
    [
      // "--config=test/integration/shmests/setup/jestConfig.json",
      `../shmests/${fileName}`,
      "--setupTestFrameworkScriptFile=./test/shmests/setup/jestSetup.js",
      "--verbose"
    ],
    { reject: false, env: env }
  ).catch(e => {
    console.log("Error with execa", e);
  });
}

module.exports = runShmestFile;
