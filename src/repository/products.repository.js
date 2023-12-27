export default class ProductsRepository {
    constructor(dao){
        this.dao = dao
    }

    getProducts = async (obj) => {
        const result = await this.dao.get(obj)
        return result
    }

    createProduct = async (product) => {
        const result = await this.dao.create(product)
        return result
    }

    findProductById = async (id) => {
        const result = await this.dao.findById(id)
        return result
    }

    updateProduct = async (pid,data) => {
        const result = await this.dao.update(pid,data)
        return result
    }

    deleteProduct = async (id) => {
        const result = await this.dao.delete(id)
        return result
    }
}
