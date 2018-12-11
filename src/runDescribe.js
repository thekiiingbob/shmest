function runDescribe(jestFn, args, testFn) {
  // Run the jestFn with an empty test if we are doing a dry run
  const name = typeof args === "string" ? args : args.name;
  return jestFn(name, testFn);
}

module.exports = runDescribe;
