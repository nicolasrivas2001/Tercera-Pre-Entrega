import { cartsManager } from "../dao/mongo/carts.mongo.js"

export default class UsersRepository {
    constructor(dao){
        this.dao = dao
    }

    getUsers = async (obj) => {
        const result = await this.dao.get(obj)
        return result
    }

    createUser = async (user) => {
        const createdCart = await cartsManager.create()
        const result = await this.dao.create({
            ...user,
            cart: createdCart._id
        })
        return result
    }

    findUserById = async (id) => {
        const result = await this.dao.findById(id)
        return result
    }

    findUserByEmail = async (obj) => {
        const result = await this.dao.findByEmail(obj)
        return result
    }

    updateUser = async (pid,data) => {
        const result = await this.dao.update(pid,data)
        return result
    }

    deleteUser = async (id) => {
        const result = await this.dao.delete(id)
        return result
    }
}
