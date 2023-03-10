import { IsString, IsEmail, IsUUID, IsDate, IsEnum } from 'class-validator';
import { Gender, Role, LoginType } from '@/common/constants';
import { IUser } from '@/interfaces';

export class UserDto implements IUser {
  @IsUUID()
  public id?: string;
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsEnum(Gender)
  public gender: Gender;

  @IsString()
  public phone: string;

  @IsString()
  public avatar: string;

  @IsEnum(Role)
  public role: Role;

  @IsEnum(LoginType)
  public login_type: LoginType;

  @IsDate()
  public created_at: Date;

  @IsDate()
  public updated_at: Date;
}
