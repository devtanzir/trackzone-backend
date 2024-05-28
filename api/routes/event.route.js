import { Router } from "express";
import {
  createEventController,
  deleteEventById,
  deleteEventsByClockId,
  getEventsByClockId,
  patchEventById,
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
 */
router.patch("/:eventId", patchEventById);
/**
 * Delete event by id
 * @method DELETE
 */
router.delete("/:eventId", deleteEventById);
/**
 * Delete all event by clock id
 * @method DELETE
 */
router.delete("/delete-all/:clockId", deleteEventsByClockId);

/**
 * Create clock
 * @method POST
 */
router.post("/:clockId", createEventController);

export default router;
