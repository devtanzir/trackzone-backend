import mongoose from "mongoose";
/**
 * mongoDB connect function
 * @param {*} connectionStr
 * @returns
 */
export function connectDb(connectionStr) {
  return mongoose.connect(connectionStr);
}
