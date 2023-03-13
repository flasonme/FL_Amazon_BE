import {getModelForClass, modelOptions, prop, Severity} from "@typegoose/typegoose";
import {IRoom, IRoomAmenity} from "@/interfaces";


const defaultAmenities: IRoomAmenity = {
    smokingAllowed: false,
    petsAllowed: false,
    facilities: {
        bathtub: false,
        bed: "Double",
        bedCount: 1,
        soundProof: false,
        television: true,
        refrigerator: true
    },
}

@modelOptions({schemaOptions: {collection: 'rooms', timestamps: true}})
export class Room implements IRoom {
    @prop({required: true, default: 'New Room'})
    public name!: string;
    @prop({type: () => String})
    public description: string;
    @prop({type: () => [String]})
    public image: string[];
    @prop({type: () => Object, allowMixed: Severity.WARN, default: defaultAmenities})
    public amenities: IRoomAmenity;

    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date;
}
export const RoomModel = getModelForClass(Room);
