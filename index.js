const shmestModule = require("./src/shmest.js");

// console.log("SHMEST MOD", shmestModule);

const shmest = new shmestModule();

// console.log("shmest", shmest);

global.shmest = shmest;
