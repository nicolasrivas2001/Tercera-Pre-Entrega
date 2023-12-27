import { ticketModel } from "../models/tickets.model.js";

class TicketsDao {
    async createTicket(ticket){
        const response = await ticketModel.create(ticket)
        return response
    }
}

export const ticketsManager = new TicketsDao()