import {prop, getModelForClass, modelOptions} from "@typegoose/typegoose";
import {IUser} from "@/interfaces";
import {Gender, Role} from "@/common/constants";

@modelOptions({schemaOptions: {collection: 'users', timestamps: true}})
class User implements IUser {
    @prop({required: true, unique: true})
    public email: string;
    @prop({select: false, required: false})
    public password: string;
    @prop({required: false})
    public name: string;
    @prop({type: String, default: Gender.OTHER})
    public gender: Gender;
    @prop({type: String, default: Role.USER})
    public role: Role;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

export const UserModel = getModelForClass(User);
