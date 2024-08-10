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
    });

    test('Should return a 404 if TODO not found', async () => {
        const { body } = await request(testServer.app)
            .get('/api/todos/999999')
            .expect(404);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({ message: "Todo with id 999999 not found" });
    });

    test('Should create a new TODO', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toBeInstanceOf(Object);
        expect(body.text).toBe(todo1.text);
    });

    test('Should return an error if text is missing', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({ message: "Text is required" });
    });

    test('Should update a TODO', async () => {
        const { id } = await prisma.todo.create({ data: todo1 });
        const { body } = await request(testServer.app)
            .put(`/api/todos/${id}`)
            .send({ text: 'updated' })
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body.text).toBe('updated');
        expect(body).toEqual({ id, text: 'updated', completedAt: expect.any(String) });
    });

    test('Should return a 404 if TODO not found', async () => {
        const { body } = await request(testServer.app)
            .put('/api/todos/999999')
            .expect(404);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({ message: "Todo with id 999999 not found" });
    });

    test('Should return an updated TODO only the date', async () => {
        const { id, text } = await prisma.todo.create({ data: todo1 });
        const { body } = await request(testServer.app)
            .put(`/api/todos/${id}`)
            .send({ completedAt: '2023-05-05' })
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body.completedAt).toBe('2023-05-05T00:00:00.000Z');
        expect(body).toEqual({ id, text, completedAt: expect.any(String) });
    });

    test('Should delete a TODO', async () => {
        const { id, text } = await prisma.todo.create({ data: todo1 });
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${id}`)
            .expect(200);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({ message: `Todo with id ${id} deleted successfully`, data: { id, text, completedAt: expect.any(String) } });
    })

    test('Should return an error if id doesnt exists -> delete a TODO', async () => {
        const { body } = await request(testServer.app)
            .delete(`/api/todos/999`)
            .expect(404);

        expect(body).toBeInstanceOf(Object);
        expect(body).toEqual({ message: "Todo with id 999 not found" });
    })

})