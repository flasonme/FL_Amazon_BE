import { Request } from 'express';
import { IUser } from '@/interfaces';

export interface DataStoredInToken {
  id: string;
  role?: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
