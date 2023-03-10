// Import enum

import {Gender, Role} from "@/common/constants";

export interface IUser {
  _id?: string;
  email?: string;
  password?: string;
  name?: string;
  gender?: Gender;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
