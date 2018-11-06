shmest.describe("dry run", () => {
  shmest.test({ name: "pass 1", important: true }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "pass 2" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "pass 3" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "pass 4" }, () => {
    expect(true).toBe(false);
  });
});
