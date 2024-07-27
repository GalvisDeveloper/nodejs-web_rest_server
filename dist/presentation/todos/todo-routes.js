"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const todo_controller_1 = require("./todo-controller");
class TodoRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const todoController = new todo_controller_1.TodoController();
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodoById);
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
