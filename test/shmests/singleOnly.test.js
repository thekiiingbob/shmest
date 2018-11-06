shmest.describe("single skipped", () => {
  shmest.test({ name: "skip 1" }, () => {
    expect(true).toBe(true);
  });

  shmest.test.only({ name: "pass 2" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "skip 3" }, () => {
    expect(true).toBe(true);
  });
});
