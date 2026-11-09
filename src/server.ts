import Fastify from "fastify"
import {userRoutes} from "./routes/user.routes"
import { AppError } from "./erros/app-error"

const app = Fastify({logger: true})

app.register(userRoutes)

//tratamento de erros
app.setErrorHandler((error: any, request, reply) => {
  // Se for um erro personalizado da aplicação (AppError)
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
    });
  }

  // Erros do Prisma (ex: violação de constraint única se não tratada antes)
  if (error.code === 'P2002') {
    return reply.status(409).send({
      status: 'error',
      message: 'Conflito de dados: registro duplicado.',
    });
  }

  // Erros inesperados de sistema (bugs, falhas de conexão, etc.)
  request.log.error(error);
  
  return reply.status(500).send({
    status: 'error',
    message: 'Erro interno do servidor.',
  });
});


const start = async () => {
    try {
        const port = process.env.PORT ? Number(process.env.PORT) : 3333
        await app.listen({port, host: "0.0.0.0"})
        console.log(`HTTP Server running on port ${port}`);
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

start()