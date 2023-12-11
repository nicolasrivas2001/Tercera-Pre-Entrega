import { Router } from "express";
import { createUser, deleteUser, findAll, findByEmail, findUserById } from "../controllers/users.controller.js";
const router = Router();

router.get("/", findAll);

router.get("/:uid", findUserById);

router.get("/:email", findByEmail);

router.delete("/:idUser", deleteUser);

router.post("/", createUser);

export default router;