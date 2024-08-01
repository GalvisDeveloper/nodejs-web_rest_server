import { prisma } from "../../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../../domain";


export class TodoDataSourceImpl implements TodoDatasource {

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(TodoEntity.fromObject);
    }

    findById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

}