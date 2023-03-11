import {IUser, IProperty} from "@/interfaces";
import {PropertyView} from "@/common/constants";

export interface IRoom {
    _id?: string;
    name?: string;
    description?: string;
    view?: Array<PropertyView>;
    price?: number;
    image?: Array<string> // Image URL
    amenities?: IRoomAmenity;
    owner?: IUser;
    property?: IProperty;
}

export interface IRoomAmenity {
    smokingAllowed: boolean;
    petsAllowed: boolean;
    facilities: IRoomFacility;
}

export interface IRoomFacility {
    bathtub?: boolean;
    bed?: [["Single", "Double", "Queen", "King"], ["Single"], ["Double"], ["Queen"], ["King"]];
    bedCount?: number;
    soundProof?: boolean;
    television?: boolean;
    refrigerator?: string
}

