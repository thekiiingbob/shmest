shmest.describe("all failing", () => {
  shmest.test({ name: "fail 1" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "fail 2" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "fail 3" }, () => {
    expect(true).toBe(false);
  });

  shmest.test({ name: "fail 4" }, () => {
    expect(true).toBe(false);
  });
});
