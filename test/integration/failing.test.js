const runShmestFile = require("../utils/runShmestFile.js");

test("test marked .failing should pass when it fails", async () => {
  const result = await runShmestFile("failing.test.js");

  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✕ fail 2");
  expect(result.stderr).toContain("Test Suites: 1 failed, 1 total");
  expect(result.stderr).toContain("Tests:       1 failed, 1 passed, 2 total");
});
