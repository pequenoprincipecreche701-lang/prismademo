import {FastifyInstance} from "fastify"
import {UserController} from "../controllers/user.controller"

const userController = new UserController()

export async function userRoutes (app: FastifyInstance) {
    app.post("/users", userController.create)
    app.get("/users", userController.getAll)
    app.get("/users/:id", userController.getById)
    app.put("/user/:id", userController.update)
    app.delete("/user/:id", userController.deleteUser)
}