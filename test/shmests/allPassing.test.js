shmest.describe("all passing", () => {
  shmest.test({ name: "pass 1" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 2" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 3" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 4" }, () => {
    expect(true).toBe(true);
  });
});
