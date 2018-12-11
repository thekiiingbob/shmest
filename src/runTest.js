async function shouldReport(reportFunction) {
  if (process.env.SHMEST_REPORT_EXTERNAL === "true") {
    await reportFunction();
  }
}
function runTest(jestFn, args, testFn, opts) {
  const name = typeof args === "string" ? args : args.name;

  // Run the jestFn with an empty test if we are doing a dry run
  if (process.env.SHMEST_DRY_RUN === "true") {
    return jestFn(name, () => {});
  }

  // if a test is marked as important, we will make the following tests after pending
  if (args.important === true) {
    // This seems horrible, each test that is marked important gets it's own reporter
    // Only if the test name matches the reporter it was registered to, will it skip.
    const importantReporter = require("./importantReporter.js");
    jasmine.getEnv().addReporter(importantReporter.init(args));
  }

  const finalName = args.skipMessage ? args.skipMessage : name;
  return jestFn(finalName, async () => {
    let testPassed = false;
    try {
      await testFn();
      if (opts.failing) {
        const errorMsg = `Test "${name}" passed, but was expected to fail.\nNotes:\n`;
        await opts.externalReporter.onTestResult(
          { passed: false, errorMsg: errorMsg },
          args
        );
        testPassed = true;
        throw new Error(errorMsg);
      } else {
        await opts.externalReporter.onTestResult({ passed: true }, args);
      }
    } catch (error) {
      if (opts.failing && testPassed === false) {
        await opts.externalReporter.onTestResult({ passed: true }, args);
        return undefined;
      } else {
        await opts.externalReporter.onTestResult(
          { passed: false, errorMsg: error.toString() },
          args
        );
        throw error;
      }
    }
  });
}

module.exports = runTest;
