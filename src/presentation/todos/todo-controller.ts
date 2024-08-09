import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) { }

    getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(err => res.status(400).json({ message: `${err}` }))
    }


    getTodoById = (req: Request, res: Response) => {
        new GetTodo(this.todoRepository)
            .execute(+req.params.id)
            .then(todos => res.json(todos))
            .catch(err => console.log(err))
    }

    createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ message: error })
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.status(201).json(todo))
            .catch(err => res.status(400).json({ message: `${err}` }))
    }

    updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ message: error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(err => res.status(400).json({ message: `${err}` }))

    }

    deleteTodoById = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteTodo(this.todoRepository)
            .execute(+id)
            .then(todo => res.status(200).json({ message: `Todo with id ${id} deleted successfully`, data: todo }))
            .catch(err => res.status(400).json({ message: `${err}` }))

    }

}