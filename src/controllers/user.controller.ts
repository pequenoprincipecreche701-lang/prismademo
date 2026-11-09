import {FastifyRequest, FastifyReply} from "fastify"
import {UserService} from '../services/user.service'

const userService = new UserService ()

export class UserController { 
    async create (
        request: FastifyRequest<{Body: {
            name: string;
            email: string;
        }}>,
        reply: FastifyReply
    ) {
        
            const data = request.body
        
            const user = await userService.create(data)

            return reply.code(201).send(user)
       
    }

    async getAll (request: FastifyRequest, reply: FastifyReply) {
      
            const users = await userService.getAll()

            return reply.code(200).send(users)
        
    }

    async getById (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        
            const {id} = request.params

            const user = await userService.getById(id)

            return reply.code(200).send(user)
        
    }

    async update (
        request: FastifyRequest<
        {
            Params: {id: string},
            Body: {name: string, email: string}
        }
        >,
        reply: FastifyReply
    ) {

        
            const {id} = request.params
            const data = request.body
            const userUpdate = await userService.updateUser(id, data)
    
            return reply.send(userUpdate)
       
    }

    async deleteUser (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) {
        const {id} = request.params

        return await userService.delete(id)
    }
}