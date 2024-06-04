import { Events } from "../models/events.model.js";
import { findUserByProperty } from "./Model.service.js";
/**
 * event service
 * @param {*} param0
 * @returns save data in database
 */
export const eventService = ({ title, des, startDate, endDate, clockId }) => {
  let event = new Events({ title, des, startDate, endDate, clockId });
  // save in database
  return event.save();
};
/**
 * find clock service
 * @param {String} clockId
 * @returns find clock
 */
export const findClockService = (clockId) => {
  return findUserByProperty("_id", clockId);
};
/**
 * find event service
 * @param {*} clockId
 * @returns find all data by clock id
 */
export const findEventService = (clockId) => {
  // find all data from data base
  return Events.find({ clockId });
};
/**
 * find event service
 * @param {*} key
 * @param {*} value
 * @returns find single data
 */
export const findEventsByProperty = (key, value) => {
  if (key === "_id") {
    // find all data by id from database
    return Events.findById(value);
  }
  // find single data from database
  return Events.findOne({ [key]: value });
};
/**
 * find all event
 * @returns get all data
 */
export const findEvents = () => {
  // get all data from database
  return Events.find();
};
