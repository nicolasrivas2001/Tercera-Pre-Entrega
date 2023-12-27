import CartsRepository from "../repository/carts.repository.js"
import CartsMongo from "../dao/mongo/carts.mongo.js"

const cartsService = new CartsRepository(new CartsMongo())

export const findAll = async(req,res)=>{
    try {
        const carts = await cartsService.getCarts()
        res.status(200).json({carts})
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error });
    }
}

export const findCartById = async (req, res) => {
    try{
      const { idCart } = req.params;
      const cart = await cartsService.findCartById(idCart);
      res.json(cart);
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const addProductToCart = async (req, res) => {
    try{
      const { idCart, idProduct } = req.params;
      const cart = await cartsService.addProductCart(idCart, idProduct);
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const addCart = async (req, res) => {
    try{
      const cart = await cartsService.createCarts();
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const quantityUpdate = async (req,res) => {
    try{
      const {cid,pid} = req.params
      const quantity = req.body
      const cart = await cartsService.updateQuantity(cid,pid,quantity);
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const upDateCart = async (req,res) => {
    try{
      const {cid} = req.params
      const arrayProducts = req.body
      console.log(arrayProducts)
      const cart = await cartsService.updateCart(cid,arrayProducts);
      res.json({ cart });
    } catch (error) {
      return res.status(500).json({ error });
    }
}

export const purchase = async (req,res) => {
  try{
    const {cid} = req.params
    const user = req.user
    const cart = await cartsService.purchaseCart(cid,user);
    res.json({ cart });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
}

export const deleteProductCart = async (req,res) => {
    try{
      const {cid,pid} = req.params
      const cart = await cartsService.deleteProductCart(cid,pid);
      res.json({ cart });
    } catch (err){
      return res.status(500).json({ error: err.message });
    }
}

export const deleteCart = async (req,res) => {
    try{
      const {cid} = req.params
      const cart = await cartsService.deleteCart(cid);
      res.json({ cart });
    } catch (err){
      return res.status(500).json({ error: err.message });
    }
}

