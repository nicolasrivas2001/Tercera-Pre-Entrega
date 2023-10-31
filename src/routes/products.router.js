import { Router } from "express";
import { productsManager } from "../db/managers/productsManager.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
      const products = await productsManager.findAll();
      res.status(200).json({ message: "Products", products });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
router.get("/:pid", async (req, res) => {
  try {
    const {pid} = req.params
    const product = await productsManager.findById(pid);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const {pid} = req.params
    const data = req.body
    console.log(data,pid)
    const product = await productsManager.updateOne(pid,data);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/", async (req, res) => {
    try {
      const createdProduct = await productsManager.createOne(req.body);
      res
        .status(200)
        .json({ message: "Product created", product: createdProduct });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
router.delete("/:idProduct", async (req, res) => {
    const { idProduct } = req.params;
    try {
      await productsManager.deleteOne(idProduct);
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
  
  export default router;