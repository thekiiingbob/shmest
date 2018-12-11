const runDescribe = require("./runDescribe");
const runTest = require("./runTest");
const runHook = require("./runHook");
const runShmest = require("./runShmest");

function shmest() {
  this.externalReporter = { onTestResult: () => {} };

  this.addExternalReporter = async externalReporter => {
    this.externalReporter = externalReporter;
  };
  // this.addRunReporter = async runReporter => {
  //   if (process.env.SHMEST_DRY_RUN != "true") {
  //     console.log("Adding run reporter.");
  //     this.runReporter = runReporter;
  //     console.log("this.runReporter", this.runReporter);
  //   } else {
  //     console.log("Dry run - Not adding reporter.");
  //   }
  // };

  // this.registerRun = runId => {
  //   console.log("REGISTERING RUN WITH RUNID", runId);
  //   this.runId = runId;
  // };

  this.test = (args, testFn, opts = {}) => {
    return runTest(test, args, testFn, {
      externalReporter: this.externalReporter
    });
  };

  this.test.failing = (args, testFn, opts = {}) => {
    return runTest(test, args, testFn, {
      externalReporter: this.externalReporter,
      failing: true
    });
  };

  this.test.skip = (args, testFn, opts = {}) => {
    return runTest(test.skip, args, testFn, {
      externalReporter: this.externalReporter
    });
  };

  this.test.only = (args, testFn, opts = {}) => {
    return runTest(test.only, args, testFn, {
      externalReporter: this.externalReporter
    });
  };

  this.describe = (args, testFn, opts = {}) => {
    return runDescribe(describe, args, testFn);
  };

  this.describe.skip = (args, testFn, opts = {}) => {
    return runDescribe(describe.skip, args, testFn);
  };

  this.describe.only = (args, testFn, opts = {}) => {
    return runDescribe(describe.only, args, testFn);
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

  this.run = async () => {
    await runShmest();
  };
}

module.exports = shmest;
