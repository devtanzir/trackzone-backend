import {
  eventService,
  findClockService,
  findEventService,
  findEventsByProperty,
} from "../services/events.service.js";
import error from "../utils/error.js";

const createEventController = async (req, res, next) => {
  const { clockId } = req.params;
  const { title, des, startDate, endDate } = req.body;
  try {
    if (!title || !des || !startDate || !endDate || !clockId) {
      return res.status(400).json({ message: "invalid data" });
    }
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

const getEventsByClockId = async (req, res, next) => {
  try {
    const { clockId } = req.params;
    const events = await findEventService(clockId);
    if (events.length == 0) {
      return res.status(404).json({ message: "There Is No Event" });
    }
    return res.status(200).json(events);
  } catch (e) {
    next(e);
  }
};
const patchEventById = async (req, res, next) => {
  const { eventId } = req.params;

  const { title, des, startDate, endDate } = req.body;

  try {
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
const deleteEventById = async (req, res, next) => {
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
const deleteEventsByClockId = async (req, res, next) => {
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
export {
  createEventController,
  getEventsByClockId,
  patchEventById,
  deleteEventById,
  deleteEventsByClockId,
};
