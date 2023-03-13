import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@/common/dtos';
import { userService } from '@/services';
import { CRUDController } from '@controllers/crud.controller';
// import { AppException } from '@/common/exceptions';
// import { logger } from '@/utils';

export class UsersController extends CRUDController<typeof userService> {
  constructor() {
    super(userService);
    console.log("USERS CONTROLLER: THIS ==> ", userService)
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: any = await this.service.findMany(req.queryInfo);
      this.onSuccessPaginate(res, findAllUsersData, req.queryInfo);
      // res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      // console.log(error);
      // logger.error(error);
      // this.onError(res, new AppException(error.status, error.message));
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const findOneUserData: UserDto = await this.service.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const createUserData: UserDto = await this.service.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData: UserDto = req.body;
      const updateUserData: UserDto = await this.service.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const deleteUserData: UserDto = await this.service.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
