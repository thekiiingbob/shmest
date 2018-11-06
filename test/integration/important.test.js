const runShmestFile = require("../utils/runShmestFile.js");

test("important attribute will skip additional tests if fail", async () => {
  const result = await runShmestFile("importantFailed.test.js");

  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✕ important 2");
  expect(result.stderr).toContain("○ skipped 2 tests");
  expect(result.stderr).toContain("Test Suites: 1 failed, 1 total");
  expect(result.stderr).toContain(
    "Tests:       1 failed, 2 skipped, 1 passed, 4 total"
  );
});

test("important attribute will not skip additional tests if pass", async () => {
  const result = await runShmestFile("importantPassed.test.js");

  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✓ important 2");
  expect(result.stderr).toContain("✕ fail 3");
  expect(result.stderr).toContain("✓ pass 4");
  expect(result.stderr).toContain("Test Suites: 1 failed, 1 total");
  expect(result.stderr).toContain("Tests:       1 failed, 3 passed, 4 total");
});

test("important attribute will not trigger for previously failed test", async () => {
  const result = await runShmestFile("importantPrevious.test.js");

  expect(result.stderr).toContain("✕ fail 1");
  expect(result.stderr).toContain("✓ important 2");
  expect(result.stderr).toContain("✕ fail 3");
  expect(result.stderr).toContain("✓ pass 4");
  expect(result.stderr).toContain("Test Suites: 1 failed, 1 total");
  expect(result.stderr).toContain("Tests:       2 failed, 2 passed, 4 total");
});
