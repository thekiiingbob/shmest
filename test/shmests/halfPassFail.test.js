shmest.describe("half pass fail", () => {
  shmest.test({ name: "pass 1" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "pass 2" }, () => {
    expect(true).toBe(true);
  });

  shmest.test({ name: "fail 3" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "fail 4" }, () => {
    expect(true).toBe(false);
  });
});
