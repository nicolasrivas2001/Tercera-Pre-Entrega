import { Router } from "express";
import { createProduct, deleteProduct, findAll, findById, updateById } from "../controllers/products.controller.js";

const router = Router()

router.get("/", findAll);
  
router.get("/:pid", findById);

router.put("/:pid", updateById);

router.post("/", createProduct);
  
router.delete("/:idProduct", deleteProduct);
  
export default router;