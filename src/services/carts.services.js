import { cartsManager } from "../dao/mongo/carts.mongo.js"
import { v4 as uuidv4 } from "uuid"
import { ticketsManager } from "../dao/mongo/tickets.mongo.js"

export const findAllCarts = async() => {
    const carts = await cartsManager.findAll()
    return carts
}

export const cartBydId = async (id) => {
    const cart = await cartsManager.findById(id)
    return cart
}

export const addProductCart = async (idCart, idProduct) => {
    const response = await cartsManager.addProductToCart(idCart, idProduct)
    return response
}

export const createCart = async () => {
    const cart = await cartsManager.createCart()
    return cart
}

export const quantityUpdateCart = async (cid,pid,quantity) => {
    const cart = await cartsManager.quantityUpdate(cid,pid,quantity)
    return cart
}

export const cartUpdate = async (cid,arrayProducts) => {
    const cart = await cartsManager.cartUpdate(cid,arrayProducts)
    return cart
}

export const deleteProducttoCart = async (cid,pid) => {
    const cart = await cartsManager.deleteProductOfCart(cid,pid)
    return cart
}

export const deleteCartProducts = async(cid) => {
    const cart = await cartsManager.deleteCartProducts(cid)
    return cart
}

export const purchase = async (idCart) => {
    const cart = await cartDao.getCart(idCart)
    const products= cart.products
    let avaiableProducts = []
    let unavaiableProducts = []
    let totalAmount = 0
    for (let item of products){
        if(item.product.stock >= item.quantity){
            avaiableProducts.push(item)
            item.product.stock -=item.quantity
            await item.product.save()
            totalAmount += item.quantity * item.product.price
        } else {
            unavaiableProducts.push(item)
        }
        cart.products = unavaiableProducts
        await cart.save()
        if (avaiableProducts.length){
            const ticket = {
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount
            }
            await ticketsManager.createUser(ticket)
            return {avaiableProducts, totalAmount}
        }
        return {unavaiableProducts}
    }
}

