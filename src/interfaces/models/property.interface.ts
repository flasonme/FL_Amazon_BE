import {IUser, IRoom} from "@/interfaces";

export interface IProperty {
    _id?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    rating?: number;
    image?: Array<string> // Image URL
    description?: string;
    amenities?: IPropertyAmenity;
    owner?: IUser;
    rooms?: Array<IRoom>;
}

export interface IPropertyAmenity {
    wifi: boolean;
    parking: boolean;
    kitchen: boolean;
    airConditioning: boolean;
    washingMachine: boolean;
    elevator: boolean;
    pool: boolean;
    gym: boolean;
    breakfast: boolean;
    petsAllowed: boolean;
    smokingAllowed: boolean;
    balcony: boolean;
    terrace: boolean;
}


