import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '@config';
import { UserModel } from '@/models';
import { AppException } from '@/common/exceptions';
import { DataStoredInToken, RequestWithUser } from '@/interfaces';

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = config.SECRET_KEY;
      const verificationResponse = verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;
      const findUser = await UserModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new AppException(401, 'Wrong authentication token'));
      }
    } else {
      next(new AppException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new AppException(401, 'Wrong authentication token'));
  }
};

// export default authMiddleware;
