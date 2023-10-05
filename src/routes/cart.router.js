import { Router } from "express";
import { cart } from "../../cartManager.js";

const router = Router()

router.post("/",async(req,res)=>{
    try {
        await cart.addCart()
        res.status(200).json({message: "Cart Added"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/:cid",async(req,res)=>{
    const {cid} = req.params
    try {
        const productsCart = await cart.getCartbyId(+cid)
        if(!productsCart){
            return res.status(400).json({message: "Cart not found"})
        }
        res.status(200).json({message: "Cart found", productsCart})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/:cid/product/:pid",async(req,res)=>{
    const {cid,pid} = req.params
    try {
        await cart.addQuantity(+cid,+pid)
        res.status(200).json({message: "Product Added"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router