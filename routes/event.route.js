import { Router } from "express";
import {
  createEventController,
  deleteEventById,
  deleteEventsByClockId,
  getEventsByClockId,
  patchEventById,
  getEvents,
} from "../controller/event.controller.js";

const router = Router();

/**
 * @route /api/v1/event/:clockId
 * @method GET
 */

router.get("/:clockId", getEventsByClockId);

/**
 * Update event by id
 * @method PATCH
 * @route /api/v1/event/:eventId
 */
router.patch("/:eventId", patchEventById);
/**
 * Delete event by id
 * @method DELETE
 * @route /api/v1/event/:eventId
 */
router.delete("/:eventId", deleteEventById);
/**
 * Delete all event by clock id
 * @method DELETE
 * @route /api/v1/event/delete-all/:clockId
 */
router.delete("/delete-all/:clockId", deleteEventsByClockId);

/**
 * Create clock
 * @method POST
 * @route /api/v1/event/:clockId
 */
router.post("/:clockId", createEventController);

/**
 * @route /api/v1/event/
 * @method GET
 */

router.get("/", getEvents);

export default router;
