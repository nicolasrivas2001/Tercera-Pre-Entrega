import { productsManager } from "../dao/mongo/products.mongo.js"


export const findAllProducts = (obj) => {
    const users = productsManager.find(obj)
    return users
}

export const findProductById = (id) => {
    const user = productsManager.findById(id)
    return user
}

export const upDateProductById = (pid,data) => {
    const user = productsManager.update(pid,data)
    return user
}

export const create = (data) => {
    const user = productsManager.create(data)
    return user
}

export const deleteProductById = (id) => {
    const user = productsManager.delete(id)
    return user
}