import { Router } from "express";
import { TodoController } from "./todo-controller";
import { TodoDataSourcePrismaImpl } from "../../infrastructure/datasource/prisma/todo/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router {
        const router = Router();

        const todoDatasource = new TodoDataSourcePrismaImpl();
        const todoRepository = new TodoRepositoryImpl(todoDatasource);
        const todoController = new TodoController(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodoById);
        
        return router;
    }
}