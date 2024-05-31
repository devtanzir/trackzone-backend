import { findUserByProperty, findUsers } from "../services/Model.service.js";
import {
  clockService,
  deleteClockAndEventService,
} from "../services/clock.service.js";
import error from "../utils/error.js";

const createClockController = async (req, res, next) => {
  const { title, timezone, offset } = req.body;
  try {
    if (!title || !timezone) {
      return res.status(400).json({ message: "invalid data" });
    }
    const clock = await clockService({ title, timezone, offset });
    return res
      .status(201)
      .json({ message: "Clock Created Successfully", clock });
  } catch (e) {
    next(e);
  }
};

const patchClockById = async (req, res, next) => {
  const { clockId } = req.params;

  const { title, timezone, offset } = req.body;

  try {
    const clock = await findUserByProperty("_id", clockId);

    if (!clock) {
      throw error("clock not found", 404);
    }

    clock.title = title ?? clock.title;

    clock.timezone = timezone ?? clock.timezone;

    clock.offset = offset ?? clock.offset;

    await clock.save();

    res.status(200).json(clock);
  } catch (e) {
    next(e);
  }
};

const deleteClockById = async (req, res, next) => {
  const { clockId } = req.params;

  try {
    await deleteClockAndEventService(clockId);
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
const getClocks = async (_req, res, next) => {
  try {
    const clocks = await findUsers();
    return res.status(200).json(clocks);
  } catch (e) {
    next(e);
  }
};

export { createClockController, patchClockById, deleteClockById, getClocks };
