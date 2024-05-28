import { Clocks } from "../models/clocks.model.js";

export const clockService = ({ title, timezone, offset }) => {
  let clock = new Clocks({ title, timezone, offset });

  return clock.save();
};
