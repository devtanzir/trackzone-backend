import { Clocks } from "../models/clocks.model.js";

const findUsers = () => {
  return Clocks.find();
};
const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return Clocks.findById(value);
  }
  return Clocks.findOne({ [key]: value });
};
export { findUsers, findUserByProperty };
