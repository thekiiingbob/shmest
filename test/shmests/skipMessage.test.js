let myResult, myOpts;

shmest.addCaseReporter(async (result, opts) => {
  console.log("RESULT", result);
  console.log("CASE ID IS", opts.id);
  myResult = result;
  myOpts = opts;
});

shmest.describe("reporter", () => {
  shmest.test.skip(
    { name: "pass 1", caseId: "foo", notes: "This is my note" },
    () => {
      expect(true).toBe(true);
    }
  );

  // this test verifies the output of the previous ones
  shmest.test("result and id is correct", () => {
    expect(myResult.description).toBe("pass 1");
    expect(myResult.status).toBe("pending");
    expect(myOpts.caseId).toBe("foo");
    expect(myOpts.name).toBe("pass 1");
    expect(myOpts.notes).toBe("This is my note");
  });
});
