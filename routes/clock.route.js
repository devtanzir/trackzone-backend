import { Router } from "express";
import {
  createClockController,
  deleteClockById,
  getClocks,
  patchClockById,
} from "../controller/clock.controller.js";

const router = Router();

/**
 * Update clock by id
 * @method PATCH
 */
router.patch("/:clockId", patchClockById);

/**
 * Delete clock by id
 * @method DELETE
 */
router.delete("/:clockId", deleteClockById);

/**
 * @route
 * @method GET
 * @visibility public
 */

router.get("/", getClocks);

/**
 * Create clock
 * @method POST
 */
router.post("/clock-create", createClockController);

export default router;
