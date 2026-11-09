import { ConflictError, NotFoundError} from '../erros/app-error';
import {prisma} from '../lib/prisma'


interface IUser {
    id?: string;
    name: string;
    email: string;
}

export class UserService {
    async create (data: IUser) {
        const userExist = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (userExist) {
            throw new ConflictError("E-mail já cadastrado")
        }

        return prisma.user.create({data})
    }

    async getAll () {
        const users = await prisma.user.findMany()

        return users
    }

    async getById (id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (!user) {
            throw new Error("No exist user")
        }

        return user
    }

    async updateUser (id: string, data: IUser) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if (user) {
            
            const userExist = await prisma.user.findUnique({
                where: {
                    email: user.email
                }
            })
            
            if (userExist?.email == data.email){
                throw new Error ("Email já em uso.")
            }
            
            const upUser = await prisma.user.update({
                where: {
                    id
                },
                data
            })

            return upUser
        }

        throw new Error("Usuário não encontrado.")
    }

    async delete (id: string) {
        const user = await prisma.user.findUnique({
            where:{ id }
        })

        if (user) {
            return await prisma.user.delete({where: { id: user.id}})
        }

        throw new Error("Usuário não encontrado.")
    }
}