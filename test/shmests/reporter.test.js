let myResult, myId;

shmest.addCaseReporter(async (result, id) => {
  console.log("CASE ID IS", id);
  myResult = result;
  myId = id;
});

shmest.describe("reporter", () => {
  shmest.test({ name: "pass 1", caseId: "foo" }, () => {
    expect(true).toBe(true);
  });

  // this test verifies the output of the previous ones
  shmest.test("result and id is correct", () => {
    expect(myResult.description).toBe("pass 1");
    expect(myResult.status).toBe("passed");
    expect(myId).toBe("foo");
  });
});
