import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

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
            const todos = await this.todoRepository.getAll();
            res.json(todos);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: `${err}` });
        }
    }

    getTodoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const todo = await this.todoRepository.findById(+id);
            res.json(todo);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: `${err}` });
        }
    }

    createTodo = async (req: Request, res: Response) => {
        try {
            const [error, createTodoDto] = CreateTodoDto.create(req.body);
            if (error) return res.status(400).json({ message: error });
            const todo = await this.todoRepository.create(createTodoDto!);

            res.status(201).json(todo);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: `${err}` });
        }
    }

    updateTodo = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;

            const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

            if (error) return res.status(400).json({ message: error });

            const todoFounded = await this.findById(+id);
            if (!todoFounded) return res.status(404).json({ message: 'Todo not found' });

            const todo = await this.todoRepository.update(updateTodoDto!);
            res.json(todo);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: `${err}` });
        }
    }

    deleteTodoById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (isNaN(+id)) return res.status(400).json({ message: 'Invalid id' });

            const todoFounded = await this.findById(+id);
            if (!todoFounded) return res.status(404).json({ message: 'Todo not found' });

            const todo = await this.todoRepository.delete(+id);

            res.status(200).json({ message: `Todo with id ${id} deleted successfully`, data: todo });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: `${err}` });
        }
    }

}