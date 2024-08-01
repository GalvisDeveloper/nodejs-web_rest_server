import { CreateTodoDto, UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo/todo.entity";


export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;

    // TODO: Paginacion
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity>;

    abstract update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;

    abstract delete(id: number): Promise<TodoEntity>;

} 