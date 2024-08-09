import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";



describe('Unit Test Todo Routes', () => {


    let id: number = 0;

    beforeAll(async () => {
        await testServer.start();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    afterAll(async () => {
        await testServer.stop();
    });

    const todo1 = { text: 'todo1' };
    const todo2 = { text: 'todo2' };
    const todo3 = { text: 'todo3' };
    const todo4 = { text: 'todo4' };
    const todo5 = { text: 'todo5' };

    test('should return TODOS list', async () => {
        await prisma.todo.createMany({ data: [todo1, todo2, todo3, todo4, todo5] });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);
        id = body[0].id;
        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(5);
        expect(body[0].text).toBe(todo1.text);
    });

    test('should return a TODO by id', async () => {
        const { id } = await prisma.todo.create({ data: todo1 });
        const { body } = await request(testServer.app)
            .get(`/api/todos/${id}`)
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body.text).toBe(todo1.text);

        expect(body).toEqual({ id, text: todo1.text });

    });


})