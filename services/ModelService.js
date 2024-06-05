import { Clocks } from "../models/ClocksModel.js";
/**
 * get user service
 * @returns get all user from database
 */
const findUsers = () => {
  return Clocks.find();
};
const findUserByProperty = (key, value) => {
  if (key === "_id") {
    // find single data by id
    return Clocks.findById(value);
  }
  // find single data by property
  return Clocks.findOne({ [key]: value });
};
export { findUsers, findUserByProperty };
