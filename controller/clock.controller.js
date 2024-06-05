import { findUserByProperty, findUsers } from "../services/ModelService.js";
import {
  clockService,
  deleteClockAndEventService,
} from "../services/ClockService.js";
import error from "../utils/error.js";

/**
 * create clock controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const createClockController = async (req, res, next) => {
  // get the data from req body
  const { title, timezone, offset } = req.body;
  try {
    if (!title || !timezone) {
      return res.status(400).json({ message: "invalid data" });
    }
    // clock service
    const clock = await clockService({ title, timezone, offset });
    return res
      .status(201)
      .json({ message: "Clock Created Successfully", clock });
  } catch (e) {
    next(e);
  }
};

/**
 * Update Clock by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchClockById = async (req, res, next) => {
  // get clock id from req params
  const { clockId } = req.params;

  const { title, timezone, offset } = req.body;

  try {
    // find user service
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
/**
 * Delete Clock by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const deleteClockById = async (req, res, next) => {
  const { clockId } = req.params;

  try {
    // delete clock service
    await deleteClockAndEventService(clockId);
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
/**
 * get all clocks
 * @param {*} _req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const getClocks = async (_req, res, next) => {
  try {
    const clocks = await findUsers();
    return res.status(200).json(clocks);
  } catch (e) {
    next(e);
  }
};

export { createClockController, patchClockById, deleteClockById, getClocks };
