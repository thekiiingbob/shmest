const runShmestFile = require("../utils/runShmestFile.js");

test("dry run does not run actual tests", async () => {
  const result = await runShmestFile("dryRun.test.js", {
    SHMEST_DRY_RUN: true
  });

  expect(result.stdout).toContain("Dry Run - Not Running Tests");
  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✓ pass 2");
  expect(result.stderr).toContain("✓ pass 3");
  expect(result.stderr).toContain("✓ pass 4");
  expect(result.stderr).toContain("Test Suites: 1 passed, 1 total");
  expect(result.stderr).toContain("Tests:       4 passed, 4 total");
});
