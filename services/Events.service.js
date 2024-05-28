import { Events } from "../models/events.model.js";
import { findUserByProperty } from "./Model.service.js";

export const eventService = ({ title, des, startDate, endDate, clockId }) => {
  let event = new Events({ title, des, startDate, endDate, clockId });

  return event.save();
};

export const findClockService = (clockId) => {
  return findUserByProperty("_id", clockId);
};

export const findEventService = (clockId) => {
  return Events.find({ clockId });
};
export const findEventsByProperty = (key, value) => {
  if (key === "_id") {
    return Events.findById(value);
  }
  return Events.findOne({ [key]: value });
};
// export const deleteAllUser
