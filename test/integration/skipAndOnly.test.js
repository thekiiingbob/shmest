const runShmestFile = require("../utils/runShmestFile.js");

test("can test.skip a single test", async () => {
  const result = await runShmestFile("singleSkipped.test.js");

  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✓ pass 3");
  expect(result.stderr).toContain("○ skipped 1 test");
  expect(result.stderr).toContain("Test Suites: 1 passed, 1 total");
  expect(result.stderr).toContain("Tests:       1 skipped, 2 passed, 3 total");
});

test("can test.only a single test", async () => {
  const result = await runShmestFile("singleOnly.test.js");

  expect(result.stderr).toContain("✓ pass 2");
  expect(result.stderr).toContain("○ skipped 2 tests");
  expect(result.stderr).toContain("Test Suites: 1 passed, 1 total");
  expect(result.stderr).toContain("Tests:       2 skipped, 1 passed, 3 total");
});
