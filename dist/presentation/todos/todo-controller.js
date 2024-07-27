"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const postgres_1 = require("../../data/postgres");
const dtos_1 = require("../../domain/dtos");
class TodoController {
    constructor() {
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield postgres_1.prisma.todo.findUnique({ where: { id } });
                if (!todo)
                    return null;
                return todo;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield postgres_1.prisma.todo.findMany();
                res.json(todos);
            }
            catch (err) {
                return res.status(500).json({ message: 'Failed to get todos' });
            }
        });
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const todo = yield this.findById(+id);
                if (!todo)
                    return res.status(404).json({ message: 'Todo not found' });
                res.json(todo);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: 'Failed to get todo' });
            }
        });
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, createTodoDto] = dtos_1.CreateTodoDto.create(req.body);
                if (error)
                    return res.status(400).json({ message: error });
                const todo = yield postgres_1.prisma.todo.create({
                    data: createTodoDto,
                });
                res.status(201).json(todo);
            }
            catch (err) {
                return res.status(500).json({ message: 'Failed to create todo', data: err });
            }
        });
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = +req.params.id;
                console.log(req.body);
                const [error, updateTodoDto] = dtos_1.UpdateTodoDto.create(Object.assign(Object.assign({}, req.body), { id }));
                if (error)
                    return res.status(400).json({ message: error });
                const todoFounded = yield this.findById(+id);
                if (!todoFounded)
                    return res.status(404).json({ message: 'Todo not found' });
                console.log(updateTodoDto.values);
                const todo = yield postgres_1.prisma.todo.update({
                    where: { id },
                    data: updateTodoDto.values
                });
                res.json(todo);
            }
            catch (err) {
                return res.status(500).json({ message: 'Failed to update todo' });
            }
        });
        this.deleteTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (isNaN(+id))
                    return res.status(400).json({ message: 'Invalid id' });
                const todoFounded = yield this.findById(+id);
                if (!todoFounded)
                    return res.status(404).json({ message: 'Todo not found' });
                const todo = yield postgres_1.prisma.todo.delete({ where: { id: +id } });
                res.status(200).json({ message: `Todo with id ${id} deleted successfully`, data: todo });
            }
            catch (error) {
                return res.status(500).json({ message: 'Failed to delete todo' });
            }
        });
    }
}
exports.TodoController = TodoController;
