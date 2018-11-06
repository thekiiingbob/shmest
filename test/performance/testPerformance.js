const execa = require("execa");

async function run() {
  console.log("Starting jest test...");
  const preTime = Date.now();
  await execa("jest", ["test/performance/tests"]);
  const postTime = Date.now();
  const jestTotalTime = postTime - preTime;
  // console.log("Jest - Total Elapsed Time:", jestTotalTime);

  console.log("Starting shmest test...");
  const shmestPreTime = Date.now();
  await execa("./bin/shmest.js", [
    `../performance/shmests`,
    "--setupTestFrameworkScriptFile=./test/shmests/setup/jestSetupPerformance.js"
  ]);
  const shmestPostTime = Date.now();
  const shmestTotalTime = shmestPostTime - shmestPreTime;
  // console.log("Shmest - Total Elapsed Time:", shmestTotalTime);

  // const difference = shmestTotalTime - jestTotalTime;
  // console.log("Difference:", difference);

  return { jestTotalTime, shmestTotalTime };
}

async function execute() {
  const results = [];

  console.log("Running tests 5 times...");
  results.push(await run());
  results.push(await run());
  results.push(await run());
  results.push(await run());
  results.push(await run());

  const data = await Promise.all(results);

  console.log("Results", data);
}

execute();
