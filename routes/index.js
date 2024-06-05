import { Router } from "express";
import clockRoute from "./clockRoute.js";
import eventRoute from "./eventRoute.js";

export const router = Router();

router.use("/api/v1/clock", clockRoute);
router.use("/api/v1/event", eventRoute);

export default router;
