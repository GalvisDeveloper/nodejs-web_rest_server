import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodoController {

    constructor() { }

    findById = async (id: number) => {
        try {
            const todo = await prisma.todo.findUnique({ where: { id } });
            if (!todo) return null;
            return todo;
        } catch (err) {
            console.log(err)
            return null;
        }
    }

    getTodos = async (req: Request, res: Response) => {
        try {
            const todos = await prisma.todo.findMany();
            res.json(todos);
        } catch (err) {
            return res.status(500).json({ message: 'Failed to get todos' });
        }
    }

    getTodoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const todo = await this.findById(+id);
            if (!todo) return res.status(404).json({ message: 'Todo not found' });

            res.json(todo);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: 'Failed to get todo' });
        }
    }

    createTodo = async (req: Request, res: Response) => {
        try {
            const { text } = req.body;
            if (!text) return res.status(400).json({ message: 'Text is required' });
            const todo = await prisma.todo.create({
                data: { text }
            })

            res.status(201).json(todo);
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create todo' });
        }
    }

    updateTodo = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (isNaN(+id)) return res.status(400).json({ message: 'Invalid id' });

            const { text, completedAt } = req.body;
            if (!text) return res.status(400).json({ message: 'Text is required' });

            const todoFounded = await this.findById(+id);
            if (!todoFounded) return res.status(404).json({ message: 'Todo not found' });

            const todo = await prisma.todo.update({
                where: { id: +id },
                data: { text, completedAt: completedAt ? new Date(completedAt) : null }
            })

            res.json(todo);
        } catch (err) {
            return res.status(500).json({ message: 'Failed to update todo' });
        }
    }

    deleteTodoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (isNaN(+id)) return res.status(400).json({ message: 'Invalid id' });

            const todoFounded = await this.findById(+id);
            if (!todoFounded) return res.status(404).json({ message: 'Todo not found' });

            const todo = await prisma.todo.delete({ where: { id: +id } });

            res.status(200).json({ message: `Todo with id ${id} deleted successfully`, data: todo });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to delete todo' });
        }
    }

}