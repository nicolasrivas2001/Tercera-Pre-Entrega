import { usersManager } from "../dao/mongo/users.mongo.js"
import { hashData } from "../utils.js"
import UserResponse from "../dto/users-response.dto.js"
import { cartsManager } from "../dao/mongo/carts.mongo.js"

export const findAllUsers = (obj) => {
    const users = usersManager.findAll(obj)
    return users
}

export const findUserByEmail = (email) => {
    const user = usersManager.findByEmail(email)
    return user
}

export const getUserById = async (id) => {
    const user = await usersManager.findById(id)
    const userDTO = new UserResponse(user)
    return userDTO
}

export const upDateUser = (pid,data) => {
    const user = usersManager.update(pid,data)
    return user
}

export const create = async (obj) => {
    const createdCart = await cartsManager.create()
    const hashedPassword = hashData(obj.password)
    const newObj = {...obj, password: hashedPassword,cart:createdCart._id}
    const user = usersManager.create(newObj)
    return user
}

export const deleteUserById = (id) => {
    const user = usersManager.delete(id)
    return user
}