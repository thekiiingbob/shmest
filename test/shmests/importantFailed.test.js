shmest.describe("important", () => {
  shmest.test({ name: "pass 1" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "important 2", important: true }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "pass 3" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "fail 4" }, () => {
    expect(true).toBe(false);
  });
});
