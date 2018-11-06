shmest.describe("single skipped", () => {
  shmest.test({ name: "pass 1" }, () => {
    expect(true).toBe(true);
  });

  shmest.test.skip({ name: "skip 2" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 3" }, () => {
    expect(true).toBe(true);
  });
});
