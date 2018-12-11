shmest.describe(".failing test", () => {
  shmest.test.failing({ name: "pass 1" }, () => {
    expect(true).toBe(false);
  });

  shmest.test.failing({ name: "fail 2", notes: "bug-123" }, () => {
    expect(true).toBe(true);
  });
});
