// noinspection DuplicatedCode

import bcrypt from 'bcrypt';
// import {Sequelize} from 'sequelize';
import request from 'supertest';
import App from '@/app';
// import {UserDto} from '@/models/dtos';
import {AuthRoute} from '@/routes';
import {v4 as uuidv4} from 'uuid';
import {UserModel} from "@/models";

const examId1 = uuidv4();
afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
    describe('[POST] /signup', () => {
        it('response should have the Create userData', async () => {
            const userData: { password: string; email: string; role: string } = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
                role: "USER"
            };

            const authRoute = new AuthRoute();

            UserModel.findOne = jest.fn().mockReturnValue(null);
            UserModel.create = jest.fn().mockReturnValue({
                id: examId1,
                email: userData.email,
                password: await bcrypt.hash(userData.password, 10),
            });

            // (Sequelize as any).authenticate = jest.fn();
            const app = new App([authRoute]);
            return request(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
        });
    });

    describe('[POST] /login', () => {
        it('response should have the Set-Cookie header with the Authorization token', async () => {
            const userData: { password: string; email: string } = {
                email: 'test@email.com',
                password: 'q1w2e3r4!',
            };

            const authRoute = new AuthRoute();

            UserModel.findOne = jest.fn().mockReturnValue({
                id: examId1,
                email: userData.email,
                password: await bcrypt.hash(userData.password, 10),
            });

            // (Sequelize as any).authenticate = jest.fn();
            const app = new App([authRoute]);
            return request(app.getServer())
                .post(`${authRoute.path}login`)
                .send(userData)
                .expect('Set-Cookie', /^Authorization=.+/);
        });
    });

    // describe('[POST] /logout', () => {
    //   it('logout Set-Cookie Authorization=; Max-age=0', async () => {
    //     const authRoute = new AuthRoute();
    //
    //     const app = new App([authRoute]);
    //     return request(app.getServer())
    //       .post(`${authRoute.path}logout`)
    //       .expect('Set-Cookie', /^Authorization=\;/);
    //   });
    // });
});
