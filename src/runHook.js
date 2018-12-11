function runHook(jestFn, testFn) {
  // Run the jestFn with an empty test if we are doing a dry run
  if (process.env.SHMEST_DRY_RUN === "true") {
    return jestFn(() => {});
  }

  return jestFn(testFn);
}

module.exports = runHook;
