/**
 * default error function
 * @param {*} msg
 * @param {*} status
 * @returns
 */
const error = (msg = "Something Went wrong", status = 500) => {
  const e = new Error(msg);
  e.status = status;

  return e;
};

export default error;
