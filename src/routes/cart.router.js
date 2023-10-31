import { Router } from "express";
import { cartsManager } from "../db/managers/cartsManager.js";

const router = Router()

router.get("/:idCart", async (req, res) => {
  try{
    const { idCart } = req.params;
    const cart = await cartsManager.findCartById(idCart);
    res.json({ cart });
  } catch (err){
    return res.status(500).json({ error: err.message });
  }
});

router.post("/:idCart/products/:idProduct", async (req, res) => {
  try{
    const { idCart, idProduct } = req.params;
    const cart = await cartsManager.addProductToCart(idCart, idProduct);
    res.json({ cart });
  } catch (err){
    return res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try{
    const cart = await cartsManager.createCart();
    res.json({ cart });
  } catch (err){
    return res.status(500).json({ error: err.message });
  }
});

export default router;