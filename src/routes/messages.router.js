import passport from "passport";
import { Router } from "express";
import { createMessage, findAllMessage } from "../controllers/messages.controller.js";
import { authMiddleware } from "../middlewars/auth.middleware.js";

const router = Router()

router.get("/", findAllMessage);

router.post("/",passport.authenticate("jwt", {session: false}), authMiddleware(["User"]), createMessage);

export default router;

