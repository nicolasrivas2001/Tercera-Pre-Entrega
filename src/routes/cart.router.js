import { Router } from "express";
import { addCart, addProductToCart, deleteCart, deleteProductCart, findAll, findCartById, purchase, quantityUpdate, upDateCart } from "../controllers/carts.controller.js";
import passport from "passport";
import { authMiddleware } from "../middlewars/auth.middleware.js";

const router = Router()

router.get("/", findAll);

router.get("/:idCart", findCartById);

router.post("/:idCart/products/:idProduct",passport.authenticate("jwt", {session: false}), authMiddleware(["User"]), addProductToCart);

router.post("/", addCart);

router.get("/:cid/purchase", passport.authenticate("jwt", {session: false}), authMiddleware(["User"]), purchase)

/*router.put("/:cid/products/:pid ", async (req, res) => {
  try{
    const { cid, pid} = req.params
    
    console.log(cid,pid,quantity)
    const cart = await cartsManager.quantityUpdate(cid,pid,5);
    res.json({ cart });
  } catch (err){
    return res.status(500).json({ error: err.message });
  }
});*/

router.put("/:cid/products/:pid", quantityUpdate)

router.put("/:cid", upDateCart)

router.delete("/:cid/products/:pid", deleteProductCart)

router.delete("/:cid", deleteCart)


export default router;