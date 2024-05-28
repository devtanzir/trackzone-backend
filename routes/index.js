import { Router } from "express";
import clockRoute from "./clock.route.js";
import eventRoute from "./event.route.js";

const router = Router();

router.use("/api/v1/clock", clockRoute);
router.use("/api/v1/event", eventRoute);

export default router;
