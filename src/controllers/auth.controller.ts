import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@/common/dtos';
import { RequestWithUser, IUser } from '@/interfaces';
import { AuthService } from '@/services';
import { logger } from '@/utils';
import { CRUDController } from '@controllers/crud.controller';

export class AuthController extends CRUDController<AuthService> {
  constructor() {
    super(new AuthService());
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    try {
      const userData: UserDto = req.body;
      const signUpUserData: IUser = await this.service.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const { cookie, refreshToken, findUser } = await this.service.login(userData);

      console.log('cookie', cookie)

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, refreshToken: refreshToken });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
