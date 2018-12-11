let myResults, myArgs;

shmest.addExternalReporter({
  onTestResult: (results, args) => {
    console.log("CASE ID IS", args.caseId);
    myResults = results;
    myArgs = args;
  }
});

shmest.describe("reporter", () => {
  shmest.test({ name: "pass 1", caseId: "foo" }, () => {
    expect(true).toBe(true);
  });

  // this test verifies the output of the previous ones
  shmest.test("result and id is correct", () => {
    expect(myResults.passed).toBe(true);
    expect(myArgs.caseId).toBe("foo");
    expect(myArgs.name).toBe("pass 1");
  });
});
