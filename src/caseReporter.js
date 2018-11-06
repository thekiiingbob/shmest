// const sendResult = require("./sendResult.js");

export function init(opts, sendResult) {
  return {
    async specDone(result) {
      if (opts.caseId && opts.name === result.description) {
        sendResult(result, opts.caseId, opts).then(() => {
          console.log("DONE WITH RESULT");
        });
      }
    }
  };
}
