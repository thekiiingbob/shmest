shmest.describe("important previous", () => {
  shmest.test({ name: "fail 1" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "important 2", important: true }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "fail 3" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "pass 4" }, () => {
    expect(true).toBe(true);
  });
});
