const runShmestFile = require("../utils/runShmestFile.js");

test("results sent to reporter when caseId present", async () => {
  const result = await runShmestFile("reporter.test.js");

  expect(result.stdout).toContain("CASE ID IS foo");
  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✓ result and id is correct");
  expect(result.stderr).toContain("Test Suites: 1 passed, 1 total");
  expect(result.stderr).toContain("Tests:       2 passed, 2 total");
});
