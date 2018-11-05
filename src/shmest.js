const jest = require("jest");

function runHook(jestFn, testFn) {
  if (process.env.SHMEST_DRY_RUN === "true") {
    return jestFn(() => {});
  }
  return jestFn(testFn);
}

function shmest() {
  this._runTest = (jestFn, args, testFn) => {
    const name = typeof args === "string" ? args : args.name;
    if (process.env.SHMEST_DRY_RUN === "true") {
      return jestFn(name, () => {});
    }

    if (args.important === true) {
      console.log("Adding custom reporter to jasmine");
      // This seems horrible, each test that is marked important gets it's own reporter
      // Only if the test name matches the reporter it was registered to, will it skip.
      const reporter = require("./reporter.js");
      jasmine.getEnv().addReporter(reporter.init(args));
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

    await jest
      .run(process.argv)
      .catch(e => console.log("ERROR RUNNING TESTS: ", e));
  };
}

module.exports = shmest;
