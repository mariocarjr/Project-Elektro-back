import { Router } from "express";
import { productController } from "../controllers/product.controller";

const router = Router();

// CRUD de Produtos
router.get("/", productController.readAll);
router.get("/:id", productController.readOne);
router.post("/", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);



export default router;
