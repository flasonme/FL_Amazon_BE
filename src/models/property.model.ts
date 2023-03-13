import {prop, getModelForClass, modelOptions, Ref, Severity} from "@typegoose/typegoose";
import {IProperty, IPropertyAmenity} from "@/interfaces";
import {User} from "@models/user.model";
import {Room} from "@models/room.model";

const defaultAmenities: IPropertyAmenity = {
    wifi: true,
    parking: true,
    kitchen: true,
    airConditioning: true,
    washingMachine: true,
    elevator: false,
    pool: false,
    petsAllowed: false,
    smokingAllowed: false,
    balcony: true,
    terrace: true
}

@modelOptions({schemaOptions: {collection: 'properties', timestamps: true}})
class Property implements IProperty {
    @prop({required: true, default: 'New Property'})
    name!: string;

    @prop({type: () => String})
    location?: string;
    @prop({default: 0})
    rating?: number;
    @prop({type: () => [String]})
    image?: Array<string> // Image URL
    @prop({type: () => String})
    description?: string;
    @prop({type: () => Object, allowMixed: Severity.WARN, default: defaultAmenities})
    amenities?: IPropertyAmenity;
    @prop({ref: () => User})
    owner?: Ref<User>;
    @prop({ref: () => Room})
    rooms?: Room[];

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}

export const PropertyModel = getModelForClass(Property);
