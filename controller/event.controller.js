import {
  eventService,
  findClockService,
  findEventService,
  findEvents,
  findEventsByProperty,
} from "../services/EventsService.js";
import error from "../utils/error.js";

/**
 * Create Event
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const createEventController = async (req, res, next) => {
  // get clock id from req params
  const { clockId } = req.params;
  // get data from req body
  const { title, des, startDate, endDate } = req.body;
  try {
    if (!title || !des || !startDate || !endDate || !clockId) {
      return res.status(400).json({ message: "invalid data" });
    }
    // find clock service
    const clockExist = await findClockService(clockId);
    if (!clockExist) {
      return res.status(404).json({ message: "Invalid Clock Id" });
    }
    const event = await eventService({
      title,
      des,
      startDate,
      endDate,
      clockId,
    });
    return res
      .status(201)
      .json({ message: "Event Created Successfully", event });
  } catch (e) {
    next(e);
  }
};

/**
 * get events by clock id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const getEventsByClockId = async (req, res, next) => {
  try {
    // get clock id from req params
    const { clockId } = req.params;
    // find event service
    const events = await findEventService(clockId);
    if (events.length == 0) {
      return res.status(404).json({ message: "There Is No Event" });
    }
    return res.status(200).json(events);
  } catch (e) {
    next(e);
  }
};
/**
 * Update event by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const patchEventById = async (req, res, next) => {
  // get event id from req params
  const { eventId } = req.params;

  const { title, des, startDate, endDate } = req.body;

  try {
    // find event service
    const event = await findEventsByProperty("_id", eventId);

    if (!event) {
      throw error("event not found", 404);
    }

    event.title = title ?? event.title;
    event.des = des ?? event.des;
    event.startDate = startDate ?? event.startDate;
    event.endDate = endDate ?? event.endDate;

    await event.save();

    res.status(200).json(event);
  } catch (e) {
    next(e);
  }
};
/**
 * delete event by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const deleteEventById = async (req, res, next) => {
  // get event id from req params
  const { eventId } = req.params;

  try {
    const event = await findEventsByProperty("_id", eventId);
    if (!event) {
      throw error("event Not Found", 404);
    }
    await event.deleteOne(event);
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
/**
 * delete events by clock id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const deleteEventsByClockId = async (req, res, next) => {
  // get clock id from req params
  const { clockId } = req.params;

  try {
    const events = await findEventService(clockId);
    if (!events) {
      throw error("events Not Found", 404);
    }
    events.forEach(async (item) => {
      await item.deleteOne(item);
    });
    return res.status(203).send();
  } catch (e) {
    next(e);
  }
};
/**
 * get events
 * @param {*} _req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const getEvents = async (_req, res, next) => {
  try {
    // find events service
    const events = await findEvents();
    return res.status(200).json(events);
  } catch (e) {
    next(e);
  }
};
export {
  createEventController,
  getEventsByClockId,
  patchEventById,
  deleteEventById,
  deleteEventsByClockId,
  getEvents,
};
