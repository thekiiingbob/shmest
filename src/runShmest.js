const j = require("jest");

async function runShmest(opts) {
  if (process.env.SHMEST_DRY_RUN) {
    console.log("Dry Run - Not Running Tests");
  }

  // Remove first two entries is argv array
  process.argv.shift();
  process.argv.shift();

  await j.run(process.argv).catch(e => console.log("ERROR RUNNING TESTS: ", e));
}

module.exports = runShmest;
