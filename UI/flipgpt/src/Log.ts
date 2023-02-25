/**
 * Console log with space unless specified
 */
const log = (msg: any, space: boolean = true) => {
  console.log(JSON.stringify(msg, null, 2));
  if (space) console.log();
};

const Log = {
  log,
};

export default Log;
