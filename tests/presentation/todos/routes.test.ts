import request from "supertest";
import { testServer } from "../../test-server";
import { prisma } from "../../../src/data/postgres";



describe('Unit Test Todo Routes', () => {


    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(async () => {
        await testServer.stop();
    });

    const todo1 = { text: 'todo1' };
    const todo2 = { text: 'todo2' };
    const todo3 = { text: 'todo3' };
    const todo4 = { text: 'todo4' };
    const todo5 = { text: 'todo5' };

    test('should return TODOS list', async () => {
        await prisma.todo.deleteMany();
        await prisma.todo.createMany({ data: [todo1, todo2, todo3, todo4, todo5] });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body).toHaveLength(5);
        expect(body[0].text).toBe(todo1.text);
    });


})