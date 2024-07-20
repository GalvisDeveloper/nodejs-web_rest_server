import { Request, Response } from "express";


const todos = [
    { id: 1, text: 'Buy Milk', completedAt: new Date() },
    { id: 2, text: 'Buy Eggs', completedAt: new Date() },
    { id: 3, text: 'Buy Mame', completedAt: new Date() },
    { id: 4, text: 'Buy Cabeza', completedAt: new Date() },
]

export class TodoController {

    constructor() { }

    async getTodos(req: Request, res: Response) {
        res.json(todos);
    }

    async getTodoById(req: Request, res: Response) {
        const { id } = req.params;
        const todo = todos.find(todo => todo.id === +id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    }

    async createTodo(req: Request, res: Response) {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: new Date()
        }
        todos.push(newTodo);
        res.status(201).json(newTodo);
    }

    async updateTodo(req: Request, res: Response) {
        const { id } = req.params;
        if (isNaN(+id)) return res.status(400).json({ message: 'Invalid id' });

        const { text } = req.body;
        if (!text) return res.status(400).json({ message: 'Text is required' });

        const todo = todos.find(todo => todo.id === +id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.text = text || todo.text;

        res.json(todo);
    }

    async deleteTodoById(req: Request, res: Response) {
        const { id } = req.params;
        if (isNaN(+id)) return res.status(400).json({ message: 'Invalid id' });

        const todoIndex = todos.findIndex(todo => todo.id === +id);
        if (todoIndex === -1) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: `Todo with id ${id} deleted successfully` });
    }


}