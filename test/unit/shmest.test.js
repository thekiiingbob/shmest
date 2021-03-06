const shmestModule = require("../../src/shmest.js");
let shmest;
let jTest, jDescribe;

beforeEach(() => {
  shmest = new shmestModule();

  // store the original Jest functions to reset later
  jTest = test;
  jDescribe = describe;

  global.test = async (name, testFn) => {
    const result = await testFn();
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

describe("shmest.addCaseReporter", () => {
  test("can add case reporter to shmest", () => {
    shmest.addCaseReporter(() => {
      return "foo";
    });

    expect(typeof shmest.caseReporter).toBe("function");
    expect(shmest.caseReporter()).toBe("foo");
  });
});

describe("shmest.test", () => {
  test("test can take string for test name", () => {
    const res = shmest.test("just a string", () => {
      return 12345;
    });

    expect(res.name).toBe("just a string");
    expect(res.result).toBe(12345);
  });

  test.only("can call test", async () => {
    const res = await shmest.test({ name: "my test" }, async () => {
      return 12345;
    });

    console.log("RES", res);

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
});
