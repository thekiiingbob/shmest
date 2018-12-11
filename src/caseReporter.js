// const sendResult = require("./sendResult.js");

function init(opts, sendResultFn) {
  return {
    async specDone(result) {
      if (opts.caseId && opts.name === result.description) {
        await sendResultFn(result, opts);
      }
    }
  };
}

module.exports = { init };
