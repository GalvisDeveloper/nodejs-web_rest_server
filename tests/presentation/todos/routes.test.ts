import request from "supertest";
import { testServer } from "../../test-server";



describe('Unit Test Todo Routes', () => {


    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(async () => {
        await testServer.stop();
    });

    test('should return TODOS list', async () => {

        const response = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        console.log(response.body);
    });


})