export default class CartsRepository {
    constructor(dao){
        this.dao = dao
    }

    getCarts = async () => {
        const result = await this.dao.get()
        return result
    }

    createCarts = async (product) => {
        const result = await this.dao.create(product)
        return result
    }

    findCartById = async (id) => {
        const result = await this.dao.findById(id)
        return result
    }

    addProductCart = async (idCart, idProduct) => {
        const result = await this.dao.addProductToCart(idCart, idProduct)
        return result
    }

    updateQuantity = async (idCart,idProduct,quantity) => {
        const result = await this.dao.quantityUpdate(idCart,idProduct,quantity)
        return result
    }

    updateCart = async (pid,data) => {
        const result = await this.dao.update(pid,data)
        return result
    }

    deleteProductCart = async (idCart,idProduct) => {
        const result = await this.dao.deleteProductOfCart(idCart,idProduct)
        return result
    }

    deleteProductsCart = async (id) => {
        const result = await this.dao.deleteCartProducts(id)
        return result
    }

    deleteCart = async (id) => {
        const result = await this.dao.delete(id)
        return result
    }

    purchaseCart = async (id,user) => {
        const result = await this.dao.purchase(id,user)
        return result
    }
}
