import {hash} from 'bcrypt';
import {UserModel} from '@/models';
import {UserDto} from '@/common/dtos';
import {AppException} from '@/common/exceptions';
import {IUser} from '@/interfaces';
import {isEmpty} from '@/utils';
import {CRUDService} from '@services/crud.service';

export class UserService extends CRUDService<typeof UserModel> {
    constructor() {
        super(UserModel);
    }

    public async findAllUser(): Promise<UserDto[]> {
        return this.model.find();
    }

    public async findUserById(userId: string): Promise<UserDto> {
        if (isEmpty(userId)) throw new AppException(400, 'UserId is empty');

        const findUser: UserDto = await this.model.findById(userId);
        if (!findUser) throw new AppException(409, "UsersInterface doesn't exist");

        return findUser;
    }

    public async createUser(userData: UserDto): Promise<UserDto> {
        if (isEmpty(userData)) throw new AppException(400, 'userData is empty');

        const findUser: IUser = await this.model.findOne({where: {email: userData.email}});
        if (findUser) throw new AppException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        return await this.model.create({...userData, password: hashedPassword});
    }

    public async updateUser(userId: string, userData: UserDto): Promise<UserDto> {
        if (isEmpty(userData)) throw new AppException(400, 'userData is empty');

        const findUser: UserDto = await this.model.findById(userId);
        if (!findUser) throw new AppException(409, "UsersInterface doesn't exist");

        const hashedPassword: string = await hash(userData.password, 10);
        await this.model.updateOne({_id: userId}, {...userData, password: hashedPassword});

        return this.model.findById(userId);
    }

    public async deleteUser(userId: string): Promise<UserDto> {
        if (isEmpty(userId)) throw new AppException(400, "UsersInterface doesn't existId");

        const findUser: UserDto = await this.model.findById(userId);
        if (!findUser) throw new AppException(409, "UsersInterface doesn't exist");

        await this.model.deleteOne({where: {id: userId}});

        return findUser;
    }
}
