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
 * @route /api/v1/clock/:clockId
 */
router.patch("/:clockId", patchClockById);

/**
 * Delete clock by id
 * @method DELETE
 * @route /api/v1/clock/:clockId
 */
router.delete("/:clockId", deleteClockById);

/**
 * @route /api/v1/clock
 * @method GET
 */

router.get("/", getClocks);

/**
 * Create clock
 * @method POST
 * @route /api/v1/clock/clock-create
 */
router.post("/clock-create", createClockController);

export default router;
