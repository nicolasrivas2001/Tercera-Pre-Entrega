import { messagesModel } from "../models/messages.model.js";

export default class MessagesManager {
    async get(){
        const response = await messagesModel.find()
        return response;
      }
      async create(msj) {
        const response = await messagesModel.create(msj);
        return response;
      }
}

export const messagesManager = new MessagesManager();
