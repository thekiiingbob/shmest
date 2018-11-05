require("../index.js");

let jTest, jDescribe;
beforeEach(() => {
  // store the original Jest functions to reset later
  jTest = test;
  jDescribe = describe;
  global.test = (name, testFn) => {
    const result = testFn();
    return { name, result };
  };

  global.test.skip = (name, testFn) => {
    return "skipped";
  };

  global.test.only = (name, testFn) => {
    return "only";
  };

  global.describe = (name, testFn) => {
    const result = testFn();
    return { name, result };
  };

  global.describe.skip = (name, testFn) => {
    return "skipped";
  };

  global.describe.only = (name, testFn) => {
    return "only";
  };
});

afterEach(() => {
  global.test = jTest;
  global.describe = jDescribe;
});

describe("shmest.test", () => {
  test("test can take string for test name", () => {
    const res = shmest.test("just a string", () => {
      return 12345;
    });

    expect(res.name).toBe("just a string");
    expect(res.result).toBe(12345);
  });

  test("can call test", () => {
    const res = shmest.test({ name: "my test" }, () => {
      return 12345;
    });

    expect(res.name).toBe("my test");
    expect(res.result).toBe(12345);
  });

  test("can call test.skip", () => {
    const res = shmest.test.skip({ name: "my test" }, () => {
      return 12345;
    });

    expect(res).toBe("skipped");
  });

  test("can call test.only", () => {
    const res = shmest.test.only({ name: "my test" }, () => {
      return 12345;
    });

    expect(res).toBe("only");
  });
});

describe("shmest.describe", () => {
  test("can call describe", () => {
    const res = shmest.describe({ name: "my test" }, () => {
      return 12345;
    });

    expect(res.name).toBe("my test");
    expect(res.result).toBe(12345);
  });

  test("can call describe.skip", () => {
    const res = shmest.describe.skip({ name: "my test" }, () => {
      return 12345;
    });

    expect(res).toBe("skipped");
  });

  test("can call describe.only", () => {
    const res = shmest.describe.only({ name: "my test" }, () => {
      return 12345;
    });

    expect(res).toBe("only");
  });

  test("describe will call nested tests", () => {
    const res = shmest.describe({ name: "my test" }, () => {
      return shmest.test({ name: "nested test" }, () => {
        return 12345;
      });
    });

    expect(res.result.name).toBe("nested test");
    expect(res.result.result).toBe(12345);
  });
});
