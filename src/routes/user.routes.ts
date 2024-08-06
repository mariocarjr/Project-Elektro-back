import { Router } from "express";
import { userController } from "../controllers/user.controller";

const router = Router();

// CRUD de Usuários
router.get("/", userController.readAll);
router.get("/:id", userController.readOne);
router.post("/", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
