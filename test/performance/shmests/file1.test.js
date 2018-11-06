shmest.describe("all passing", () => {
  shmest.test({ name: "pass 1", important: true, caseId: "1" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 2", important: true, caseId: "2" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 3", important: true, caseId: "3" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 4", important: true, caseId: "4" }, () => {
    expect(true).toBe(true);
  });
});
