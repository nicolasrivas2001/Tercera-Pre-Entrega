import { Router } from "express";
import { manager } from "../../Entrega2.js";

const router = Router()

router.get("/",async(req,res)=>{
    try {
        const products = await manager.getProducts(req.query)
        res.status(200).json({message: "Products found", products})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get("/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const product = await manager.getProductById(+id)
        if(!product){
            return res.status(400).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product found", product})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post("/", async(req,res)=>{
    const {title,description,price,thumbnail,code,stock,status,category} = req.body
    if(!title || !description || !code || !price || !status || !stock || !category){
        return res.status(400).json({message:"Some data is missing"})
    }
    try {
        const response = await manager.addProduct(title,description,price,thumbnail,code,stock,status,category)
        res.status(200).json({message: "Product created", response})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.put("/:id", async(req,res)=>{
    const {id} = req.params
    try {
        await manager.updateProduct(+id,req.body)
        res.status(200).json({message: "Product updated"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete("/:id", async(req,res)=>{
    const {id} = req.params
    try {
        const response = await manager.deleteProduct(+id)
        if(!response){
            return res.status(400).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router