import { Clocks } from "../models/clocks.model.js";
import { findUserByProperty } from "./Model.service.js";
import { findEventService } from "./events.service.js";

export const clockService = ({ title, timezone, offset }) => {
  let clock = new Clocks({ title, timezone, offset });

  return clock.save();
};

export const deleteClockAndEventService = async (clockId) => {
  const clock = await findUserByProperty("_id", clockId);
  if (!clock) {
    throw error("Clock Not Found", 404);
  }
  await clock.deleteOne(clock);
  // delete related event
  const events = await findEventService(clockId);
  if (!events) {
    return;
  }
  events.forEach(async (item) => {
    await item.deleteOne(item);
  });
};
