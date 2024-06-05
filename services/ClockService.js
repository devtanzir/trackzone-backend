import { Clocks } from "../models/ClocksModel.js";
import { findUserByProperty } from "./ModelService.js";
import { findEventService } from "./EventsService.js";

/**
 * clock service
 * @param {*} param0
 * @returns
 */
export const clockService = ({ title, timezone, offset }) => {
  let clock = new Clocks({ title, timezone, offset });
  // save in database
  return clock.save();
};

/**
 * delete clock and event service
 * @param {*} clockId
 * @returns
 */
export const deleteClockAndEventService = async (clockId) => {
  // find user service
  const clock = await findUserByProperty("_id", clockId);
  if (!clock) {
    throw error("Clock Not Found", 404);
  }
  // delete one clock
  await clock.deleteOne(clock);
  // delete related event
  const events = await findEventService(clockId);
  if (!events) {
    return;
  }

  // delete every clock
  events.forEach(async (item) => {
    await item.deleteOne(item);
  });
};
