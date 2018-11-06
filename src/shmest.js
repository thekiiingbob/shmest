const jest = require("jest");

function runHook(jestFn, testFn) {
  // Run the jestFn with an empty test if we are doing a dry run
  if (process.env.SHMEST_DRY_RUN === "true") {
    return jestFn(() => {});
  }

  return jestFn(testFn);
}

function shmest() {
  this.addCaseReporter = caseReporterFn => {
    this.caseReporter = caseReporterFn;
  };

  this._runTest = (jestFn, args, testFn) => {
    const name = typeof args === "string" ? args : args.name;

    // Run the jestFn with an empty test if we are doing a dry run
    if (process.env.SHMEST_DRY_RUN === "true") {
      return jestFn(name, () => {});
    }

    // if we have a caseId, we know we want to write to an external reporter
    if (args.caseId) {
      console.log("Adding reporter to send results to test rail");
      const caseReporter = require("./caseReporter.js");
      jasmine.getEnv().addReporter(caseReporter.init(args, this.caseReporter));
    }

    // if a test is marked as important, we will make the following tests after pending
    if (args.important === true) {
      console.log("Adding custom reporter to jasmine");
      // This seems horrible, each test that is marked important gets it's own reporter
      // Only if the test name matches the reporter it was registered to, will it skip.
      const importantReporter = require("./importantReporter.js");
      jasmine.getEnv().addReporter(importantReporter.init(args));
    }

    return jestFn(name, testFn);
  };

  this.test = (args, testFn, opts = {}) => {
    return this._runTest(test, args, testFn);
  };

  this.test.skip = (args, testFn, opts = {}) => {
    return this._runTest(test.skip, args, testFn);
  };

  this.test.only = (args, testFn, opts = {}) => {
    return this._runTest(test.only, args, testFn);
  };

  this.describe = (args, testFn, opts = {}) => {
    const name = typeof args === "string" ? args : args.name;
    return describe(name, testFn);
  };

  this.describe.skip = (args, testFn, opts = {}) => {
    const name = typeof args === "string" ? args : args.name;
    return describe.skip(name, testFn);
  };

  this.describe.only = (args, testFn, opts = {}) => {
    const name = typeof args === "string" ? args : args.name;
    return describe.only(name, testFn);
  };

  this.beforeEach = (testFn, opts = {}) => {
    return runHook(beforeEach, testFn);
  };

  this.beforeAll = (testFn, opts = {}) => {
    return runHook(beforeAll, testFn);
  };

  this.afterEach = (testFn, opts = {}) => {
    return runHook(afterEach, testFn);
  };

  this.afterAll = (testFn, opts = {}) => {
    return runHook(afterAll, testFn);
  };

  this.run = async argv => {
    if (process.env.SHMEST_DRY_RUN) {
      console.log("Dry Run - Not Running Tests");
    }

    console.log("ARGV:", process.argv);
    await jest
      .run(process.argv)
      .catch(e => console.log("ERROR RUNNING TESTS: ", e));
  };
}

module.exports = shmest;
