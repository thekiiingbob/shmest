const execa = require("execa");

async function runShmestFile(filePath) {
  return await execa(
    "./bin/shmest.js",
    [
      filePath,
      "--setupTestFrameworkScriptFile=./test/integration/shmests/setup/jestSetup.js"
    ],
    { reject: false }
  );
}

test("all passing", async () => {
  const result = await runShmestFile("./shmests/allPassing.test.js");

  expect(result.stderr).toContain("✓ pass 1");
  expect(result.stderr).toContain("✓ pass 2");
  expect(result.stderr).toContain("✓ pass 3");
  expect(result.stderr).toContain("✓ pass 4");
  expect(result.stderr).toContain("Test Suites: 1 passed, 1 total");
  expect(result.stderr).toContain("Tests:       4 passed, 4 total");
});

test("all failing", async () => {
  const result = await runShmestFile("./shmests/allFailing.test.js");

  expect(result.stderr).toContain("✕ fail 1");
  expect(result.stderr).toContain("✕ fail 2");
  expect(result.stderr).toContain("✕ fail 3");
  expect(result.stderr).toContain("✕ fail 4");
  expect(result.stderr).toContain("Test Suites: 1 failed, 1 total");
  expect(result.stderr).toContain("Tests:       4 failed, 4 total");
});

test("run tests in a folder", async () => {
  const result = await runShmestFile("./shmests/exampleFolder");

  expect(result.stderr).toContain("file 1 in folder");
  expect(result.stderr).toContain("✓ test 1");
  expect(result.stderr).toContain("file 2 in folder");
  expect(result.stderr).toContain("✓ test 2");
  expect(result.stderr).toContain("Test Suites: 2 passed, 2 total");
  expect(result.stderr).toContain("Tests:       2 passed, 2 total");
});
