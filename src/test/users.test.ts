import bcrypt from 'bcrypt';
import request from 'supertest';
import App from '@/app';
import { UsersRoute } from '@/routes';
import { UserModel } from '@/models';
import {mongoose} from "@typegoose/typegoose";

const examId1 = new mongoose.Types.ObjectId();
const examId2 = new mongoose.Types.ObjectId();
const examId3 = new mongoose.Types.ObjectId();
console.log(examId1);
console.log(examId2);
console.log(examId3);
console.log(examId1);

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
jest.setTimeout(10000)

describe('Testing Users', () => {
  describe('[GET] /users', () => {
    it('response findAll users', async () => {
      const usersRoute = new UsersRoute();
      UserModel.find = jest.fn().mockReturnValue([
        {
          id: examId1,
          email: 'a@email.com',
          password: await bcrypt.hash('q1w2e3r4!', 10),
        },
        {
          id: examId2,
          email: 'b@email.com',
          password: await bcrypt.hash('a1s2d3f4!', 10),
        },
        {
          id: examId3,
          email: 'c@email.com',
          password: await bcrypt.hash('z1x2c3v4!', 10),
        },
      ]);

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /users/:id', () => {
    it('response findOne user', async () => {
      const userId = examId1;

      const usersRoute = new UsersRoute();

      UserModel.findById = jest.fn().mockReturnValue({
        id: examId1,
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).get(`${usersRoute.path}/${userId}`).expect(200);
    });
  });

  describe('[POST] /users', () => {
    it('response Create user', async () => {
      const userData: { password: string; email: string } = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const usersRoute = new UsersRoute();

      UserModel.findOne = jest.fn().mockReturnValue(null);
      UserModel.create = jest.fn().mockReturnValue({
        id: examId1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response Update user', async () => {
      const userId = examId1;
      const userData: { password: string; email: string } = {
        email: 'test@email.com',
        password: '1q2w3e4r!',
      };

      const usersRoute = new UsersRoute();

      UserModel.findById = jest.fn().mockReturnValue({
        id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });
      UserModel.updateOne = jest.fn().mockReturnValue([1]);
      UserModel.findById = jest.fn().mockReturnValue({
        id: userId,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).put(`${usersRoute.path}/${userId}`).send(userData).expect(200);
    });
  });

  describe('[DELETE] /users/:id', () => {
    it('response Delete user', async () => {
      const userId = examId1;

      const usersRoute = new UsersRoute();

      UserModel.findById = jest.fn().mockReturnValue({
        id: userId,
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
      });
      UserModel.deleteOne = jest.fn().mockReturnValue([1]);

      mongoose.connect = jest.fn();
      const app = new App([usersRoute]);
      return request(app.getServer()).delete(`${usersRoute.path}/${userId}`).expect(200);
    });
  });
});
