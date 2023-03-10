import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '@config';
import {UserModel} from '@/models';
import {UserDto} from '@/common/dtos';
import {AppException} from '@/common/exceptions';
import {DataStoredInToken, IUser} from '@/interfaces';
import {isEmpty} from '@/utils';
import {CRUDService} from '@services/crud.service';

export class AuthService extends CRUDService<typeof UserModel> {
    constructor() {
        super(UserModel);
    }

    public async signup(userData: UserDto): Promise<IUser> {
        if (isEmpty(userData)) throw new AppException(400, 'userData is empty');

        const findUser: IUser = await this.model.findOne({where: {email: userData.email}});
        if (findUser) throw new AppException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await this.model.create({...userData, password: hashedPassword});
    }

    public async login(userData: UserDto): Promise<{ cookie: string; refreshToken: Object; findUser: IUser }> {
        if (isEmpty(userData)) throw new AppException(400, 'userData is empty');

        const findUser: IUser = await this.model.findOne({email: userData.email}).select('+password').toObject();
        if (!findUser) throw new AppException(409, `This email ${userData.email} was not found`);
        const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new AppException(409, 'Password not matching');

        const {accessToken, expiresIn} = this.createAccessToken(findUser);
        const refreshToken = this.createRefreshToken(findUser);
        const cookie = this.createCookie({accessToken, expiresIn});

        delete findUser.password;
        return {cookie, refreshToken, findUser};
    }

    public createAccessToken(user: IUser): {accessToken: string, expiresIn: number} {
        const dataStoredInToken: DataStoredInToken = {id: user._id, role: user.role};
        const secretKey: string = config.SECRET_KEY;
        const expiresIn: number = 60 * 60;
        const accessToken: string = jwt.sign(dataStoredInToken, secretKey, {expiresIn});

        return {accessToken, expiresIn};
    }

    public createRefreshToken(user: IUser): Object {
        const dataStoredInToken: DataStoredInToken = {id: user._id, role: user.role};
        const secretKey: string = config.SECRET_KEY;
        const expiresIn: number = 60 * 60 * 24 * 7;
        const refreshToken: string = jwt.sign(dataStoredInToken, secretKey, {expiresIn});
        return {refreshToken, expiresIn};
    }

    public createCookie(accessToken: {accessToken: string, expiresIn: number}): string {
        return `Authorization=Bearer ${accessToken.accessToken}; HttpOnly; Max-Age=${accessToken.expiresIn}`;
    }
}
